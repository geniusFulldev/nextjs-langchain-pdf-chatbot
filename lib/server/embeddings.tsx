import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { pinecone } from './pinecone-client';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';

/*  For starter, please don't specify this env variable */
const PINECONE_NAME_SPACE = process.env.PINECONE_NAME_SPACE || "";

export function getIndexName(userId: string) {
    const str = userId.substring(0,42);
    return `p${str}`;
}

async function createIndex(userId: string) {
    try {
        const indexName = getIndexName(userId);
        await pinecone.createIndex({
            createRequest: {
                name: indexName,
                dimension: 1536,
                metric: 'cosine'
            }
        })
    }
    catch(error: any) {
        console.log('createIndex error =>', error);
        throw error;        
    }
}

export async function createEmbeddingData(userId: string, pdfDir: string){
  try {
    /*load raw docs from the all files in the directory */
    const directoryLoader = new DirectoryLoader(pdfDir, {
      '.pdf': (path) => new PDFLoader(path),
    });

    const rawDocs = await directoryLoader.load();

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    console.log('split docs', docs);

    /*  Create Index */
    const indexName = getIndexName(userId);
    try {
        await pinecone.describeIndex({
            indexName
        });
    }
    catch(err) {
        await createIndex(userId);
    }

    console.log('creating vector store...');
    /*create and store the embeddings in the vectorStore*/

    const embeddings = new OpenAIEmbeddings();
    const index = pinecone.Index(indexName);

    /* Delete all vectors */
    /* This is not working for starter enviroment */
    // await index.delete1({deleteAll: true, namespace: PINECONE_NAME_SPACE});

    //embed the PDF documents
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: PINECONE_NAME_SPACE,
      textKey: 'text',
    });
  } catch (error) {
    console.log('error =>', error);
    throw new Error('Failed to ingest your data');
  }
};

export async function deleteVectors(userId: string) {
    const indexName = getIndexName(userId);
    try {
        await pinecone.describeIndex({
            indexName
        });
        const index = pinecone.Index(indexName);
        await index.delete1({deleteAll: true, namespace: PINECONE_NAME_SPACE});
    }
    catch(err) {
        await createIndex(userId);
    }

}