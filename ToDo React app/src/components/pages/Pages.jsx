import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Button from '../helpers/Button'

const Pages = () => {
    return (
        <Routes>
            <Route path='fact' element={<Button>Route button</Button>} />
        </Routes>
    )
}


export default Pages;