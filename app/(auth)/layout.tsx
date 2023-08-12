import { getServerSession } from "next-auth/next"
import AppAuthOptions from "@/lib/server/auth/auth-options"
import { redirect } from 'next/navigation';
import AuthBackground from "@/components/background/auth-background";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(AppAuthOptions);
  if( session ) {
    redirect('/');
  }

  return (
    <div className="relative min-h-screen flex justify-center items-center">
        { children } 
        <AuthBackground />
    </div>
  )
}
