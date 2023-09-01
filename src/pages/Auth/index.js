import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Login from './Login'
import Register from './Register'
const index = () => {
    return (
        <>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                {/* <Route path='/forgetpassword' element={<ForgetPassword />} /> */}
                {/* <Route path='/resetpassword' element={<ResetPassword />} /> */}
                <Route path='*' element={<h1>Error 404</h1>} />
            </Routes>
        </>
    )
}

export default index