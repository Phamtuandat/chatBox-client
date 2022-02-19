import { Box, Button } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from '../../../components/Form-field/InputField'

function AddModal({ mode = 'room', onSubmit = null, loading }) {
    const { control, handleSubmit, register, reset } = useForm()
    const handleFormSubmit = (value) => {
        onSubmit(value)
        reset()
    }
    return (
        <Box>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField
                    control={control}
                    type="text"
                    {...register}
                    name="name"
                    label="Room Name"
                />
                <Button variant="contained" color="primary" type="submit" disabled={loading}>
                    ADD
                </Button>
            </form>
        </Box>
    )
}

AddModal.propTypes = {
    mode: PropTypes.string,
    onSubmit: PropTypes.func,
    loading: PropTypes.bool,
}

export default AddModal
