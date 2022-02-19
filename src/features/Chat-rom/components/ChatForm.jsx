import { IconButton, InputAdornment, TextField } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import SendIcon from '@mui/icons-material/Send'

function ChatForm({ onSubmit = null }) {
    const { handleSubmit, register, reset } = useForm()
    const handleFormSubmit = (value) => {
        onSubmit(value)
        reset()
    }
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <TextField
                fullWidth
                size="small"
                variant="outlined"
                {...register('message')}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton edge="end" type="submit">
                                <SendIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </form>
    )
}

ChatForm.propTypes = {
    onSubmit: PropTypes.func,
}

export default ChatForm
