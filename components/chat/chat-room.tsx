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
        text: `Executing (default): SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'ChatHistory'
        Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'ChatHistory' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
    },
    {
        type: 'user',
        text: 'Hi'
    },
    {
        type: 'bot',
        text: `Executing (default): SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'ChatHistory'
        Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'ChatHistory' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
    },    {
        type: 'user',
        text: 'Hi'
    },
    {
        type: 'bot',
        text: `Executing (default): SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'ChatHistory'
        Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'ChatHistory' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
    },    {
        type: 'user',
        text: 'Hi'
    },
    {
        type: 'bot',
        text: `Executing (default): SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'ChatHistory'
        Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'ChatHistory' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
    },    {
        type: 'user',
        text: 'Hi'
    },
    {
        type: 'bot',
        text: `Executing (default): SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'ChatHistory'
        Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'ChatHistory' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
    },    {
        type: 'user',
        text: 'Hi'
    },
    {
        type: 'bot',
        text: `Executing (default): SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'ChatHistory'
        Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'ChatHistory' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
    },
];

const ChatRoom = () => {
    const [messages, setMessages] = useState<Message[]>([]);
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