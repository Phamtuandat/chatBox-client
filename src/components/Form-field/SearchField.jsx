import { SearchOutlined } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { useEffect } from 'react'
import { useController } from 'react-hook-form'

function SearchField({ label, name, control, disabled, handleSearchChange }) {
    const {
        field: { ref, onBlur, value, onChange },
        fieldState: { invalid, error },
    } = useController({
        control,
        name,
    })
    useEffect(() => {
        if (!value) return
        handleSearchChange(value)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])
    return (
        <div>
            <TextField
                size="small"
                fullWidth
                variant="outlined"
                onBlur={onBlur}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton edge="end" type="submit">
                                <SearchOutlined />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                label={label}
                sx={{ my: 1 }}
                onChange={onChange}
                inputRef={ref}
                error={invalid}
                helperText={error?.message}
                disabled={disabled}
            />
        </div>
    )
}

SearchField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    container: PropTypes.object,
}

export default SearchField
