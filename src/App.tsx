import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import './App.css'
import { Container } from 'react-bootstrap'

function App() {
    return (
        <Container className='my-4'>
            <Routes>
                <Route path='/' element={'dd'} />
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
