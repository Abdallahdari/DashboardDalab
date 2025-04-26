// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// export const { auth, handlers, signIn, signOut } = NextAuth({
//   providers: [
//     Credentials({
//       credentials: {
//         email: {},
//         password: {},
//       },
//       authorize: async (credentials) => {
//         const { data, error } = await supabase.auth.signInWithPassword({
//           email: credentials.email,
//           password: credentials.password,
//         });
//         if (data.email === email && data.password === password) {
//           return { email, password };
//         } else {
//           throw new Error("Invalid credentials", error.massege);
//         }
//       },
//     }),
//   ],
// });

//

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (error) {
            console.error("Supabase auth error:", error.message);
            return null;
          }

          if (data.user) {
            // Return the user object
            return {
              id: data.user.id,
              email: data.user.email,
              name: data.user.email, // You can customize this if you have a name field
            };
          }

          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/Login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
