import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { deleteSession } from "@/lib/auth";
import { parse } from "cookie";

export const APIRoute = createAPIFileRoute("/api/auth/logout")({
  POST: async ({ request }) => {
    const cookieHeader = request.headers.get("Cookie");
    const cookies = parse(cookieHeader || "");
    const sessionId = cookies.dam_session;

    if (sessionId) {
      await deleteSession(sessionId);
    }

    return json(
      { success: true },
      {
        headers: {
          "Set-Cookie": "dam_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0",
        },
      }
    );
  },
});
