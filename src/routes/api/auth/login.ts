import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { authenticateUser, createSession } from "@/lib/auth";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

export const APIRoute = createAPIFileRoute("/api/auth/login")({
  POST: async ({ request }) => {
    try {
      const body = await request.json();
      const data = loginSchema.parse(body);

      // Authentifier
      const user = await authenticateUser(data.email, data.password);

      // Créer la session
      const { sessionId, expiresAt } = await createSession(user.id);

      return json(
        {
          success: true,
          user: {
            id: user.id,
            email: user.email,
            nom: user.nom,
            prenom: user.prenom,
            role: user.role,
          },
        },
        {
          headers: {
            "Set-Cookie": `dam_session=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}`,
          },
        }
      );
    } catch (error: any) {
      if (error.name === "ZodError") {
        return json({ success: false, error: error.errors[0].message }, { status: 400 });
      }

      return json({ success: false, error: error.message || "Erreur de connexion" }, { status: 401 });
    }
  },
});
