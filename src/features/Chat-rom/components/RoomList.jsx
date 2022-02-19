import {
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'

function RoomList({ handleClick = null, roomList = [] }) {
    return (
        <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    ROOM LIST
                </ListSubheader>
            }
        >
            <Divider />
            {roomList.map((x) => (
                <ListItemButton key={x._id} onClick={(value) => handleClick(x._id)}>
                    <ListItemIcon>
                        <PeopleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary={x.name} />
                </ListItemButton>
            ))}
        </List>
    )
}
RoomList.propTypes = {
    handleClick: PropTypes.func,
    roomList: PropTypes.array,
}

export default RoomList
