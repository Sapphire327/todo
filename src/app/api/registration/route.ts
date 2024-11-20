import {UserDto} from "@/types/dto";
import {PrismaClient} from "@prisma/client";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const userdto:UserDto = await request.json()
    const user = await prisma.users.findFirst({where:{login:userdto.login}})
    if(userdto.login.length < 6)return new Response(`Логин должен быть не меньше 6 символов`,{status: 400})
    if(userdto.password.length < 6)return new Response(`Пароль должен быть не меньше 6 символов`,{status: 400})
    if(user)return new Response(`Такой логин уже занят, попробуйте другой`,{status: 400})
    const hashPassword =await bcrypt.hash(userdto.password,8)
    await prisma.users.create({data:{
        login:userdto.login,
        password:hashPassword,
        nickname:userdto.nickname
    }})
    return new Response(`Успешно зарегестрирован`,{status: 200})
}