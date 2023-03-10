import React, { FC } from 'react'
import NoteForm from './../components/NoteForm'
import { NoteData } from '../types/note'

type NewNoteProps = {
    onSubmit: (data: NoteData) => void
}

const NewNote: FC<NewNoteProps> = ({ onSubmit }) => {
    return (
        <>
            <h1 className='mb-4'>NewNote</h1>
            <NoteForm onSubmit={onSubmit} />
        </>
    )
}

export default NewNote
