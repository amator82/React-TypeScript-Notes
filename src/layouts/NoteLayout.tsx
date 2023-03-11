import React, { FC } from 'react'
import { Note } from '../types/note'
import { useParams, Navigate, Outlet } from 'react-router-dom'

type NoteLayoutProps = {
    notes: Note[]
}

const NoteLayout: FC<NoteLayoutProps> = ({ notes }) => {
    const { id } = useParams()
    const note = notes.find((n) => n.id === id)

    if (note == null) {
        return <Navigate to='/' replace />
    }

    return <Outlet context={note} />
}

export default NoteLayout
