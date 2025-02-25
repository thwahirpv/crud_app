import React, { createContext, useEffect, useState } from 'react'
import { PROFILE, USERNAME } from '../constants/token'

const ContextProvider = createContext()

const Context = ({children}) => {
    const [ username, setUsername ] = useState('')
    const [ profile, setProfile ] = useState(null)
    const [ searchTXT, setSearchTXT ] = useState('')

    useEffect(() => {
        const user = localStorage.getItem(USERNAME)
        setUsername(user)
        const profilePicture = localStorage.getItem(PROFILE)
        setProfile(`http://127.0.0.1:8000/${profilePicture}`)
    })

  return (
    <ContextProvider.Provider value={{ username, setUsername, profile, setProfile, searchTXT, setSearchTXT }} >
        {children}
    </ContextProvider.Provider>
  )
}

export {ContextProvider}
export default Context
