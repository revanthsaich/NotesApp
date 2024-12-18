import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
const NotePage = () => {

    let noteId=useParams().id
    let  [note,setNote]=useState(null)
    let navigate=useNavigate();

    useEffect(()=>{
        if(noteId!=="new"){
            getNote();
        }
    },[noteId])

    let getNote= async ()=>{
        if(noteId==='new') return
        let response=await axios.get(`/api/notes/${noteId}/`)
        setNote(response.data)
    };

    let updateNote= async ()=>{
        axios.put(`/api/notes/${noteId}/update/`,note)
    };

    let createNote= async ()=>{
        axios.post(`/api/notes/create/`,note)
    };

    let deleteNote= async ()=>{
        axios.delete(`/api/notes/${noteId}/delete/`)
        navigate('/')
    }
    let handleSubmit=  ()=>{
        if(noteId!=="new"&& !note.body){
            deleteNote()
        }
        else if(noteId!=="new"){
            updateNote()
        }
        else if(noteId==="new" && note!==null){
            createNote()
        }
        navigate('/')
    }
    return (
        <div className="note">
            <div className="note-header">
                <FontAwesomeIcon icon={faArrowLeft}  onClick={handleSubmit} />

                {noteId!=='new'?(
                    <button onClick={deleteNote}>Delete</button>
                ):(<button onClick={handleSubmit}>Done</button>)}
            </div>
            <textarea onChange={(e)=>{setNote({...note,'body':e.target.value})}} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage