import Header from "@/components/Header";
import SideBar from "@/components/layout/sidebar";
import MainBackground from "@/components/background/main-background";
import { getServerSession } from "next-auth/next";
import AppAuthOptions from "@/lib/server/auth/auth-options";
import { redirect } from "next/navigation";

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
                <Header/>
                <div className="h-[calc(100%-60px)]">
                    <div className="relative w-full h-full flex">
                        <SideBar />        
                        <main className="relative flex-grow">
                            {children}
                            <MainBackground />
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}