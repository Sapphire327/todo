import NextAuth, {DefaultSession, DefaultUser} from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            id: number
        }& DefaultSession["user"]
    }
    interface User{
        userId:number &DefaultUser
    }
}
declare module "next-auth/jwt" {
    interface JWT {
        idToken?: string
        userId:number
    }

}
