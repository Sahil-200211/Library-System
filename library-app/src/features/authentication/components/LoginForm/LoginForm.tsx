import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/ReduxStore';
import { loginUser } from '../../../../redux/slices/AuthenticationSlice';

import { Snackbar, TextField, Button, Typography } from '@mui/material';

interface LoginFormProps {
    toggleRegister(): void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ toggleRegister }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState<React.ReactNode>(null);
    const [attemptedLogin, setAttemptedLogin] = useState(false);

    const auth = useSelector((state: RootState) => state.authentication);
    const dispatch: AppDispatch = useDispatch();

    const handleLoginUser = (e: React.FormEvent) => {
        e.preventDefault();
        setAttemptedLogin(true);
        dispatch(loginUser({ email, password }));
    }

    useEffect(() => {
        if(attemptedLogin) {
            if (auth.error) {
                setSnackbarOpen(true);
                setSnackbarMessage("Invalid Credentials! ❌");
            }
            if (auth.loggedInUser) {
                setSnackbarOpen(true);
                setSnackbarMessage("Welcome Back " + auth.loggedInUser.firstName + "! " + "🥳🥳");
            }
        }
    }, [auth.error, auth.loggedInUser]);

    return (
        <>
            <form className='login form' onSubmit={handleLoginUser}>
                <Typography variant="h3" mb={2}>Please Login</Typography>

                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />

                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    Login
                </Button>

                <Typography variant="body2" mt={2}>
                    Don't have an Account?{' '}
                    <span className="login-form-register" onClick={toggleRegister} style={{ cursor: 'pointer', color: '#1976d2' }}>
                        Create one HERE!
                    </span>
                </Typography>
            </form>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                message={snackbarMessage}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </>
    )
}
