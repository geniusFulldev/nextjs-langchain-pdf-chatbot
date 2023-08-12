import AppAuthOptions from "@/lib/server/auth/auth-options";
import NextAuth from "next-auth";

const handler = NextAuth(AppAuthOptions);
export { handler as GET, handler as POST };

