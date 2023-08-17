import SideBar from "@/components/layout/sidebar";
import PdfProvider from "@/lib/client/context/pdf-context";
import ChatRoom from '@/components/chat/chat-room';
import MainBackground from "@/components/background/main-background";

export default function Home() {
  return (
    <div className="relative w-full h-full flex">
      <PdfProvider>
          <SideBar />        
          <div className="relative w-full md:w-[calc(100%-280px)] h-full p-2 md:p-6 lg:p-8">
            <ChatRoom />
          </div>
      </PdfProvider>
      <MainBackground />
    </div>

  )
}
