import { MenuOutlined } from '@mui/icons-material'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import {
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    Grid,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Toolbar,
    Typography,
} from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import RoomApi from '../../AxiosClient/RoomAPI'
import { Logout } from '../Auth/AuthSlice'
import AddModal from '../Chat-rom/components/AddModal'
import Chatting from './page/Chatting'
import RoomChat from './page/RoomChat'
import queryString from 'query-string'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    p: 4,
}

function ChattingPage() {
    const history = useHistory()

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [mode, setMode] = useState('room')
    const [roomList, setRoomList] = useState([])
    const current = useSelector((state) => state.Auth.current)
    const dispatch = useDispatch()
    const handleClose = () => {
        setOpen(false)
        setLoading(false)
    }

    const handleOpenAddForm = (value) => {
        setMode(value)
        setOpen(true)
    }
    const [anchor, setAnchor] = useState(false)

    useEffect(() => {
        ;(async () => {
            const data = await RoomApi.getAll()
            setRoomList(data)
        })()
    }, [])
    const handleAddRoom = async (value) => {
        let data
        setLoading(true)
        try {
            data = await RoomApi.new(value)
            setRoomList(data)
            handleClose()
            setLoading(false)
        } catch (error) {
            console.log(error.response)
        }
        setLoading(true)
    }

    return (
        <Box display="flex">
            <Hidden lgUp>
                <Box
                    sx={{ width: '60px' }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                >
                    <IconButton size="large" onClick={() => setAnchor(true)}>
                        <MenuOutlined sx={{ fontSize: '32px' }} />
                    </IconButton>
                    <IconButton size="small" sx={{ my: 1 }}>
                        <Avatar src={current.user.image} alt={current.user.name} />
                    </IconButton>
                </Box>
            </Hidden>
            <Grid container spacing={1}>
                <Drawer anchor={'left'} open={anchor} onClose={() => setAnchor(false)}>
                    <Box
                        sx={{ width: 300, bgcolor: 'background.paper' }}
                        display="flex"
                        flexDirection="column"
                    >
                        <Toolbar color="primary">
                            <Typography variant="h6">Room List</Typography>
                        </Toolbar>
                        <List>
                            {roomList.map((x) => (
                                <>
                                    <ListItem disablePadding key={x.id}>
                                        <ListItemButton
                                            sx={{ my: 1 }}
                                            onClick={() => {
                                                history.push({
                                                    pathname: history.location.pathname,
                                                    search: queryString.stringify({
                                                        roomId: x._id,
                                                    }),
                                                })
                                                setAnchor(false)
                                            }}
                                        >
                                            <ListItemIcon>
                                                <GroupsOutlinedIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={x.name}
                                                primaryTypographyProps={{
                                                    fontSize: 18,
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider />
                                </>
                            ))}
                        </List>
                        <Box display="flex">
                            <Button
                                fullWidth
                                color="secondary"
                                variant="outlined"
                                onClick={() => {
                                    dispatch(Logout())
                                    history.push('/auth')
                                }}
                                size="large"
                            >
                                Logout
                            </Button>
                        </Box>
                    </Box>
                </Drawer>
                <Hidden lgDown>
                    <Grid item xs={12} md={12} lg={3}>
                        <Paper elevation={3} sx={{ height: '100vh' }}>
                            <RoomChat
                                handleClick={handleOpenAddForm}
                                user={current.user}
                                roomList={roomList}
                            />
                        </Paper>
                    </Grid>
                </Hidden>
                <Grid item xs={12} md={12} lg={9}>
                    <Paper elevation={3} sx={{ height: '100vh' }}>
                        <Chatting current={current} />
                    </Paper>
                </Grid>
            </Grid>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Paper sx={style}>
                        <Typography variant="h6" align="center" component="div" sx={{ mb: 2 }}>
                            ADD ROOM CHAT
                        </Typography>
                        <AddModal mode={mode} onSubmit={handleAddRoom} loading={loading} />
                    </Paper>
                </Fade>
            </Modal>
        </Box>
    )
}

export default ChattingPage
