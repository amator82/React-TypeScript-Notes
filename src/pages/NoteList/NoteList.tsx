import React, { FC, useState, useMemo } from 'react'
import { Button, Col, Row, Stack, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'

import { SimpifiedNote, Tag } from '../../types/note'

import NoteCard from '../../components/NoteCard'
import EditTagsModal from '../../components/EditTagsModal'

type NoteListProps = {
    availableTags: Tag[]
    notes: SimpifiedNote[]
    onDeleteTag: (id: string) => void
    onUpdateTag: (id: string, label: string) => void
}

const NoteList = ({
    availableTags,
    notes,
    onDeleteTag,
    onUpdateTag
}: NoteListProps) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState<string>('')
    const [editTagsModalIsOpen, setEditTagsModalIsOpen] =
        useState<boolean>(false)

    const filteredNotes = useMemo(() => {
        return notes.filter((note) => {
            return (
                (title === '' ||
                    note.title.toLowerCase().includes(title.toLowerCase())) &&
                (selectedTags.length === 0 ||
                    selectedTags.every((tag) =>
                        note.tags.some((noteTag) => noteTag.id === tag.id)
                    ))
            )
        })
    }, [title, selectedTags, notes])

    return (
        <>
            <Row className='align-items-center mb-4'>
                <Col>
                    <h1>Notes</h1>
                </Col>
                <Col sx='auto'>
                    <Stack gap={2} direction='horizontal'>
                        <Link to='/new'>
                            <Button variant='primary'>Create</Button>
                        </Link>
                        <Button
                            onClick={() => setEditTagsModalIsOpen(true)}
                            variant='outline-secondary'
                        >
                            Edit Tags
                        </Button>
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className='mb-4'>
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect
                                value={selectedTags.map((selectedTag) => {
                                    return {
                                        label: selectedTag.label,
                                        value: selectedTag.id
                                    }
                                })}
                                options={availableTags.map((availableTag) => {
                                    return {
                                        label: availableTag.label,
                                        value: availableTag.id
                                    }
                                })}
                                onChange={(tags) => {
                                    setSelectedTags(
                                        tags.map((tag) => {
                                            return {
                                                label: tag.label,
                                                id: tag.value
                                            }
                                        })
                                    )
                                }}
                                isMulti
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row xs={1} sm={2} lg={3} xl={4} className='g-3'>
                {filteredNotes.map((note) => (
                    <Col key={note.id}>
                        <NoteCard
                            id={note.id}
                            title={note.title}
                            tags={note.tags}
                        />
                    </Col>
                ))}
            </Row>
            <EditTagsModal
                onDeleteTag={onDeleteTag}
                onUpdateTag={onUpdateTag}
                show={editTagsModalIsOpen}
                handleClose={() => setEditTagsModalIsOpen(false)}
                availableTags={availableTags}
            />
        </>
    )
}

export default NoteList
