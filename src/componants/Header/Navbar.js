import { useAuthContext } from 'contexts/AuthContext'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const { isAuth, dispatch } = useAuthContext()
    const handleLogout = () => {
        dispatch({ type: "SET_LOGGED_OUT" })
    }

    return (
        <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
            <div className="container">
                <Link className="navbar-brand" to='/' >Logo</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to='/'>Home</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link  " to='/about'>About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link  " to='/contact'>Contact</Link>
                        </li> */}
                        {
                            isAuth && <li className="nav-item">
                                <Link className="nav-link  " to='/addTodos'>AddTodos</Link>
                            </li>
                        }
                    </ul>

                    <div >
                        {!isAuth ? <>
                            < Link className="btn btn-light me-1" to='/auth/login' >Login</Link >
                            <Link className="btn btn-success" to='/auth/register' >Register</Link>
                        </>
                            :
                            <>
                                <Link className="btn btn-light me-2" to='/dashboard' >Dashboard</Link>
                                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                            </>
                        }
                    </div>

                </div>
            </div>
        </nav >
    )
}

export default Navbar