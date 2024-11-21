import {UserDto} from "@/types/dto";
import {PrismaClient} from "@prisma/client";
import bcrypt from 'bcrypt'
import {getSession} from "next-auth/react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(request: Request,response:Response) {
    // const session= await getServerSession (authOptions);
    const userdto:UserDto = await request.json()
    const user = await prisma.users.findFirst({where:{login:userdto.login}})
    if(userdto.login.length < 6)return Response.json({errorMessage:`Логин должен быть не меньше 6 символов`},{status: 400})
    if(userdto.password.length < 6)return Response.json({errorMessage:`Пароль должен быть не меньше 6 символов`},{status: 400})
    if(user)return Response.json({errorMessage:`Такой логин уже занят, попробуйте другой`},{status: 400})
    const hashPassword =await bcrypt.hash(userdto.password,8)
    await prisma.users.create({data:{
        login:userdto.login,
        password:hashPassword,
        nickname:userdto.nickname
    }})
    return Response.json({text:''},{status:200})
}