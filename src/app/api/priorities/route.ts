import {NotesCreateDto, NotesDto, NotesUpdateDto, PriorityDto, UserDto} from "@/types/dto";
import {Notes, PrismaClient} from "@prisma/client";
import bcrypt from 'bcrypt'
import {getSession} from "next-auth/react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;

const prisma = new PrismaClient();

export async function GET(request: Request,response:Response) {
    const priorities = await prisma.priorities.findMany(
        {select:{id:true,name:true}}
    )
    return Response.json(priorities as PriorityDto[],{status:200})
}