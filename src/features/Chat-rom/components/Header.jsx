import { AppBar, Avatar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Logout } from '../../Auth/AuthSlice'
import PropTypes from 'prop-types'

function Header() {
    const user = useSelector((state) => state.Auth.current.user)
    const history = useHistory()
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(Logout())
        history.push('/auth')
    }
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                    <Avatar alt={user.name} src={user?.image} />
                </IconButton>
                <Typography variant="inherit" component="div" sx={{ flexGrow: 1 }}>
                    {user.name}
                </Typography>
                <Button color="inherit" variant="outlined" onClick={handleLogout}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    )
}

Header.prototype = {
    user: PropTypes.object,
}

export default Header
