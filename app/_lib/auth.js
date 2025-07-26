import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user; // Automatically turn to boolean
    },
    async signIn({ user, account, profile }) {
      // Triggered before actual login, we create a new user in our database if he doesn't exist
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest) {
          await createGuest({ email: user.email, fullName: user.name });
        }

        return true;
      } catch (err) {
        return false;
      }
    },
    async session({ session }) {
      // Add our guest to each session
      const guest = await getGuest(session.user.email);
      session.user.guest = guest;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
