import { auth, firestore } from 'config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
const AuthContext = createContext()
const initialState = {
    isAuth: false, user: {}
}

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_LOGGED_IN":
            return { isAuth: true, user: payload.user }
        case "SET_LOGGED_OUT":
            return initialState
        default:
            return state
    }
}
const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [isAppLoading, setIsAppLoading] = useState(false)
    const [user, setUser] = useState(null)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                readUserProfile(user)
                setUser(user)
            }
            else
                setIsAppLoading(true)
        });
    }, [])
    const readUserProfile = async (user) => {
        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            user = docSnap.data()
            dispatch({ type: "SET_LOGGED_IN", payload: { user } })
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }


    return (
        <AuthContext.Provider value={{ isAppLoading, ...state, dispatch, readUserProfile, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider

export const useAuthContext = () => useContext(AuthContext)
