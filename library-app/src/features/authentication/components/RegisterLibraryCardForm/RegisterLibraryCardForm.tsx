import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/ReduxStore";

import { getLibraryCard } from "../../../../redux/slices/AuthenticationSlice";
import { setDisplayLibraryCard, setDisplayLogin } from "../../../../redux/slices/ModalSlice";

import { Typography, Button, Stack, Box } from "@mui/material";

export const RegisterLibraryCardForm: React.FC = () => {
    const userState = useSelector((state: RootState) => state.authentication);
    const dispatch: AppDispatch = useDispatch();

    const handleCreateLibraryCard = () => {
        if (userState.loggedInUser) {
            dispatch(getLibraryCard(userState.loggedInUser?._id));
        }
    };

    const handleLoginClick = () => {
        dispatch(setDisplayLibraryCard(false));
        dispatch(setDisplayLogin(true));
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
                    {
                        userState.loggedInUser ? (
                            <Stack spacing={2} alignItems="center" textAlign="center">
                                <Typography variant="h2" fontWeight={600}>
                                    Welcome {userState.loggedInUser.firstName} {userState.loggedInUser.lastName}!
                                </Typography>
                                <Typography variant="h6">
                                    To sign up for a new Library Card, or if you forgot your Card ID, use the button below.
                                </Typography>

                                {userState.libraryCard ? (
                                    <Typography variant="h5" color="primary">
                                        Your Library Card ID: {userState.libraryCard}
                                    </Typography>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleCreateLibraryCard}
                                        sx={{ borderRadius: 3, px: 4 }}
                                    >
                                        Get Library Card
                                    </Button>
                                )}
                            </Stack>
                        ) : (
                            <Stack spacing={2} alignItems="center" textAlign="center">
                                <Typography variant="h3" fontWeight={600}>
                                    You must be a member to obtain a Library Card
                                </Typography>
                                <Typography variant="h6">
                                    Use the button below to become a Member of Scriptoria.
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleLoginClick}
                                    sx={{ borderRadius: 3, px: 4 }}
                                >
                                    Login Here
                                </Button>
                            </Stack>
                        )
                    }
        </Box>
    );
};
