import { json } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { deleteSession } from "@/lib/auth";
import { parseCookieHeader, sessionCookieAttributes } from "@/lib/cookies";

export const Route = createFileRoute("/api/auth/logout")({
  server: { handlers: {
  POST: async ({ request }) => {
    const cookieHeader = request.headers.get("Cookie");
    const cookies = parseCookieHeader(cookieHeader);
    const sessionId = cookies.dam_session;

    if (sessionId) {
      await deleteSession(sessionId);
    }

    return json(
      { success: true },
      {
        headers: {
          "Set-Cookie": `dam_session=; ${sessionCookieAttributes(request)}; Max-Age=0`,
        },
      }
    );
  },
  } },
});
