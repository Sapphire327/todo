'use client'
import {FC, useEffect} from 'react'
import {useSignUpMutation} from "@/store/features/registration/registration";
import {SubmitHandler, useForm} from "react-hook-form";
import {NotesCreateDto, NotesDto, NotesUpdateDto, UserDto} from "@/types/dto";
import styles from '../Form.module.scss'
import {getMessageFromError} from "@/helpers/errorPredicates";
import clsx from "clsx";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {selectNotes} from "@/store/features/notes/notesSlice";
import {selectPriorities} from "@/store/features/priorities/prioritiesSlice";

interface props{
    isCreate:boolean,
    note?:NotesDto,
    createNote:(note:NotesCreateDto)=>void,
    updateNote:(note:NotesUpdateDto)=>void,
}
// ...(!isCreate&& {defaultValues:note})

const NotesForm:FC<props> = ({createNote,isCreate,updateNote,note}) => {
    const defaultVal = isCreate?null:note;
    const { register, handleSubmit,formState: { errors } } = useForm<NotesCreateDto>({defaultValues:defaultVal});

    const {priorities} = useSelector(selectPriorities)
    const onSubmit: SubmitHandler<NotesCreateDto> =async (data) => {
        data.prioritiesId = parseInt(data.prioritiesId.toString())
        if(isCreate)
            createNote(data)
        else if(note)
            updateNote({...data,id:note.id})
    }
    return (
        <form className={clsx(styles.form,styles.NoteForm)} onSubmit={handleSubmit(onSubmit)}>
            <h2 className='title'>{isCreate?'Добавить заметку':'Изменить заметку'}</h2>
            <div className={styles.formBody}>
                <input className='input' placeholder='Заметка' type='nickname' {...register("text", {required: true})} />
                <select {...register("prioritiesId", {required: true})}>
                    {priorities.map((prioritet)=> {
                        return <option key={prioritet.id} value={prioritet.id}>{prioritet.name}</option>
                    })}
                </select>
                <input type="submit" className={clsx('button',styles.formBtn)} value={isCreate?'Добавить заметку':'Изменить заметку'}/>
            </div>
        </form>
    )
};
export default NotesForm;