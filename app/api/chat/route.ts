import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import AppAuthOptions from '@/lib/server/auth/auth-options';
import { getIndexName } from '@/lib/server/embeddings';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { pinecone } from '@/lib/server/pinecone-client';

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
        const question = message.trim().replaceAll('\n', ' ');
        if( question.length === 0 ) {
            return NextResponse.json({
                success: false,
                message: "No question!"
            });            
        }

        const indexName = getIndexName(session.user.id);
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
  
    }
    catch(error: any) {
        return NextResponse.json({
            success: false,
            message: error.toString()
        });        
    }
}