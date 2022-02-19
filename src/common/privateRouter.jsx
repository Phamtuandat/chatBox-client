import React from 'react'
import { Redirect, Route } from 'react-router'

function PrivateRouter(props) {
    const isLoggedIn = Boolean(localStorage.getItem('token'))
    if (!isLoggedIn) return <Redirect to="/auth" />
    return <Route {...props} />
}

export default PrivateRouter
