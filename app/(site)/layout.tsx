import Header from "@/components/Header";
import { getServerSession } from "next-auth/next";
import AppAuthOptions from "@/lib/server/auth/auth-options";
import { redirect } from "next/navigation";
import LayoutProvider from "@/lib/client/context/layout-provider";

export default async function ChatLayout({
    children
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(AppAuthOptions);
    console.log('home session =>', session);
    if( !session ) {
        redirect('/signin');
    }

    return (
        <div className="4xl:container">
            <div className="h-screen">
                <LayoutProvider>
                    <Header/>
                    <main className="relative h-[calc(100%-60px)]">
                        { children }
                    </main>
                </LayoutProvider>
            </div>
        </div>
    )
}