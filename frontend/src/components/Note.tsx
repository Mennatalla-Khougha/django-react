import React from 'react'

function Note(
    {note, onDelete}: 
    {
        note: {id: number, 
            title: string, 
            content: string,
            created_at: string
        }, 
        onDelete: ((id: number) => void)
    }) {
    const newDate = new Date(note.created_at).toLocaleDateString("en-US")

  return (
    <div className='p-2 m-auto rounded-md'>
        <p>{note.title}</p>
        <p>{note.content}</p>
        <p>{newDate}</p>
        <button 
            onClick={() => onDelete(note.id)}
            className='bg-red-500 text-white rounded-md p-1'
        >Delete</button>
    </div>
  )
}

export default Note