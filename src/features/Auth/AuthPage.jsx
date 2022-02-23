import { Button, Container, Grid, Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { register, signin } from './AuthSlice'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 600,
    },
}))

function AuthPage(prop) {
    const dispatch = useDispatch()

    const classes = useStyles()
    const [authMode, setAuthMode] = useState(true)
    const mounted = useRef(false)

    useEffect(() => {
        mounted.current = true

        return () => {
            mounted.current = false
        }
    }, [])
    const onSubmit = async (value) => {
        try {
            if (authMode) {
                await dispatch(signin(value)).unwrap()
            }
            if (!authMode) {
                await dispatch(register(value)).unwrap()
            }
        } catch (error) {
            console.log(error.response)
        }
    }
    const history = useHistory()
    const isLogged = !!useSelector((state) => state.Auth.current?.user)
    useEffect(() => {
        if (isLogged) {
            history.replace('/chatPage')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogged])
    console.log(isLogged)

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
                    <Grid item xs={12} sx={{ my: 2 }}>
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
