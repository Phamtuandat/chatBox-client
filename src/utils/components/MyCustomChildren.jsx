import CloseIcon from '@mui/icons-material/Close'
import { Card, CardActions, IconButton, Typography } from '@mui/material'
import { SnackbarContent, useSnackbar } from 'notistack'
import { useCallback } from 'react'

export function MyCustomChildren({ message, id }) {
    const { closeSnackbar } = useSnackbar()

    const handleDismiss = useCallback(() => {
        closeSnackbar(id)
    }, [id, closeSnackbar])
    return (
        <SnackbarContent>
            <Card>
                <CardActions>
                    <Typography variant="subtitle2">{message}</Typography>
                    <div>
                        <IconButton onClick={handleDismiss}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </CardActions>
            </Card>
        </SnackbarContent>
    )
}
