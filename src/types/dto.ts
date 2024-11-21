import {Notes, Priorities} from "@prisma/client";

export interface UserDto {
    nickname:string,
    password:string,
    login:string,
}
export interface NotesDto extends Pick<Notes, 'id'|'text' | 'createdAt'|'prioritiesId'>{
    priority: {name: string;}
}
export interface NotesCreateDto extends Pick<Notes,'text'|'prioritiesId'>{}
export interface NotesUpdateDto extends Pick<Notes,'id'|'text'|'prioritiesId'>{}
export interface PriorityDto extends Pick<Priorities,'id'|'name'>{}