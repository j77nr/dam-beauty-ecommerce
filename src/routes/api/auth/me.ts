import { json } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { validateSession } from "@/lib/auth";
import { parseCookieHeader } from "@/lib/cookies";

export const Route = createFileRoute("/api/auth/me")({
  server: { handlers: {
  GET: async ({ request }) => {
    const cookieHeader = request.headers.get("Cookie");
    const cookies = parseCookieHeader(cookieHeader);
    const sessionId = cookies.dam_session;

    const session = await validateSession(sessionId);

    if (!session) {
      return json({ success: false, error: "Non authentifié" }, { status: 401 });
    }

    return json({
      success: true,
      user: session,
    });
  },
  } },
});
