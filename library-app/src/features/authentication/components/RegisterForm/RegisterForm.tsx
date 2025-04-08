import React , {useEffect, useRef, useState} from 'react';

import './RegisterForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/ReduxStore';
import { registerUser, resetRegisterSuccess } from '../../../../redux/slices/AuthenticationSlice';


interface RegisterFormProps {
    toggleLogin():void;
}

const EMPLOYEE_PASSWORD = "ihavereadallsecrets";

export const RegisterForm:React.FC<RegisterFormProps> = ({toggleLogin}) => {

    const authState = useSelector((state:RootState) => state.authentication);
    const dispatch:AppDispatch = useDispatch();

    const firstRef = useRef<HTMLInputElement>(null);
    const lastRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const employeePasswordRef = useRef<HTMLInputElement>(null);

    const [selectedRole, setSelectedRole] = useState<string>("PATRON");
    const [showEmployeePasswordField, setShowEmployeePasswordField] = useState<boolean>(false);
    const [employeePasswordError, setEmployeePasswordError] = useState<string>("");

    const handleRegisterUser = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(
            firstRef && firstRef.current &&
            lastRef && lastRef.current &&
            emailRef && emailRef.current &&
            passwordRef && passwordRef.current
        ) {
            if (selectedRole === "EMPLOYEE") {
                if (employeePasswordRef && employeePasswordRef.current && employeePasswordRef.current.value !== EMPLOYEE_PASSWORD) {
                    setEmployeePasswordError("Incorrect employee password.");
                    return; // Stop registration if password is wrong
                } else {
                    setEmployeePasswordError(""); // Clear any previous error
                }
            }
            dispatch(
                registerUser({
                    type:selectedRole,
                    firstName: firstRef.current.value,
                    lastName: lastRef.current.value,
                    email: emailRef.current.value,
                    password: passwordRef.current.value
                })
            );
        }
    }

    useEffect(() => {
        setShowEmployeePasswordField(selectedRole === "EMPLOYEE");
    }, [selectedRole]);

    useEffect(() => {
        return(() => {
            dispatch(resetRegisterSuccess());
        });
    }, [])

    return (
        <form className="register-form">
            <h2>Enter your Information</h2>
            {authState.error ? <p className="register-form-error">There was an Error</p> : <></>}
            <div className="register-form-name-group">
                <div className="register-form-name-input-group">
                    <h6>First Name</h6>
                    <input className="register-form-input-name" placeholder="First name" name="first" required ref={firstRef} />
                </div>
                <div className="register-form-name-input-group">
                    <h6>Last Name</h6>
                    <input className="register-form-input-name" placeholder="Last name" name="last" required ref={lastRef} />
                </div>
            </div>
            <div className="register-form-input-group">
                <h6>Email</h6>
                <input className="register-form-input" placeholder="Email" name="email" required ref={emailRef} />
            </div>
            <div className="register-form-input-group">
                <h6>Password</h6>
                <input className="register-form-input" placeholder="Password" name="password" type="password" required ref={passwordRef} />
            </div>
            {showEmployeePasswordField && (
                <div className="register-form-input-group">
                    <h6>Employee Password</h6>
                    <input
                        className="register-form-input"
                        placeholder="Enter Employee Password"
                        name="employeePassword"
                        type="password"
                        required
                        ref={employeePasswordRef}
                    />
                    {employeePasswordError && (
                        <p className="register-form-error">{employeePasswordError}</p>
                    )}
                </div>
            )}
            <div className="register-form-input-group">
            <h6>Role</h6>
                <select
                    className="register-form-select"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                >
                    <option value="ADMIN">Admin</option>
                    <option value="EMPLOYEE">Employee</option>
                    <option value="PATRON">Patron</option>
                </select>
            </div>
            <button className="register-form-submit" onClick={handleRegisterUser}>Register</button>
            {authState.registerSuccess ? 
                <p>Registered Successfully.
                        <span className="register-form-login" onClick={toggleLogin}>Login here</span>
                </p> : <></>
            }
        </form>
    )
}