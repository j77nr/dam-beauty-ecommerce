export function parseCookieHeader(header: string | null): Record<string, string> {
  const cookies: Record<string, string> = Object.create(null);

  for (const part of header?.split(";") ?? []) {
    const separator = part.indexOf("=");
    if (separator <= 0) continue;

    const name = part.slice(0, separator).trim();
    const rawValue = part.slice(separator + 1).trim();

    try {
      cookies[name] = decodeURIComponent(rawValue);
    } catch {
      cookies[name] = rawValue;
    }
  }

  return cookies;
}

export function sessionCookieAttributes(request: Request): string {
  const secure = new URL(request.url).protocol === "https:";
  return `Path=/; HttpOnly; SameSite=${secure ? "None" : "Lax"}${secure ? "; Secure" : ""}`;
}
