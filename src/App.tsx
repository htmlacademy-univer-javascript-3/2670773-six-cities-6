import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router';
import {useDispatch} from 'react-redux';
import {MainPage} from './pages/MainPage';
import {LoginPage} from './pages/LoginPage';
import {FavoritesPage} from './pages/FavoritesPage';
import {OfferPage} from './pages/OfferPage.tsx';
import {NotFound} from './components/NotFound';
import {ProtectedRoute} from './components/ProtectedRoute';
import {fetchOffers} from './store/offerThunks.ts';
import type {AppDispatch} from './store';
import {checkAuth} from './store/authThunk.ts';
import {Header} from './components/Header.tsx';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchOffers());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route
          element={<ProtectedRoute redirectPath={'/login'}/>}
        >
          <Route path="/favorites" element={<FavoritesPage/>}/>
        </Route>
        <Route path="/offer/:id" element={<OfferPage/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
