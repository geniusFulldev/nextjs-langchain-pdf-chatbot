import { PineconeClient } from '@pinecone-database/pinecone';

const PINECONE_ENVIRONMENT = process.env.PINECONE_ENVIRONMENT;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;

if (!PINECONE_ENVIRONMENT || !PINECONE_API_KEY) {
  throw new Error('Pinecone environment or api key vars missing');
}

async function initPinecone() {
  try {
    const pinecone = new PineconeClient();

    console.log('process.env.PINECONE_API_KEY =>', PINECONE_API_KEY, PINECONE_ENVIRONMENT);
    await pinecone.init({
      environment: PINECONE_ENVIRONMENT ?? '', //this is in the dashboard
      apiKey: PINECONE_API_KEY ?? '',
    });

    return pinecone;
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to initialize Pinecone Client');
  }
}

export const pinecone = await initPinecone();
