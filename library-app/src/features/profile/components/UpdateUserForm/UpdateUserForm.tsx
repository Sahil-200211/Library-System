import './UpdateUserForm.css';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../../redux/ReduxStore';
import { User } from '../../../../models/User';
import { Create } from '@mui/icons-material';
import { resetUser, updateUser } from '../../../../redux/slices/AuthenticationSlice';

import { TextField, Button, Snackbar, Alert, Box } from '@mui/material';

export const UpdateUserForm: React.FC = () => {
  const userState = useSelector((state: RootState) => state.authentication);
  const dispatch: AppDispatch = useDispatch();

  const [displayUpdate, setDisplayUpdate] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const updateUserState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayUpdate(true);
    if (e.target.value && e.target.name && user) {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };

  const submitUpdatedUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (user) {
      dispatch(updateUser(user));
      setDisplayUpdate(false);
      setSnackbarOpen(true); // show snackbar
    }
  };

  const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem('userId');
    dispatch(resetUser('loggedInUser'));
    dispatch(resetUser('profileUser'));
    navigate('/');
  };

  useEffect(() => {
    if (userState.profileUser) {
      setUser(JSON.parse(JSON.stringify(userState.profileUser)));
    }
  }, [userState.profileUser?._id]);

  return (
    <>
      <form className="update-user-form">
        {['firstName', 'lastName', 'email'].map((field) => (
          <Box key={field} width="100%" mb={2} position="relative">
            <TextField
              fullWidth
              variant="outlined"
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={(user as any)?.[field] || ''}
              onChange={updateUserState}
              disabled={userState.loggedInUser?._id !== userState.profileUser?._id}
            />
            {userState.loggedInUser?._id === userState.profileUser?._id && (
              <Create
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: '8px',
                  transform: 'translateY(-50%)',
                  color: 'gray',
                }}
              />
            )}
          </Box>
        ))}

        {displayUpdate && (
          <Button
            variant="contained"
            fullWidth
            onClick={submitUpdatedUser}
            sx={{ mt: 2, borderRadius: '12px' }}
          >
            Update Profile
          </Button>
        )}

        {userState.loggedInUser?._id === userState.profileUser?._id && (
          <Button
            variant="outlined"
            fullWidth
            onClick={logout}
            sx={{ mt: 2, borderRadius: '12px' }}
          >
            Logout of Account
          </Button>
        )}
      </form>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Profile Updated Successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

