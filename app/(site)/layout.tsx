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
                        <div className="flex-grow">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}