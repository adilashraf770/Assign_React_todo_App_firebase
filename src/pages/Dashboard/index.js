import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Hero from './Home/Hero'

const index = () => {
    return (
        <>
            <Routes>
                <Route index element={<Hero />} />
                <Route path='*' element={<h1>Error 404</h1>} />
            </Routes>
        </>
    )
}

export default index