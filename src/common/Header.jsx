import MenuIcon from '@mui/icons-material/Menu'
import {
    AppBar,
    Avatar,
    Container,
    IconButton,
    Link,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'

const pages = [
    {
        path: '/auth',
        label: 'Login',
        isVisible: (isLogged) => !isLogged,
        isDuplicate: (isCurrent) => !isCurrent,
    },
    {
        path: '/chatPage',
        label: 'Chat app',
        isVisible: (isLogged) => isLogged,
        isDuplicate: (isCurrent) => !isCurrent,
    },
]
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const Header = () => {
    const isLogged = !!useSelector((state) => state.Auth.current?.token)
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const history = useHistory()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages
                                .filter(
                                    (x) =>
                                        x.isVisible(isLogged) &&
                                        x.isDuplicate(history.location === x.path)
                                )
                                .map((page) => (
                                    <Link
                                        key={page.path}
                                        component={NavLink}
                                        to={`${page.path}`}
                                        textAlign="center"
                                    >
                                        <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                                            {page.label}
                                        </MenuItem>
                                    </Link>
                                ))}
                        </Menu>
                    </Box>
                    <Link component={NavLink} sx={{ flexGrow: 1 }} to="/">
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, color: 'white' }}
                        >
                            MY APP
                        </Typography>
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages
                            .filter(
                                (x) =>
                                    x.isVisible(isLogged) &&
                                    x.isDuplicate(history.location === x.path)
                            )
                            .map((page) => (
                                <Link component={NavLink} to={`${page.path}`} key={page.path}>
                                    <MenuItem
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                        key={page.label}
                                    >
                                        {page.label}
                                    </MenuItem>
                                </Link>
                            ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default Header
