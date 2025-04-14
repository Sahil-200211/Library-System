import { useEffect, useState } from 'react';
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
import { AnimatePresence } from 'framer-motion';
import FloatingChatbot from './components/FloatingChatbot/FloatingChatbot';
import MouseTrail from './features/MouseTrail/MouseTrail';
import SplashScreen from './pages/SplashScreen/SplashScreen';

function App() {
  
  const [showSplash, setShowSplash] = useState(true);
  const loggedInUser = useSelector((state:RootState) => state.authentication.loggedInUser);
  const dispatch:AppDispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Duration matches SplashScreen timeout

    return () => clearTimeout(timer);
  }, []);

  useEffect(()=>{
    let userId = localStorage.getItem("userId");

    if(userId && !loggedInUser) {
      dispatch(fetchUser({
        userId,
        property: "loggedInUser"
      }));
    }

  }, [loggedInUser]);

  if (showSplash) return <SplashScreen />;

  return (
      <BrowserRouter>
      {/* <MouseTrail /> */}
      <AnimatePresence mode='wait'>
          <Routes>
            <Route path="/" element={<LayoutPage />}> 
              <Route path="" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/resource/:barcode" element={<ResourcePage />} />
              <Route path="/profile/:userId" element={<ProfilePage />} />
              <Route path='/create-book' element={<CreateBookForm />} />
            </Route>
          </Routes>
        </AnimatePresence>

        <FloatingChatbot />
      </BrowserRouter>
  )
}

export default App
