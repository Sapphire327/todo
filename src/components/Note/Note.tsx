import { FC } from 'react'
import {Notes} from "@prisma/client";
import styles from './Note.module.scss'
import {NotesDto} from "@/types/dto";
interface props{
    note:NotesDto
}

const Note:FC<props> = ({note}) => {
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
            </div>
        </div>
    )
};
export default Note;