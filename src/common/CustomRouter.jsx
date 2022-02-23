import React from 'react'
import { Redirect, Route } from 'react-router'

function CustomRouter(props) {
    const isLogged = Boolean(localStorage.getItem('token'))
    if (isLogged) return <Redirect to="/chatPage" />
    return <Route {...props} />
}

export default CustomRouter
