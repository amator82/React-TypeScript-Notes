import React, { useMemo, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import { v4 as uuidV4 } from 'uuid'

import NewNote from './pages/NewNote'
import NoteList from './pages/NoteList/NoteList'

import { useLocalStorage } from './hooks/useLocalStorage'

import { NoteData, RawNote, Tag } from './types/note'
import NoteLayout from './layouts/NoteLayout'
import Note from './components/Note'
import EditNote from './pages/EditNote'

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

    function onUpdateNote(id: string, { tags, ...data }: NoteData) {
        setNotes((prevNotes) => {
            return prevNotes.map((note) => {
                if (note.id === id) {
                    return {
                        ...note,
                        ...data,
                        tagIds: tags.map((tag) => tag.id)
                    }
                } else {
                    return note
                }
            })
        })
    }

    function onDeleteNote(id: string) {
        setNotes((prevNotes) => {
            return prevNotes.filter((note) => note.id !== id)
        })
    }

    function addTag(tag: Tag) {
        setTags((prev) => [...prev, tag])
    }

    function updateTag(id: string, label: string) {
        setTags((prevTags) => {
            return prevTags.map((tag) => {
                if (tag.id === id) {
                    return { ...tag, label }
                } else {
                    return tag
                }
            })
        })
    }

    function deleteTag(id: string) {
        setTags((prevTags) => {
            return prevTags.filter((tag) => tag.id !== id)
        })
    }

    return (
        <Container className='my-4'>
            <Routes>
                <Route
                    path='/'
                    element={
                        <NoteList
                            onUpdateTag={updateTag}
                            onDeleteTag={deleteTag}
                            availableTags={tags}
                            notes={notesWithTags}
                        />
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
                <Route
                    path='/:id'
                    element={<NoteLayout notes={notesWithTags} />}
                >
                    <Route index element={<Note onDelete={onDeleteNote} />} />
                    <Route
                        path='edit'
                        element={
                            <EditNote
                                onSubmit={onUpdateNote}
                                onAddTag={addTag}
                                availableTags={tags}
                            />
                        }
                    />
                </Route>
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </Container>
    )
}

export default App
