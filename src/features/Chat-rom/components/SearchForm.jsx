import { AddCircleOutlineTwoTone } from '@mui/icons-material'
import { IconButton, Modal, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import SearchField from '../../../components/Form-field/SearchField'
import { roomInfoSelector } from '../ChatRoomSlice'
import { filterSelector, loadingSelector, userActions } from '../userSlice'
import SearchResult from './SearchResult'

function SearchForm() {
    const dispatch = useDispatch()

    const [isDisplay, setIsDisplay] = useState(false)
    const loading = useSelector(loadingSelector)
    const filter = useSelector(filterSelector)
    const roomInfo = useSelector(roomInfoSelector)

    const handleSearchChange = (value) => {
        if (!value) return
        dispatch(userActions.fetchUserWithDebounce({ ...filter, name_like: value }))
    }
    useEffect(() => {
        let isCancel = false
        if (!isCancel) {
            dispatch(userActions.fetchUser(filter))
        }

        return () => (isCancel = true)
    }, [dispatch, filter])
    const { handleSubmit, control, reset } = useForm()

    const handleSearch = (value) => {}
    const handleAddUser = (value) => {
        const ind = roomInfo.users.findIndex((user) => user._id === value)

        if (ind !== -1) return

        dispatch(
            userActions.addUser({
                params: {
                    userList: [value],
                    id: roomInfo._id,
                },
                roomId: roomInfo._id,
            })
        )
    }
    return (
        <Box>
            <IconButton onClick={() => setIsDisplay(true)}>
                <AddCircleOutlineTwoTone />
            </IconButton>
            <Modal
                open={isDisplay}
                onClose={() => {
                    setIsDisplay(false)
                    dispatch(userActions.clearResult())
                    reset()
                }}
            >
                <Paper
                    sx={{
                        width: '60%',
                        padding: 1,
                        position: 'absolute',
                        top: '30%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <Typography textAlign="center" variant="h4" sx={{ my: 1 }} color="primary">
                        FIND USER
                    </Typography>
                    <form onSubmit={handleSubmit(handleSearch)} onClick={() => setIsDisplay(true)}>
                        <SearchField
                            control={control}
                            label="Search"
                            name="name"
                            handleSearchChange={handleSearchChange}
                        />
                    </form>
                    <Box
                        sx={{
                            height: 200,
                            overflowY: 'auto',
                        }}
                    >
                        <SearchResult handleAdd={handleAddUser} loading={loading} />
                    </Box>
                </Paper>
            </Modal>
        </Box>
    )
}

export default SearchForm
