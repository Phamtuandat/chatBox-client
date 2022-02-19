import React from 'react'
import PropTypes from 'prop-types'
import { InputField } from '../../../components/Form-field/InputField'
import { Button } from '@mui/material'
import PasswordFiled from '../../../components/Form-field/PasswordFiled'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup
        .string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    confirmPassword: yup
        .string()
        .required('No confirm password provided.')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
})
function RegisterForm({ onSubmit }) {
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
                <InputField
                    name="email"
                    label="Email"
                    type="email"
                    control={control}
                    disabled={isSubmitting}
                />
                <InputField
                    name="name"
                    label="Full Name"
                    type="text"
                    control={control}
                    disabled={isSubmitting}
                />
                <PasswordFiled
                    name="password"
                    label="Password"
                    control={control}
                    disabled={isSubmitting}
                />
                <PasswordFiled
                    name="confirmPassword"
                    label="Confirm Password"
                    control={control}
                    disabled={isSubmitting}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ mt: 1 }}
                    disabled={isSubmitting}
                >
                    Register
                </Button>
            </form>
        </div>
    )
}

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
}

export default RegisterForm
