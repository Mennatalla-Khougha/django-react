import React, { useEffect, useState } from 'react'
import api from '../api'
import Note from '../components/Note'

function Home() {
  const [notes, setNotes] = useState([])
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")

  useEffect(() => {
    getNotes()
  }, [])

  function getNotes() {
    api.get("/api/notes/")
    .then((res) => res.data)
    .then((data) => {
      setNotes(data)
      console.log(data)
    })
    .catch((error) => console.error("Error fetching notes: ", error))
  }

  function createNote(e: React.FormEvent) {
    e.preventDefault()
    api.post("/api/notes/", {
      title: title,
      content: content
    })
  .then((res) => {
    if (res.status === 201) {
      console.log("Note created")
    } else {
      console.log("Error creating note")
      } 
    getNotes()
  }).catch((error) => console.error("Error creating note: ", error))
  }

  function deleteNote(id: number) {
    api.delete(`/api/notes/delete/${id}/`)
    .then((res) => {
      if (res.status === 204) {
        console.log("Note deleted")
    } else {  
      console.log("Error deleting note")
      }
    getNotes()
  }).catch((error) => console.error("Error deleting note: ", error))
  }

  return (
    <div>
      <div>
        <h2>
          Notes
        </h2>
        {notes.map((note:
         { id: number,
           title: string, 
           content: string, 
           created_at: string
          }) => <Note
           key={note.id} 
           note={note} 
           onDelete={deleteNote} 
           />
           )}
      </div>

      <h2>
        Create a Note
      </h2>
      <form onSubmit={createNote}>
        <label htmlFor='title'>
          Title
          <input
            type="text"
            id='title'
            name='title'
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Content
          <textarea
            id='content'
            name='content'
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <br />
        <button 
          onClick={createNote} 
          type='submit'
          value="submit"
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default Home