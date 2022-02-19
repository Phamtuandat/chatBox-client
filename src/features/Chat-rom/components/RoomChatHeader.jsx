import { Avatar, AvatarGroup } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import * as React from 'react'
import SearchForm from './SearchForm'

export default function RoomChatHeader({ roomInfo, handleSearch }) {
    const handleAddUser = () => {}
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="default">
                <Toolbar variant="regular" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" color="inherit" component="div">
                        {roomInfo.name}
                    </Typography>
                    <Box width="400px">
                        <SearchForm onSubmit={handleSearch} handleAddUser={handleAddUser} />
                    </Box>
                    <Box>
                        <IconButton edge="end" color="inherit" aria-label="menu">
                            <AvatarGroup max={3} sx={{}}>
                                {roomInfo.users?.map((user) => (
                                    <Avatar alt={user.name} key={user.id} src={user.image} />
                                ))}
                            </AvatarGroup>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

RoomChatHeader.prototype = {
    roomInfo: PropTypes.object,
    handleClick: PropTypes.func,
}
