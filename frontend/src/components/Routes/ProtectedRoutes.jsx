import { useAuth } from '@/context/AuthContext'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const navigate =useNavigate();

export const ProtectedRoutes = ({children}) => {
const { token } = useAuth()
    if(token)
        return children
    else
        return( navigate("/login"))
}
