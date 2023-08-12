import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import AppAuthOptions from '@/lib/server/auth/auth-options';
import { getIndexName } from '@/lib/server/embeddings';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { pinecone } from '@/lib/server/pinecone-client';
import { makeChain } from '@/lib/server/makechain';
import { db } from '@/sequelize/models';

const PINECONE_NAME_SPACE = process.env.PINECONE_NAME_SPACE || "";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(AppAuthOptions);
        if( !session ) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized!"
            });
        }

        const req = await request.json();
        const { message } = req;
        if( !message ) {
            return NextResponse.json({
                success: false,
                message: "No question!"
            });            
        }
        const question = message.trim().replaceAll('\n', ' ').substring(0,500);
        if( question.length === 0 ) {
            return NextResponse.json({
                success: false,
                message: "No question!"
            });            
        }

        const indexName = getIndexName(session.user.id);

        try {
            const indexMeta = await pinecone.describeIndex({
                indexName
            });
        }
        catch(err: any) {
            return NextResponse.json({
                success: false,
                message: "No index"
            });
        }

        const index = pinecone.Index(indexName);
        
        /* create vectorstore*/
        const vectorStore = await PineconeStore.fromExistingIndex(
            new OpenAIEmbeddings({}),
            {
            pineconeIndex: index,
            textKey: 'text',
            namespace: PINECONE_NAME_SPACE, //namespace comes from your config folder
            },
        );

        const chain = makeChain(vectorStore);
        const history = await db.models.ChatHistory.loadChatHistory(session.user.id, 10);
        const response = await chain.call({
            question,
            chat_history: history
        });
        if(response.error) {
            return NextResponse.json({
                success: false,
                message: response.error
            });
        }
        
        let result = response.text.substring(0,1020);
        if( result.length === 1020 ) {
            result += "..."
        }
        await db.models.ChatHistory.addChat(session.user.id, question, result);
        return NextResponse.json({
            success: true,
            response: result
        });
    }
    catch(error: any) {
        return NextResponse.json({
            success: false,
            message: error.toString()
        });        
    }
}

/* Delete chat history */
export async function DELETE(request: NextRequest) {
    try {
        const session = await getServerSession(AppAuthOptions);
        if( !session ) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized!"
            });
        }

        await db.models.ChatHistory.deleteChatHistory(session.user.id);
        return NextResponse.json({
            success: true
        });
    }
    catch(error: any) {
        return NextResponse.json({
            success: false,
            message: error.toString()
        });        
    }
}