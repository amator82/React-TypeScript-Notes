import React from 'react'
import { useNote } from './../hooks/useNote'
import { Row, Col, Stack, Badge, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

const Note = () => {
    const note = useNote()

    return (
        <>
            <Row className='align-items-center mb-4'>
                <Col>
                    <h1>{note.title}</h1>
                    <Stack gap={1} direction='horizontal' className='flex-wrap'>
                        {note.tags.map((tag) => (
                            <Badge className='text-truncate' key={tag.id}>
                                {tag.label}
                            </Badge>
                        ))}
                    </Stack>
                </Col>
                <Col sx='auto'>
                    <Stack gap={2} direction='horizontal'>
                        <Link to={`/${note.id}/edit`}>
                            <Button variant='primary'>Edit</Button>
                        </Link>
                        <Button variant='outline-danger'>Delete</Button>
                        <Link to='..'>
                            <Button variant='outline-secondary'>Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown>{note.markdown}</ReactMarkdown>
        </>
    )
}

export default Note
