import React, { useMemo, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import { v4 as uuidV4 } from 'uuid'

import NewNote from './pages/NewNote'
import NoteList from './pages/NoteList/NoteList'

import { useLocalStorage } from './hooks/useLocalStorage'

import { NoteData, RawNote, Tag } from './types/note'

function App() {
    const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
    const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

    const notesWithTags = useMemo(() => {
        return notes.map((note) => {
            return {
                ...note,
                tags: tags.filter((tag) => note.tagIds.includes(tag.id))
            }
        })
    }, [notes, tags])

    function onCreateNote({ tags, ...data }: NoteData) {
        setNotes((prevNotes) => {
            return [
                ...prevNotes,
                { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) }
            ]
        })
    }

    function addTag(tag: Tag) {
        setTags((prev) => [...prev, tag])
    }

    return (
        <Container className='my-4'>
            <Routes>
                <Route
                    path='/'
                    element={
                        <NoteList availableTags={tags} notes={notesWithTags} />
                    }
                />
                <Route
                    path='/new'
                    element={
                        <NewNote
                            onSubmit={onCreateNote}
                            onAddTag={addTag}
                            availableTags={tags}
                        />
                    }
                />
                <Route path='/:id'>
                    <Route index element={<h1>Show</h1>} />
                    <Route path='edit' element={<h1>Edit</h1>} />
                </Route>
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </Container>
    )
}

export default App
