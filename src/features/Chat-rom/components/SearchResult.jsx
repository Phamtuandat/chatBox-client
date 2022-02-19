import { AddCircleOutlineTwoTone, Check } from '@mui/icons-material'
import {
    Avatar,
    CircularProgress,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import { roomInfoSelector } from '../ChatRoomSlice'
import { userListSelector } from '../userSlice'

function SearchResult({ handleAdd, loading }) {
    const userList = useSelector(userListSelector)
    const RoomInfo = useSelector(roomInfoSelector)

    const isExisted = (id) => {
        const ind = RoomInfo.users.findIndex((user) => user._id === id)

        if (ind !== -1) {
            return true
        } else {
            return false
        }
    }

    return (
        <Box width="100%" top="50px">
            <Box>
                {userList.length !== 0 && (
                    <List>
                        {userList.map((user) => (
                            <>
                                <ListItem key={user.id}>
                                    <ListItemIcon>
                                        <Avatar src={user.image} />
                                    </ListItemIcon>
                                    <ListItemText primary={user.name} />
                                    {isExisted(user._id) ? (
                                        <Check color="primary" />
                                    ) : (
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleAdd(user._id)}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <CircularProgress size={20} />
                                            ) : (
                                                <AddCircleOutlineTwoTone />
                                            )}
                                        </IconButton>
                                    )}
                                </ListItem>
                                <Divider />
                            </>
                        ))}
                    </List>
                )}
            </Box>
        </Box>
    )
}

export default SearchResult
