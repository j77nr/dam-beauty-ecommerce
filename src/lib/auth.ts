import { db, users, sessions } from "@/db";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000;
export interface SessionData {
  userId: number;
  email: string;
  nom: string;
  prenom: string;
  role: string;
}
export async function createUser(data: {
  email: string;
  password: string;
  nom: string;
  prenom: string;
  telephone?: string;
}) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const [user] = await db
    .insert(users)
    .values({
      email: data.email.toLowerCase(),
      password: hashedPassword,
      nom: data.nom,
      prenom: data.prenom,
      telephone: data.telephone,
      role: "client",
    })
    .returning();
  return user;
}
export async function authenticateUser(email: string, password: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1);
  if (!user) {
    throw new Error("Email ou mot de passe incorrect");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Email ou mot de passe incorrect");
  }
  return user;
}
export async function createSession(userId: number) {
  const sessionId = nanoid();
  const expiresAt = new Date(Date.now() + SESSION_DURATION);
  await db.insert(sessions).values({
    id: sessionId,
    userId,
    expiresAt,
  });
  return { sessionId, expiresAt };
}
export async function validateSession(sessionId: string | undefined): Promise<SessionData | null> {
  if (!sessionId) return null;
  const [session] = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, sessionId))
    .limit(1);
  if (!session) return null;
  if (session.expiresAt < new Date()) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
    return null;
  }
  const [user] = await db.select().from(users).where(eq(users.id, session.userId)).limit(1);
  if (!user) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
    return null;
  }
  return {
    userId: user.id,
    email: user.email,
    nom: user.nom,
    prenom: user.prenom,
    role: user.role,
  };
}
export async function deleteSession(sessionId: string) {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}
export async function cleanExpiredSessions() {
  await db.delete(sessions).where(eq(sessions.expiresAt, new Date()));
}