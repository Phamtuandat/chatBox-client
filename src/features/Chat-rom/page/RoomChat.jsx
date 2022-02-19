import { AddOutlined } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import React from 'react'
import Header from '../components/Header'
import RoomList from '../components/RoomList'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import queryString from 'query-string'

function RoomChat({ handleClick = null, user = {}, roomList }) {
    const history = useHistory()
    const handleChangeRoom = (value) => {
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify({ roomId: value }),
        })
    }
    return (
        <Box display="flex" flexDirection="column">
            <Header user={user} />
            <RoomList roomList={roomList} handleClick={handleChangeRoom} />
            <Button
                color="primary"
                component="span"
                fullWidth
                startIcon={<AddOutlined />}
                variant="outlined"
                onClick={(value) => handleClick('room')}
            >
                Add room chat
            </Button>
        </Box>
    )
}

RoomChat.prototype = {
    handleClick: PropTypes.func,
    user: PropTypes.object,
    roomList: PropTypes.array,
}

export default RoomChat
