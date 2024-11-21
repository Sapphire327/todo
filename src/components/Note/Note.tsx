import {FC, memo} from 'react'
import {Notes} from "@prisma/client";
import styles from './Note.module.scss'
import {NotesDto} from "@/types/dto";
import Image from "next/image";
interface props{
    note:NotesDto
    updateNote:(index:number)=>void
    deleteNote:(index:number)=>void
    index:number
}

const Note:FC<props> = memo(({note,updateNote,index,deleteNote}) => {
    return (
        <div className={styles.note}>
            <p className={styles.text}>{note.text}</p>
            <div className={styles.noteInfo}>
                <p>Приоритет: {note.priority.name}</p>
                <p>Дата создания: {new Date(note.createdAt).toLocaleString('ru', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</p>
                <div className={styles.btns}>
                    <button onClick={()=>{updateNote(index)}} className={styles.changeBtn}><Image width={24} height={24} src={'/icons/pencil-icon.svg'} alt={'Изменить'}/></button>
                    <button onClick={()=>{deleteNote(index)}} className={styles.deleteBtn}><Image width={24} height={24} src={'/icons/delete.svg'} alt={'Удалить'}/></button>
                </div>
            </div>
        </div>
    )
})
export default Note;