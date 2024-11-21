'use client'
import Image from "next/image";
import styles from "./page.module.css";
import {useSession,getSession} from "next-auth/react";
import {useDispatch, useSelector} from "react-redux";
import {notesData, selectNotes} from "@/store/features/notes/notesSlice";
import {useEffect, useState} from "react";
import {AppDispatch} from "@/store/store";
import Note from "@/components/Note/Note";
import NotesForm from "@/components/Forms/NotesForm/NotesForm";
import Popup from "reactjs-popup";
import {priorityData} from "@/store/features/priorities/prioritiesSlice";
import {NotesCreateDto, NotesDto, NotesUpdateDto} from "@/types/dto";
import {useCreateNoteMutation, useUpdateNoteMutation} from "@/store/features/notes/notesApiSlice";

export default function Home() {
  const { data } = useSession()
  const dispatch = useDispatch<AppDispatch>();
  const {notes} = useSelector(selectNotes);
  const [createNote,{isSuccess}] = useCreateNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const [isOpenPopup,setIsOpenPopup] = useState(false)
  const [isCreate,setIsCreate] = useState(true)
  const [selectedNote,setSelectedNote] = useState<number>(-1)
  useEffect(() => {
    dispatch(notesData())
      dispatch(priorityData())
  }, []);
  const CreateNote=async(note:NotesCreateDto)=>{
      console.log(note.prioritiesId)
      await createNote(note)
      dispatch(notesData())
      setIsOpenPopup(false)
  }
  const UpdateNote=async(note:NotesUpdateDto)=>{
      await updateNote(note)
      dispatch(notesData())
      setIsOpenPopup(false)
  }
  const OpenChangeNote=(index:number)=>{
      setIsCreate(false)
      setSelectedNote(index)
      setIsOpenPopup(true)
  }
  const DeleteNote=()=>{}
  return (
      <div className='container'>
        <h1 className={styles.greeting}>Здравствуйте, {data?.user.name}</h1>
        <div className={styles.btnWrap}>
          <button onClick={()=>{setIsCreate(true);setIsOpenPopup(true)} } className={styles.addButton}>+</button>
        </div>

        <main className={styles.main}>
          <ul className={styles.notesList}>
            {notes.map((e,index) => {
              return <li key={e.id}><Note updateNote={OpenChangeNote} index={index} note={e}/></li>
            })}
          </ul>
        </main>
          <Popup open={isOpenPopup} onClose={()=>setIsOpenPopup(false)} position="center center" modal nested lockScroll
                 overlayStyle={{background: 'rgba(107,107,107,0.58)'}}>
              <NotesForm note={notes[selectedNote]} isCreate={isCreate} updateNote={UpdateNote} createNote={CreateNote}/>
          </Popup>
      </div>
  );
}
