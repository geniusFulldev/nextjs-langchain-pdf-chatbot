import CredentialsProvider from 'next-auth/providers/credentials';

import { User } from 'next-auth';
import { db } from '@/sequelize/models';
// import { encodePayload, decodePayload } from '../auth';
// import { StoreUserContext } from '@types';

const providers = [
  CredentialsProvider({
    id: 'credentials',
    name: 'Credentials',
    credentials: {
      password: { label: "Password", type: "password" },
      email: {label: "Email", type: "text"},
    },
    async authorize(credentials) {
      try { 
        if (!credentials) return null;
        const { email, password  } = credentials;
        let retUser: User | null = null;
        if( email && password ) {

            const user = await db.models.User.findByCredentials(email, password);
            if( user ) {
                retUser = {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            }
        }

        return retUser;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  })
];

export default providers;