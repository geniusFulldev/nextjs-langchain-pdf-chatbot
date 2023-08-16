<img src="https://github.com/geniusFulldev/nextjs-langchain-pdf-chatbot/blob/main/public/images/screenshots/1.png?raw=true" alt="OG Image">
<h1 align="center">Next.js PDF Chat</h3>

<p align="center">
  An open-source AI chatbot to chat with multiple PDF files.
</p>

<p align="center">
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#running-environment"><strong>Running Enviroment</strong></a> ·
  <a href="#deployment"><strong>Deployment</strong></a> ·
  <a href="#run-the-server"><strong>Run the server</strong></a> ·
  <a href="#references"><strong>References</strong></a>
</p>
<br/>


An open-source AI chatbot to chat with multiple PDF files.

## Tech Stack

- [Next.js 13](https://nextjs.org) App Router
- Typescript as a language
- Tailwind CSS as a CSS framework, with light and dark themes
- [NextAuth.js](https://github.com/nextauthjs/next-auth) for authentication
- Powered by [LangChain](https://docs.langchain.com/docs/) 
- OpenAI gpt-3.5-turbo as a language model (You can change it to gpt-4 if you have access to it)
- Pinecone as a vectorstore
- PostgreSQL and Sequelize as database and ORM for managing users and chat history

## Running Enviroment
 Node: 18.x

## Deployment
1. Clone the repo or download the ZIP
```
git clone [github https url]
```

2. Install packages
```
npm install
```

3. Set up .env.development 
- Copy .example.env.development to .env.development for local dev
- Copy .example.env.production to .env.production for production

- Fill env variables
```
OPENAI_API_KEY=
PINECONE_API_KEY=
PINECONE_ENVIRONMENT=
NEXTAUTH_SECRET=
```
 * Get an API key on openai dashboard and fill it in OPENAI_API_KEY.
 * Create an API key on pinecone dashboard and copy API key and Environment and then fill them in PINECONE_API_KEY and PINECONE_ENVIRONMENT.
 * Generate a random 32-digit hexadecimal string and fill it in NEXTAUTH_SECRET.

4. Set up database.
- Create a database in PostgreSQL on your local or remote
 For local dev, In sequelize/config/config.js, replace variables with your correct values under development.
 For production, In sequelize/config/config.js, replace variables with your correct values under production.

5. In lib/server/makechain.ts chain change the QA_PROMPT for your own usecase. Change modelName in new OpenAI to gpt-4, if you have access to gpt-4 api. 

6. In the Starter(free) plan, you cannot delete saved vectors in an index.
 In non-starter plan, you should open these lines
 * line 71 in lib/server/embeddings
 * line 115 in app/api/file/route.ts


## Run the server
- Run the app npm run dev to launch the local dev environment
 ```
 npm run dev
 ```
 Then this should be running on localhost:3000
- Upload PDF files and then type questions


## References
The parts of Chain and Embedding were inspired by [GPT-4 & LangChain](https://github.com/mayooear/gpt4-pdf-chatbot-langchain)
 
 
