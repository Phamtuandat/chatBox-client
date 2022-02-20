import { Avatar, Box, IconButton, Paper, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import dateConvert from '../../../utils/ConvertDate'

function Message({ message }) {
    const user = useSelector((state) => state.Auth.current.user)

    return (
        <div>
            <Box
                display="flex"
                sx={{
                    pt: { xs: 0.5, md: 1 },
                }}
                flexDirection={user.id === message.postedByUser._id ? 'row-reverse' : null}
            >
                <IconButton size="small" edge="start" color="inherit">
                    <Avatar alt={message.postedByUser.name} src={message.postedByUser.image} />
                </IconButton>

                <Box>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: { xs: '5px', md: '10px' },
                            mx: 1,
                            maxWidth: 680,
                            backgroundColor:
                                user.id === message.postedByUser._id ? '#0674E7' : null,
                            color: user.id === message.postedByUser._id ? 'white' : null,
                            borderRadius: 14,
                            px: 3,
                        }}
                    >
                        <Box sx={{ alignSelf: 'center', marginLeft: 1 }}>
                            <Box display="flex">
                                <Typography
                                    variant="content"
                                    component="div"
                                    sx={{
                                        alignSelf: 'center',
                                        fontWeight: '400',
                                        fontStyle: 'italic',
                                        fontSize: { xs: '10px', md: '14px' },
                                        opacity: 0.8,
                                        marginBottom: '4px',
                                    }}
                                >
                                    {message.postedByUser.name}
                                </Typography>
                            </Box>
                            <Typography
                                variant="inherit"
                                component="div"
                                textAlign={user.id === message.postedByUser._id ? 'right' : null}
                                sx={{ mx: 2 }}
                            >
                                {message.message}
                            </Typography>
                        </Box>
                    </Paper>
                    <Typography
                        variant="subtitle2"
                        component="div"
                        sx={{
                            fontStyle: 'italic',
                            alignSelf: 'center',
                            opacity: '0.6',
                            mx: 5,
                        }}
                        textAlign={user.id === message.postedByUser._id ? 'right' : null}
                    >
                        {dateConvert(message.createdAt)}
                    </Typography>
                </Box>
            </Box>
        </div>
    )
}

export default Message
