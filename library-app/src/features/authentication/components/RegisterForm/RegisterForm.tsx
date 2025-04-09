import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/ReduxStore';
import { registerUser, resetRegisterSuccess } from '../../../../redux/slices/AuthenticationSlice';
import { TextField, Select, MenuItem, Button, Snackbar, Alert, Typography, FormControl, InputLabel } from '@mui/material';

interface RegisterFormProps {
  toggleLogin(): void;
}

const EMPLOYEE_PASSWORD = "ihavereadallsecrets";

export const RegisterForm: React.FC<RegisterFormProps> = ({ toggleLogin }) => {
  const authState = useSelector((state: RootState) => state.authentication);
  const dispatch: AppDispatch = useDispatch();

  const firstRef = useRef<HTMLInputElement>(null);
  const lastRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const employeePasswordRef = useRef<HTMLInputElement>(null);

  const [selectedRole, setSelectedRole] = useState<string>("PATRON");
  const [showEmployeePasswordField, setShowEmployeePasswordField] = useState<boolean>(false);
  const [employeePasswordError, setEmployeePasswordError] = useState<string>("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleRegisterUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      firstRef.current &&
      lastRef.current &&
      emailRef.current &&
      passwordRef.current
    ) {
      if (selectedRole === "EMPLOYEE") {
        if (
          employeePasswordRef.current &&
          employeePasswordRef.current.value !== EMPLOYEE_PASSWORD
        ) {
          setEmployeePasswordError("Incorrect employee password.");
          return;
        } else {
          setEmployeePasswordError("");
        }
      }

      dispatch(
        registerUser({
          type: selectedRole,
          firstName: firstRef.current.value,
          lastName: lastRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      );
    }
  };

  useEffect(() => {
    setShowEmployeePasswordField(selectedRole === "EMPLOYEE");
  }, [selectedRole]);

  useEffect(() => {
    if (authState.error) {
      setSnackbarMessage("There was an Error");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } else if (authState.registerSuccess) {
      setSnackbarMessage("Registered Successfully!");
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
  }, [authState]);

  useEffect(() => {
    return () => {
      dispatch(resetRegisterSuccess());
    };
  }, []);

  return (
    <form className="register-form">
      <Typography variant="h5" gutterBottom>
        Enter your Information
      </Typography>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <TextField label="First Name" inputRef={firstRef} fullWidth required />
        <TextField label="Last Name" inputRef={lastRef} fullWidth required />
      </div>

      <TextField label="Email" inputRef={emailRef} fullWidth required sx={{ mt: 2 }} />
      <TextField label="Password" type="password" inputRef={passwordRef} fullWidth required sx={{ mt: 2 }} />

      {showEmployeePasswordField && (
        <TextField
          label="Employee Password"
          type="password"
          inputRef={employeePasswordRef}
          error={!!employeePasswordError}
          helperText={employeePasswordError}
          fullWidth
          sx={{ mt: 2 }}
        />
      )}

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Role</InputLabel>
        <Select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} label="Role">
          <MenuItem value="ADMIN">Admin</MenuItem>
          <MenuItem value="EMPLOYEE">Employee</MenuItem>
          <MenuItem value="PATRON">Patron</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        fullWidth
        onClick={handleRegisterUser}
        sx={{ mt: 3, textTransform: 'none' }}
      >
        Register
      </Button>

      {authState.registerSuccess && (
        <Typography sx={{ mt: 2 }}>
          Registered Successfully.{' '}
          <span
            style={{ color: '#1976d2', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={toggleLogin}
          >
            Login here
          </span>
        </Typography>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};
