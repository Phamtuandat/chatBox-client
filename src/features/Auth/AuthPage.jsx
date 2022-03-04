import { Button, Container, Grid, Paper, Stack, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { register, signin } from './AuthSlice'
import GoogleLoginForm from './components/GoogleLoginForm'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 600,
    },
}))

function AuthPage(prop) {
    const history = useHistory()
    const dispatch = useDispatch()
    const classes = useStyles()
    const [authMode, setAuthMode] = useState(true)

    const { enqueueSnackbar } = useSnackbar()

    const onSubmit = async (value) => {
        try {
            if (authMode) {
                await dispatch(signin(value))
                    .unwrap()
                    .then(() => enqueueSnackbar('Login successfully!', { variant: 'success' }))
            }
            if (!authMode) {
                await dispatch(register(value))
                    .unwrap()
                    .then(() => enqueueSnackbar('Register successfully!', { variant: 'success' }))
            }
            history.push('chatPage')
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' })
        }
    }

    return (
        <Container>
            <Paper
                className={classes.root}
                sx={{ marginLeft: 'auto', marginRight: 'auto' }}
                elevation={2}
            >
                <Grid
                    container
                    rowSpacing={2}
                    sx={{ my: 16, textAlign: 'center', padding: '0 28px 0 28px' }}
                >
                    <Typography variant="h2">{authMode ? 'Login' : 'register'}</Typography>

                    {authMode ? (
                        <Grid item xs={12}>
                            <LoginForm onSubmit={onSubmit} />
                        </Grid>
                    ) : (
                        <Grid item xs={12}>
                            <RegisterForm onSubmit={onSubmit} />
                        </Grid>
                    )}
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            spacing={2}
                            sx={{ mb: 2 }}
                        >
                            <GoogleLoginForm />
                            {/* <GoogleLoginForm />
                            <GoogleLoginForm /> */}
                        </Stack>
                        <Button
                            onClick={() => setAuthMode(!authMode)}
                            color="primary"
                            variant="outlined"
                            fullWidth
                        >
                            {authMode
                                ? "If you don't have account, register now!"
                                : ' if you have aaccount, login here!'}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default AuthPage
