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
    deleteNote:()=>void,
}
// ...(!isCreate&& {defaultValues:note})

const ConfirmDeletion:FC<props> = ({deleteNote}) => {
    return (
        <div className={clsx(styles.form,styles.NoteForm)}>
            <div className={styles.formBody}>
                <p className={styles.question}>Вы уверены что хотите удалить заметку?</p>
                <button onClick={()=>{deleteNote()}} className={clsx('button',styles.formBtn)}>Удалить</button>
            </div>
        </div>
    )
};
export default ConfirmDeletion;