import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Frontend from 'pages/Frontend'
import Auth from './Auth'
// import Dashboard from './Dashboard'
import { useAuthContext } from 'contexts/AuthContext'
// import PrivateRoute from 'componants/PrivateRoute'
const Index = () => {
    const { isAuth } = useAuthContext()


    return (
        <>
            <Routes>
                <Route path='/*' element={<Frontend />} />
                < Route path='/auth/*' element={!isAuth ? <Auth /> : <Navigate to='/' />} />
                {/* <Route path='/dashboard/*' element={<PrivateRoute Component={Dashboard} />} /> */}

                <Route path='*' element={<h1>Error 404</h1>} />
            </Routes>
        </>
    )
}

export default Index