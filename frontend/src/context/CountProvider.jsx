import React from 'react'
import CountContext from './CountContext'
import { useState } from 'react'
import { useEffect } from 'react'

export const CountProvider = ({ children }) => {
    const [countUploads, setCountUploads] = useState(() => {
        return Number(localStorage.getItem("countUploads"))
    })

    useEffect(() => {
        return () => {
            localStorage.setItem("countUploads", countUploads);
        }
    }, [countUploads])

    return (
        <CountContext.Provider value={{ countUploads, setCountUploads }}>
            {children}
        </CountContext.Provider>

    )
}
