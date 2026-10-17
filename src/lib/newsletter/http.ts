import { hashRateLimitKey } from "./service";

const MAX_REQUEST_BYTES = 2048;

export function jsonResponse(
  payload: Record<string, string>,
  status: number,
): Response {
  return Response.json(payload, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export function isSameOrigin(request: Request, expectedOrigin: string): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).origin === expectedOrigin;
  } catch {
    return false;
  }
}

export async function readSmallJson(request: Request): Promise<unknown | null> {
  const contentType = request.headers.get("content-type")?.split(";")[0].trim();
  if (contentType !== "application/json") return null;

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return null;
  }

  const body = await request.text();
  if (new TextEncoder().encode(body).byteLength > MAX_REQUEST_BYTES) return null;

  try {
    return JSON.parse(body) as unknown;
  } catch {
    return null;
  }
}

export function getClientAddress(request: Request): string | null {
  const realAddress = request.headers.get("x-real-ip")?.trim();
  if (realAddress && realAddress.length <= 64) return realAddress;

  const forwardedFor = request.headers.get("x-forwarded-for");
  const forwardedAddress = forwardedFor?.split(",").at(-1)?.trim();
  const address = forwardedAddress;

  if (!address || address.length > 64) return null;
  return address;
}

export async function allowLimitedRequest(
  request: Request,
  consumeRateLimit: (keyHash: string, limit: number) => Promise<boolean>,
  secret: string,
  limit: number,
): Promise<boolean> {
  const address = getClientAddress(request);
  if (!address) return false;

  return consumeRateLimit(hashRateLimitKey(`ip:${address}`, secret), limit);
}