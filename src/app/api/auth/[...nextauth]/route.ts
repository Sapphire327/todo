import NextAuth, {NextAuthOptions, User} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Вход',
            credentials: {
                login: { label: "Логин", type: "text"},
                password: { label: "Пароль", type: "password" },
            },
            async authorize(credentials) {
                if(!credentials) return null;
                const user = await prisma.users.findFirst({where:{login:credentials.login}})
                if(!user)throw new Error('Неправильный логин или пароль')
                const isPasswordRight = await bcrypt.compare(credentials.password,user.password)
                if(!isPasswordRight) throw new Error('Неправильный логин или пароль')
                return {userId:user.id,name:user.nickname} as User
            },
        }),
    ],
    pages: {
        signIn: '/sign-in/',
        signOut:'/sign-out',
        error:'/sign-in'
    },
    session: {
        strategy:'jwt'
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.userId = user.userId;
                token.name = user.name;
            }
            return token;
        },
        async session({session, token}) {
            if (token && session && session.user) {
                session.user.name = token.name;
                session.user.id = token.userId
            }
            return session;
        },
    }
    ,secret: process.env.NEXTAUTH_SECRET,
}


const handler = NextAuth(authOptions);
export {handler as GET,handler as POST};