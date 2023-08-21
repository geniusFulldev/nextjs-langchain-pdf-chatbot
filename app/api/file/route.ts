
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises'
import fs from "fs";
import { createEmbeddingData, deleteVectors } from '@/lib/server/embeddings';
import { getServerSession } from 'next-auth';
import AppAuthOptions from '@/lib/server/auth/auth-options';
import { getFiles } from '@/lib/server/utils';

// export const config = {
//   api: {
//     bodyParser: false
//   }
// };

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(AppAuthOptions);
        if( !session ) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized!"
            });
        }

        /* Uploading pdf file */        
        const userId = session.user.id;
        const data = await req.formData();
        const formDataEntryValues = Array.from(data.getAll('file'))

        if(formDataEntryValues.length == 0 ) {
            return NextResponse.json({ success: false });
        }

        if(!fs.existsSync('./public/docs')) {
            await mkdir('./public/docs');
        }
        
        const uploadDir = `./public/docs/${userId}`;
        if( !fs.existsSync(uploadDir)) {
            await mkdir(uploadDir);
        }

        for(const formDataEntryValue  of formDataEntryValues ) {
            if (typeof formDataEntryValue === "object" && "arrayBuffer" in formDataEntryValue) {
                const file = formDataEntryValue as unknown as Blob;
                const bytes = await file.arrayBuffer()
                const buffer = Buffer.from(bytes)
        
                const path = `${uploadDir}/${file.name}`
                await writeFile(path, buffer)
                console.log(`open ${path} to see the uploaded file`)
            }
        }
        /* Create embedding data and save them to pinecone */
        await createEmbeddingData(userId, uploadDir);

        return NextResponse.json({ success: true })
    
    }
    catch(error: any) {
        return NextResponse.json({
            success: false,
            message: error.toString()
        });
    }
}

export async function GET(reqest: NextRequest) {
    try {
        const session = await getServerSession(AppAuthOptions);
        if( !session ) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized!"
            });
        }
        const userId = session.user.id;
        const uploadDir = `./public/docs/${userId}`;
        const files = getFiles(uploadDir);
        const fnames = files.map(f => {
            const idx = f.lastIndexOf('/');
            return f.substring(idx+1);
        })
        return NextResponse.json({
            success: true,
            files: fnames
        });
    }   
    catch(error: any) {
        console.log('get files error =>', error);
        return NextResponse.json({
            success: false,
            message: error.toString()
        });
    }
}

export async function DELETE() {
    try {
        const session = await getServerSession(AppAuthOptions);
        if( !session ) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized!"
            });
        }

        const userId = session.user.id;
        const uploadDir = `./public/docs/${userId}`;
        fs.rmSync(uploadDir, { recursive: true, force: true });

        /* Delete all vectors */
        /* This is not working for starter enviroment */
        // await deleteVectors(userId);

        return NextResponse.json({
            success: true,
        });        
    }
    catch(error: any) {
        return NextResponse.json({
            success: false,
            message: error.toString()
        });
    }
}