import { Box } from '@mui/system'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import ChatForm from './ChatForm'
import Message from './Message'

function ChatPanel({ handleSentMess = null, messList = [] }) {
    const scrollRef = useRef()
    const user = useSelector((state) => state.Auth.current.user)
    const handleSubmitForm = (value) => {
        handleSentMess(value)
    }
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messList.length])

    return (
        <Box display="flex" flexDirection="column" sx={{ height: 'calc(100vh - 64px)' }}>
            <Box
                sx={{
                    overflowY: 'auto',
                    display: 'flex',
                    flex: '1',
                    flexDirection: 'column',
                }}
            >
                {messList.map((message) => (
                    <Box
                        alignItems={user.id === message.postedByUser._id ? 'flex-end' : null}
                        ref={scrollRef}
                        key={message._id}
                    >
                        <Message message={message} />
                    </Box>
                ))}
            </Box>
            <Box sx={{ my: 1, height: 40 }}>
                <ChatForm onSubmit={handleSubmitForm} />
            </Box>
        </Box>
    )
}

export default ChatPanel
