import { Box, Typography } from '@mui/material'
import queryString from 'query-string'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import io from 'socket.io-client'
import MessageApi from '../../../AxiosClient/Message'
import { roomActions, roomInfoSelector } from '../ChatRoomSlice'
import ChatPanel from '../components/ChatPanel'
import RoomChatHeader from '../components/RoomChatHeader'

function Chatting(props) {
    const socket = io.connect('https://realtimechatb.herokuapp.com/')

    const dispatch = useDispatch()

    const location = useLocation()
    const history = useHistory()

    const roomInfo = useSelector(roomInfoSelector)

    const [messages, setMessage] = useState([])

    const user = useSelector((state) => state.Auth.current.user)

    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        return {
            roomId: params.roomId,
        }
    }, [location.search])

    useEffect(() => {
        if (!queryParams.roomId) return
        socket.emit('subscribe', queryParams.roomId, user.id)
        socket.on('new message', (newMessage) => {
            setMessage((prev) => [...prev, newMessage.message])
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams.roomId])
    useEffect(() => {
        if (!queryParams.roomId) return
        dispatch(roomActions.fetchRoomInfo(queryParams.roomId))
    }, [dispatch, history, queryParams.roomId])
    useEffect(() => {
        if (!queryParams.roomId) return
        ;(async () => {
            try {
                const mess = await MessageApi.getConversation(queryParams.roomId, {
                    params: {
                        page: 0,
                        limit: 12,
                    },
                })
                setMessage(mess)
            } catch (error) {}
        })()
    }, [dispatch, history, queryParams.roomId])

    const handleSentMess = (value) => {
        MessageApi.postMess(queryParams.roomId, value)
    }
    const handleAddUser = () => {}

    return (
        <Box display="flex" flexDirection="column" sx={{ height: '100%' }}>
            {!location.search ? (
                <Box display="flex" justifyContent="center" alignItems="center" height={'100%'}>
                    <Typography color="primary" variant="h3"></Typography>
                </Box>
            ) : (
                <>
                    <Box sx={{ height: 64 }}>
                        <Box>
                            <RoomChatHeader roomInfo={roomInfo} handleClick={handleAddUser} />
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-end"
                        sx={{ height: 'calc(100% - 64px)' }}
                    >
                        <ChatPanel messList={messages} handleSentMess={handleSentMess} />
                    </Box>
                </>
            )}
        </Box>
    )
}

export default Chatting
