export const runtime = "nodejs";

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const res = await fetch(
          "https://kasa-backend-production-1060.up.railway.app/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          }
        );
console.log("CREDENTIALS:", credentials);
console.log("STATUS:", res.status);
console.log("RESPONSE:", await res.clone().text());

        if (!res.ok) {
          const error = await res.json().catch(() => null);
          throw new Error(error?.message || "Erreur de connexion");
        }

        const data = await res.json();

        return {
          id: data.user.id,
          role: data.user.role,
          name: data.user.name,
          email: data.user.email,
          token: data.token,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        role: token.role,
        name: token.name,
        email: token.email,
        token: token.token,
      };
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});
