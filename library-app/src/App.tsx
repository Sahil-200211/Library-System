import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from './redux/ReduxStore';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutPage from './pages/LayoutPage/LayoutPage';
import { fetchUser } from './redux/slices/AuthenticationSlice';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import ResourcePage from './pages/ResourcePage/ResourcePage';
import CreateBookForm from './pages/BookForm/BookForm';

function App() {
  
  const loggedInUser = useSelector((state:RootState) => state.authentication.loggedInUser);
  const dispatch:AppDispatch = useDispatch();

  useEffect(()=>{
    let userId = localStorage.getItem("userId");

    if(userId && !loggedInUser) {
      dispatch(fetchUser({
        userId,
        property: "loggedInUser"
      }));
    }

  }, [loggedInUser]) 

  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<LayoutPage />}>
        <Route path="" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/resource/:barcode" element={<ResourcePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path='/create-book' element={<CreateBookForm />} />
      </Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
