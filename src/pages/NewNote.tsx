import React, { FC } from 'react'
import NoteForm from './../components/NoteForm'
import { NoteData, Tag } from '../types/note'

type NewNoteProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

const NewNote: FC<NewNoteProps> = ({ onSubmit, onAddTag, availableTags }) => {
    return (
        <>
            <h1 className='mb-4'>NewNote</h1>
            <NoteForm
                onSubmit={onSubmit}
                onAddTag={onAddTag}
                availableTags={availableTags}
            />
        </>
    )
}

export default NewNote
