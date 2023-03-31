import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export const AuthRoute = ({redirect = '/'}) => {
    const { user } = useAuth()

    if (user) return <Navigate to={redirect}/>

    return <Outlet/>
}