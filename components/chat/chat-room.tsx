'use client'

import React, { useState, useEffect, useRef } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
// import { sendChatMessage } from '@lib/Client/chat';
// import BouncingDotsLoader from './BouncingDotsLoader';
import { Message } from '@/types/chat';
import MessageBox from './message-box';
import PromptEditor from './prompt-editor';

const mockMessages: Message[] = [
    {
        type: 'user',
        text: 'Hi'
    },
    {
        type: 'bot',
        text: 'Hello, How can I help you?'
    }
];

const ChatRoom = () => {
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [loading, setLoading] = useState<boolean>(false);
    const scrollRef = useRef<HTMLElement>();

    useEffect(() => {
        forceScrollBottom();
    }, [messages])

    const forceScrollBottom = () => {
        if( scrollRef.current ) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }

    const handleSubmit = (textInput: string) => {
        if( loading ) {
            return;
        }

        const question: Message = {
            type: 'user',
            text: textInput
        };
        setLoading(true);
        setMessages((prev: any) => {
            const arr = JSON.parse(JSON.stringify(prev));
            arr.push(question);
            return arr;
        });
        
        // sendChatMessage(textInput).then(ret => {
        //     const answer = {
        //         id: messages.length,
        //         chat: [ret],
        //         date:Date.now()
        //     };
        //     setMessages((prev: any) => {
        //         const arr = JSON.parse(JSON.stringify(prev));
        //         arr.push(answer);
        //         return arr;
        //     });
        // }).catch(err => {
        //     console.log('chat error =>', err);
        //     alertError('Error', err);
        // }).finally(() => {
        //     setLoading(false);
        // });


    }

    return (
        <div className='flex-grow pt-8'>
            <div className='h-[calc(100%-80px)] pb-4'>
                <PerfectScrollbar 
                    containerRef={(ref) => scrollRef.current = ref}
                    options={{ suppressScrollX: true, wheelPropagation: false}}
                >
                    {messages.map((item, idx) => 
                        <MessageBox message={item} key={`message-${idx}`}/>
                    )}

                </PerfectScrollbar>
                {/* { loading && (
                    <BouncingDotsLoader />
                )} */}
                
            </div>
            <PromptEditor 
                loading={loading}
                handleSubmit={handleSubmit} 
            />
        </div>
    );
}

export default ChatRoom;