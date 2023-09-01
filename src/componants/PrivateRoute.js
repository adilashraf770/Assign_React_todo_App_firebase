import { useAuthContext } from 'contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ Component }) => {
    const { isAuth } = useAuthContext()
    if (!isAuth)
        return <Navigate to='/auth/login' />
    else
        <Component />

}

export default PrivateRoute