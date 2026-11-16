import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { validateSession } from "@/lib/auth";
import { parse } from "cookie";

export const APIRoute = createAPIFileRoute("/api/auth/me")({
  GET: async ({ request }) => {
    const cookieHeader = request.headers.get("Cookie");
    const cookies = parse(cookieHeader || "");
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
});
