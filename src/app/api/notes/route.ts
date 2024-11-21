import {NotesCreateDto, NotesDto, NotesUpdateDto, UserDto} from "@/types/dto";
import {Notes, PrismaClient} from "@prisma/client";
import bcrypt from 'bcrypt'
import {getSession} from "next-auth/react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(request: Request,response:Response) {
    const session= await getServerSession (authOptions);
    if(!session)return Response.json({errorMessage:'Нужна авторизация'},{status: 401})
    const notes = await prisma.notes.findMany({
        where:{usersId:session.user.id},
        include:{priority:{select:{name:true}}},
    })
    if(notes.length===0)Response.json([],{status:200})
    return Response.json(notes as NotesDto[],{status:200})
}
export async function POST(request: Request,response:Response) {
    const session= await getServerSession (authOptions);
    const note:NotesCreateDto = await request.json()
    if(!session)return Response.json({errorMessage:'Нужна авторизация'},{status: 401})
    console.log(note.prioritiesId)

    const notes = await prisma.notes.create({
       data:{
           usersId:session.user.id,
           text:note.text,
           prioritiesId:note.prioritiesId
       }
    })
    return Response.json(notes,{status:200})
}
export async function PUT(request: Request,response:Response) {
    const session= await getServerSession (authOptions);
    const note:NotesUpdateDto = await request.json()
    if(!session)return Response.json({errorMessage:'Нужна авторизация'},{status: 401})
    const notes = await prisma.notes.update({
        where:{id:note.id,usersId:session.user.id},
        data:{
            text:note.text,
            prioritiesId:note.prioritiesId
        }
    })
    return Response.json(notes,{status:200})
}
export async function DELETE(request: Request,response:Response) {
    const session= await getServerSession (authOptions);
    const note: { id:number } = await request.json()
    if(!session)return Response.json({errorMessage:'Нужна авторизация'},{status: 401})
    const notes = await prisma.notes.delete({
        where:{id:note.id,usersId:session.user.id},
    })
    return Response.json(notes,{status:200})
}