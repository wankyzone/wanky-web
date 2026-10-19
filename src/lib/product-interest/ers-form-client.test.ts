import { describe, expect, it, vi } from "vitest";
import { submitErsInterest } from "./ers-form-client";

describe("submitErsInterest", () => {
  it("posts the payload to the ERS API and recognizes acceptance", async () => {
    const fetchRequest = vi.fn<typeof fetch>().mockResolvedValue(
      Response.json({ status: "accepted" }, { status: 202 }),
    );
    const payload = { productId: "ers", consent: true };

    await expect(submitErsInterest(payload, fetchRequest)).resolves.toEqual({
      status: "accepted",
    });
    expect(fetchRequest).toHaveBeenCalledWith(
      "/api/product-interest/ers",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
  });

  it("returns field validation issues for invalid submissions", async () => {
    const fetchRequest = vi.fn<typeof fetch>().mockResolvedValue(
      Response.json(
        {
          status: "invalid_submission",
          issues: [{ path: "contact.email", code: "invalid_email" }],
        },
        { status: 400 },
      ),
    );

    await expect(submitErsInterest({}, fetchRequest)).resolves.toEqual({
      status: "invalid",
      issues: [{ path: "contact.email", code: "invalid_email" }],
    });
  });

  it("recognizes rate limiting and hides server responses", async () => {
    const limitedFetch = vi.fn<typeof fetch>().mockResolvedValue(
      Response.json({ status: "rate_limited" }, { status: 429 }),
    );
    const failedFetch = vi.fn<typeof fetch>().mockResolvedValue(
      Response.json(
        { status: "storage_unavailable", detail: "private database detail" },
        { status: 503 },
      ),
    );

    await expect(submitErsInterest({}, limitedFetch)).resolves.toEqual({
      status: "rate_limited",
    });
    await expect(submitErsInterest({}, failedFetch)).resolves.toEqual({
      status: "error",
    });
  });

  it("turns network failures into a generic result", async () => {
    const fetchRequest = vi
      .fn<typeof fetch>()
      .mockRejectedValue(new Error("network detail"));

    await expect(submitErsInterest({}, fetchRequest)).resolves.toEqual({
      status: "error",
    });
  });
});
