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
    SwipeableDrawer,
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
            if (!history.location.search) {
                setAnchor(true)
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }

        setAnchor(open)
    }

    return (
        <Box display="flex">
            <Grid container spacing={1}>
                <SwipeableDrawer
                    anchor={'left'}
                    onOpen={toggleDrawer(true)}
                    open={anchor}
                    onClose={toggleDrawer(false)}
                >
                    <Box
                        sx={{ width: 250, bgcolor: 'background.paper' }}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        <Toolbar color="primary">
                            <Typography variant="h6">Room List</Typography>
                        </Toolbar>
                        <List>
                            {roomList.map((x) => (
                                <Box key={x._id}>
                                    <ListItem disablePadding>
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
                                </Box>
                            ))}
                        </List>
                        <Box>
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
                </SwipeableDrawer>
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
