import React from "react"
import { useContext, useState, createContext } from "react"


const InputContext = createContext()

const InputContextProvider = ({ children }) => {
    const [takeInputVal, setTakeInputVal] = useState("")

    return (
        <InputContext.Provider value={{ takeInputVal, setTakeInputVal }}>
            {children}
        </InputContext.Provider>
    )
}

export default InputContextProvider

export const useInputContext = () => useContext(InputContext)