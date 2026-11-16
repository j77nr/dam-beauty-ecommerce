import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { createUser, createSession } from "@/lib/auth";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  nom: z.string().min(2, "Le nom est requis"),
  prenom: z.string().min(2, "Le prénom est requis"),
  telephone: z.string().optional(),
});

export const APIRoute = createAPIFileRoute("/api/auth/register")({
  POST: async ({ request }) => {
    try {
      const body = await request.json();
      const data = registerSchema.parse(body);

      // Créer l'utilisateur
      const user = await createUser(data);

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
      if (error.code === "SQLITE_CONSTRAINT") {
        return json({ success: false, error: "Cet email est déjà utilisé" }, { status: 400 });
      }

      if (error.name === "ZodError") {
        return json({ success: false, error: error.errors[0].message }, { status: 400 });
      }

      return json({ success: false, error: error.message || "Erreur lors de l'inscription" }, { status: 500 });
    }
  },
});
