import React from 'react'
import { Routes, Route } from 'react-router-dom'



// Pages
import Today from './Today'
import Upcoming from './Upcoming'
import Stickywall from './Stickywall'

const Index = () => {
    return (
        <>

            <Routes>
                <Route index element={<Today />} />
                <Route path='/upcoming' element={<Upcoming />} />
                <Route path='/stickywall' element={<Stickywall />} />


                <Route path='*' element={<h1>Error 404</h1>} />
            </Routes>
        </>
    )
}

export default Index