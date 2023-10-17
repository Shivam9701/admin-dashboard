/* eslint-disable react/prop-types */
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownCircleOutlined } from '@mui/icons-material'
import FlexBetween from './FlexBetween'
import { setMode } from '../state'
import { useDispatch } from 'react-redux'
import pfp from '../assets/pfp.jpg'
import { AppBar, Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, useTheme } from '@mui/material'
import { useState } from 'react'

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, user }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar sx={{ position: 'static', background: 'none', boxShadow: 'none' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>

                {/* Left Side */}

                <FlexBetween>

                    <IconButton onClick={() => { setIsSidebarOpen(!isSidebarOpen) }}>
                        <MenuIcon />
                    </IconButton>

                    <FlexBetween backgroundColor={theme.palette.background.alt} borderRadius="9px"
                        gap="3rem"
                        p="0.1rem 1.5rem"
                    >
                        <InputBase placeholder='Search...' />
                        <Search />
                    </FlexBetween>


                </FlexBetween>

                {/* Right Side */}

                <FlexBetween>

                    <IconButton onClick={() => { dispatch(setMode()) }}>
                        {theme.palette.mode === 'dark' ? <LightModeOutlined sx={{ fontSize: "25px" }} /> : <DarkModeOutlined sx={{ fontSize: "25px" }} />}
                    </IconButton>

                    <IconButton>
                        <SettingsOutlined sx={{ fontSize: "25px" }} />
                    </IconButton>

                    <FlexBetween>

                        <Button onClick={handleClick} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", textTransform: "none", gap: "1rem" }}>

                            <Box component="img" alt="profile" src={pfp} width="32px" height="32px" borderRadius="50%"
                                sx={{ objectFit: "cover" }} />

                            <Box textAlign="left">

                                <Typography fontSize="0.85rem" fontWeight="bold"
                                    sx={{ color: theme.palette.secondary[100] }}>
                                    {user.name}
                                </Typography>

                                <Typography fontSize="0.75rem" fontWeight="bold"
                                    sx={{ color: theme.palette.secondary[100] }}>
                                    {user.occupation}
                                </Typography>

                            </Box>
                            <ArrowDropDownCircleOutlined sx={{ color: theme.palette.secondary[300], fontSize: '25px' }} />


                        </Button>

                        <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                            <MenuItem onClick={handleClose}>Log Out</MenuItem>
                        </Menu>

                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar