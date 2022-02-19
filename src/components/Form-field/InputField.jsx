import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@mui/material'
import { useController } from 'react-hook-form'

export const InputField = ({ control, label, name, type, disabled }) => {
    const {
        field: { onChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    })
    return (
        <div>
            <TextField
                label={label}
                variant="outlined"
                fullWidth
                sx={{ my: 1 }}
                size="medium"
                type={type}
                onChange={onChange}
                onBlur={onBlur}
                inputRef={ref}
                error={invalid}
                helperText={error?.message}
                disabled={disabled}
            />
        </div>
    )
}

InputField.propTypes = {
    control: PropTypes.object,
    name: PropTypes.string,
    label: PropTypes.string,
}
