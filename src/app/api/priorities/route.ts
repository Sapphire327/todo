import { PriorityDto, UserDto} from "@/types/dto";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request,response:Response) {
    const priorities = await prisma.priorities.findMany(
        {select:{id:true,name:true}}
    )
    return Response.json(priorities as PriorityDto[],{status:200})
}