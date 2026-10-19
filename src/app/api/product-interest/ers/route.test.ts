import { beforeEach, describe, expect, it, vi } from "vitest";
import { getErsInterestRuntime } from "../../../../lib/product-interest/ers-runtime";
import { POST } from "./route";

vi.mock("../../../../lib/product-interest/ers-runtime", () => ({
  getErsInterestRuntime: vi.fn(),
}));

const validSubmission = {
  productId: "ers",
  formVersion: "ers-v1",
  contact: {
    name: "Avery Example",
    email: "avery@example.com",
  },
  interestType: "errands_completed",
  answers: {
    errandDetails: "Pick up a parcel.",
    cityArea: "Lagos",
  },
  consent: true,
};

const saveSubmission = vi.fn();
const consumeRateLimit = vi.fn();
const runtime = {
  siteUrl: "https://wanky.example",
  rateLimitSecret: "test-only-secret",
  consumeRateLimit,
  repository: { saveSubmission },
};

function makeRequest(
  body: string,
  options: {
    origin?: string;
    contentType?: string;
    address?: string | null;
  } = {},
) {
  return new Request("https://wanky.example/api/product-interest/ers", {
    method: "POST",
    headers: {
      origin: options.origin ?? "https://wanky.example",
      "content-type": options.contentType ?? "application/json",
      ...(options.address === null
        ? {}
        : { "x-real-ip": options.address ?? "203.0.113.4" }),
    },
    body,
  });
}

async function responseBody(response: Response) {
  return response.json() as Promise<Record<string, unknown>>;
}

describe("POST /api/product-interest/ers", () => {
  beforeEach(() => {
    vi.mocked(getErsInterestRuntime).mockReturnValue(runtime);
    saveSubmission.mockReset().mockResolvedValue(undefined);
    consumeRateLimit.mockReset().mockResolvedValue(true);
  });

  it("returns unavailable when the server runtime is not configured", async () => {
    vi.mocked(getErsInterestRuntime).mockReturnValue(null);
    const response = await POST(makeRequest(JSON.stringify(validSubmission)));

    expect(response.status).toBe(503);
    expect(await responseBody(response)).toEqual({ status: "unavailable" });
  });

  it("rejects requests without the configured same origin", async () => {
    const response = await POST(
      makeRequest(JSON.stringify(validSubmission), {
        origin: "https://attacker.example",
      }),
    );

    expect(response.status).toBe(403);
    expect(await responseBody(response)).toEqual({ status: "origin_rejected" });
    expect(consumeRateLimit).not.toHaveBeenCalled();
  });

  it.each([
    ["invalid JSON", "{broken", "application/json"],
    ["wrong content type", JSON.stringify(validSubmission), "text/plain"],
    ["oversized JSON", " ".repeat(2049), "application/json"],
  ])("returns malformed_request for %s", async (_label, body, contentType) => {
    const response = await POST(
      makeRequest(body, { contentType }),
    );

    expect(response.status).toBe(400);
    expect(await responseBody(response)).toEqual({
      status: "malformed_request",
    });
  });

  it("returns validation issues without persisting an invalid submission", async () => {
    const response = await POST(
      makeRequest(
        JSON.stringify({ ...validSubmission, consent: false }),
      ),
    );

    expect(response.status).toBe(400);
    expect(await responseBody(response)).toEqual({
      status: "invalid_submission",
      issues: [{ path: "consent", code: "invalid_consent" }],
    });
    expect(consumeRateLimit).not.toHaveBeenCalled();
    expect(saveSubmission).not.toHaveBeenCalled();
  });

  it("returns rate_limited when the persistent limiter rejects the client", async () => {
    consumeRateLimit.mockResolvedValue(false);
    const response = await POST(makeRequest(JSON.stringify(validSubmission)));

    expect(response.status).toBe(429);
    expect(await responseBody(response)).toEqual({ status: "rate_limited" });
    expect(consumeRateLimit).toHaveBeenCalledOnce();
    expect(saveSubmission).not.toHaveBeenCalled();
  });

  it("does not persist when the client address is unavailable", async () => {
    const response = await POST(
      makeRequest(JSON.stringify(validSubmission), { address: null }),
    );

    expect(response.status).toBe(429);
    expect(await responseBody(response)).toEqual({ status: "rate_limited" });
    expect(consumeRateLimit).not.toHaveBeenCalled();
    expect(saveSubmission).not.toHaveBeenCalled();
  });

  it("returns a generic error if the rate-limit backend fails", async () => {
    consumeRateLimit.mockRejectedValue(new Error("private database detail"));
    const response = await POST(makeRequest(JSON.stringify(validSubmission)));

    expect(response.status).toBe(503);
    expect(await responseBody(response)).toEqual({
      status: "rate_limit_unavailable",
    });
    expect(saveSubmission).not.toHaveBeenCalled();
  });

  it("stores validated and normalized data and returns an accepted response", async () => {
    const response = await POST(
      makeRequest(
        JSON.stringify({
          ...validSubmission,
          contact: { name: " Avery Example ", email: " Avery@Example.com " },
        }),
      ),
    );

    expect(response.status).toBe(202);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await responseBody(response)).toEqual({ status: "accepted" });
    expect(saveSubmission).toHaveBeenCalledWith({
      ...validSubmission,
      contact: { name: "Avery Example", email: "avery@example.com" },
    });
    expect(consumeRateLimit).toHaveBeenCalledWith(
      expect.stringMatching(/^[a-f0-9]{64}$/),
      5,
    );
  });

  it("returns a generic storage failure without exposing database errors", async () => {
    saveSubmission.mockRejectedValue(new Error("private database detail"));
    const response = await POST(makeRequest(JSON.stringify(validSubmission)));
    const body = await responseBody(response);

    expect(response.status).toBe(503);
    expect(body).toEqual({ status: "storage_unavailable" });
    expect(JSON.stringify(body)).not.toContain("private database detail");
    expect(JSON.stringify(body)).not.toContain(validSubmission.contact.email);
  });
});
