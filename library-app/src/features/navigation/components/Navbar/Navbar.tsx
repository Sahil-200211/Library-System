import React, {useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import './Navbar.css';
import { AppDispatch, RootState } from '../../../../redux/ReduxStore';
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayLogin } from '../../../../redux/slices/ModalSlice';
import { LocalLibrary, Search } from '@mui/icons-material';

export const Navbar:React.FC = () => {

    const searchRef = useRef<HTMLInputElement>(null);
    const authState = useSelector((state:RootState) => state.authentication);

    const navigate = useNavigate();

    const dispatch:AppDispatch = useDispatch();

    const handleEnterKey = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' && searchRef && searchRef.current && searchRef.current.value.length > 0){
            navigate(`/catalog?barcode=${searchRef.current.value}&title=${searchRef.current.value}&description=${searchRef.current.value}`);
            searchRef.current.value = '';
        }
    }

    const handleSearchonClicked = () => {
        if(searchRef && searchRef.current && searchRef.current.value.length > 0){
            navigate(`/catalog?barcode=${searchRef.current.value}&title=${searchRef.current.value}&description=${searchRef.current.value}`);
            searchRef.current.value = '';
        }
    }

    const navigateToProfile = () => {
        if(authState.loggedInUser) navigate(`/profile/${authState.loggedInUser._id}`);
    }

    const toggleLogin = () => {
        dispatch(setDisplayLogin(true));
    }

    return(
        <nav className="navbar">
            <Link to="/" className="navbar-logo-section">
                <LocalLibrary sx={{
                    fontSize: "3rem"
                }} />
                <h1>Scriptoria</h1>
            </Link>
            <div className="navbar-option-section">
                <Link to="/catalog" className="navbar-option navbar-link">
                    <h2 className='navbar-font'>View Catalog</h2>
                </Link>
                <div className="navbar-search-box">
                    <input className="navbar-search-input" placeholder="Search Catalog" onKeyDown={handleEnterKey} ref={searchRef} />
                    <Search onClick={handleSearchonClicked}
                        sx={{
                            cursor: "pointer",
                            fontSize: "2rem"
                        }} 
                    />
                </div>
                {
                    authState.loggedInUser ?
                        <div className="navbar-option" onClick={navigateToProfile}>
                            <h2 className="navbar-font">{authState.loggedInUser.firstName}'s Account</h2>
                        </div>
                        :
                        <div className="navbar-option" onClick={toggleLogin}>
                            <h2 className="navbar-font">Login</h2>
                        </div>
                }
            </div>
        </nav>
    )
}