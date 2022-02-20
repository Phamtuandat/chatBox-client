import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { CircularProgress } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { InputField } from '../../../components/Form-field/InputField'
import PasswordFiled from '../../../components/Form-field/PasswordFiled'

const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required('Password is required'),
})
function LoginForm({ onSubmit }) {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const handleFormSubmit = async (value) => {
        await onSubmit(value)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField name="email" label="Email" control={control} />
                <PasswordFiled name="password" label="Password" control={control} />

                <LoadingButton
                    color="primary"
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ my: 1 }}
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    loadingIndicator={<CircularProgress color="inherit" size={16} />}
                >
                    Login
                </LoadingButton>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
}

export default LoginForm
