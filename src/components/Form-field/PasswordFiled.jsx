import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useController } from 'react-hook-form'

function PasswordFiled({ label, name, control, disabled }) {
    const [value, setValue] = useState(false)
    const handleClickShowPassword = () => {
        setValue(!value)
    }
    const {
        field: { onChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        control,
        name,
    })
    return (
        <div>
            <TextField
                variant="outlined"
                type={value ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                edge="end"
                                onClick={handleClickShowPassword}
                            >
                                {value ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                label={label}
                fullWidth
                sx={{ my: 1 }}
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

PasswordFiled.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    container: PropTypes.object,
}

export default PasswordFiled
