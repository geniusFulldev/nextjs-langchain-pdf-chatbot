'use client'

import React, { useState, useEffect, useRef } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
// import { sendChatMessage } from '@lib/Client/chat';
// import BouncingDotsLoader from './BouncingDotsLoader';
import { Message } from '@/types/chat';
import MessageBox from './message-box';
import PromptEditor from './prompt-editor';
import { usePdfProvider } from '@/lib/client/context/pdf-context';

const ChatRoom = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const scrollRef = useRef<HTMLElement>();
    const { uploadedPdfFiles } = usePdfProvider();
    
    useEffect(() => {
        forceScrollBottom();
    }, [messages])

    const forceScrollBottom = () => {
        if( scrollRef.current ) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }

    const handleSubmit = async(textInput: string) => {
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
        
        try {
            const params = {
                message: textInput
            };

            const ret = await fetch('/api/chat', {
                method: 'POST',
                body: JSON.stringify(params)
            });

            const data = await ret.json();
            if( data.success ) {
                const botMessage: Message = {
                    type: 'bot',
                    text: data.response
                }
                setMessages((prev: Message[]) => {
                    const arr = JSON.parse(JSON.stringify(prev));
                    arr.push(botMessage);
                    return arr;                    
                })
            }
            else {
                console.log("Failed to send chat =>", data.message );
            }
        }
        catch(error: any) {
            console.log("Failed to send chat =>", error.toString());
        }
        finally {
            setLoading(false);
        }

    }

    return (
        <div className='h-full pt-8'>
            <div className='h-[calc(100%-72px)] pb-4'>
                { uploadedPdfFiles.length > 0? (
                    <PerfectScrollbar 
                        containerRef={(ref) => scrollRef.current = ref}
                        options={{ suppressScrollX: true, wheelPropagation: false}}
                    >
                        {messages.map((item, idx) => 
                            <MessageBox message={item} key={`message-${idx}`}/>
                        )}

                    </PerfectScrollbar>
                ):(
                    <div className='h-full flex items-center justify-center'>
                        <p>You don't have any pdf files uploaded.  Please upload pdf files on the left side bar.</p>
                    </div>
                )}
            </div>
            <PromptEditor 
                handleSubmit={handleSubmit} 
                loading={loading}
                disabled={uploadedPdfFiles.length==0}
            />
        </div>
    );
}

export default ChatRoom;