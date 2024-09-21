import prisma from '@/libs/prismadb'
import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt'
import { PrismaAdapter } from '@next-auth/prisma-adapter';


export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name:'credentials',
            credentials:{
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Credentials are Required')
                }

                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                });

                if(!user || !user?.hashedPassword){
                    throw new Error('Invalid credentials')
                }

                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)

                if(!isCorrectPassword){
                    throw new Error('Invalid credentials')
                }

                return user;
            }
        })
    ],

    pages:{
        signIn: '/'
    },

    debug: process.env.NODE_ENV !== 'production',

    session: {
        strategy: 'jwt'
    },

    secret: process.env.NEXT_PUBLIC_SECRET_KEY
}

export default NextAuth(authOptions);