import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Navbar.css';
import { AppDispatch, RootState } from '../../../../redux/ReduxStore';
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayLogin } from '../../../../redux/slices/ModalSlice';

import { Search } from '@mui/icons-material';
import { Box, Button, IconButton, InputBase, Paper, Typography } from '@mui/material';



export const Navbar: React.FC = () => {

    const searchRef = useRef<HTMLInputElement>(null);
    const authState = useSelector((state: RootState) => state.authentication);

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchRef.current?.value.trim()) {
            e.preventDefault();
            navigate(`/catalog?barcode=${searchRef.current.value}&title=${searchRef.current.value}&description=${searchRef.current.value}&subject=${searchRef.current.value}`);
            searchRef.current.value = '';
        }
    }

    const handleSearchonClicked = () => {
        if (searchRef.current?.value.trim()) {
            navigate(`/catalog?barcode=${searchRef.current.value}&title=${searchRef.current.value}&description=${searchRef.current.value}&subject=${searchRef.current.value}`);
            searchRef.current.value = '';
        }
    }

    const navigateToProfile = () => {
        if (authState.loggedInUser) navigate(`/profile/${authState.loggedInUser._id}`);
    }

    const toggleLogin = () => {
        dispatch(setDisplayLogin(true));
    }

    return (
    <nav className="navbar">
            <Link to="/" className="navbar-logo-section">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="black"
                    className="animated-stroke logo-icon"
                    style={{ width: "3rem", height: "3rem" }}
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                    />
                </svg>
                <Typography variant="h4" sx={{ marginLeft: "8px", fontWeight: "bold" }}>Scriptoria</Typography>
            </Link>

        <Box className="navbar-option-section">
            <Link to="/catalog" className="navbar-option navbar-link">
                <Typography variant="h6" className="navbar-font" sx={{
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.1)',
                            color: 'white',
                        },
                        }}>View Catalog
                </Typography>
            </Link>

            <Paper
                component="form"
                className="navbar-search-box"
                elevation={3}
                sx={{ borderRadius: "35px", display: 'flex', alignItems: 'center', padding: "2px 8px" }}
            >
                <InputBase
                    className="navbar-search-input"
                    placeholder="Search Catalog"
                    inputRef={searchRef}
                    onKeyDown={handleEnterKey}
                    sx={{ ml: 1, flex: 1, color: "inherit" }}
                />
                <IconButton onClick={handleSearchonClicked}>
                    <Search />
                </IconButton>
            </Paper>
            {
                    authState.loggedInUser?.type === "EMPLOYEE" && (
                        <Button 
                            variant="contained" 
                            color="success" 
                            onClick={() => navigate('/create-book')}
                            sx={{ 
                                marginRight: "10px", 
                                textTransform: "none", 
                                fontSize: "18px", 
                                borderRadius: "10px",
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': { transform: 'scale(1.05)'},
                            }}
                        >
                            Book Creation
                        </Button>
                    )
                }


            {
                authState.loggedInUser ?
                    <Button variant="contained" color="inherit" onClick={navigateToProfile} sx={{ marginRight: "10px", textTransform: "none", fontSize: "18px", borderRadius: "10px", transition: 'all 0.3s ease-in-out', '&:hover' : {transform: 'scale(1.05)'}, }}>
                        {authState.loggedInUser.firstName}'s Account
                    </Button>
                    :
                    <Button variant="contained" color="warning" onClick={toggleLogin} sx={{ marginRight: "10px", textTransform: "none", fontSize: "18px", borderRadius: "10px" }}>
                        Login
                    </Button>
            }
        </Box>
    </nav>
    )
}
