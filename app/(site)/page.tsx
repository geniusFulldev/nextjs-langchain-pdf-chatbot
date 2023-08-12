import Image from 'next/image'
import ChatRoom from '@/components/chat/chat-room'

export default function Home() {
  return (
    <div className="relative h-full flex flex-col p-2 md:p-6 lg:p-8">
      <h5 className="w-full border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        Please upload a pdf file and then input questions
      </h5>
      <ChatRoom />

      
    </div>
  )
}
