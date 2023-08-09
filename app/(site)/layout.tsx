import Header from "@/components/Header"
import SideBar from "@/components/layout/sidebar"

export default function ChatLayout({
    children
}: {
    children: React.ReactNode
}) {

    return (
        <div className="4xl:container">
            <div className="h-screen flex">
                <SideBar />
                <div className="flex-grow h-full">
                    <div className="relative w-full h-full flex flex-col">
                        <Header />
                        <main className="flex-grow p-2 md:p-6 lg:p-8">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}