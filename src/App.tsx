import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router';
import {MainPage} from './pages/MainPage';
import {LoginPage} from './pages/LoginPage';
import {FavoritesPage} from './pages/FavoritesPage';
import {PropertyPage} from './pages/PropertyPage';
import {NotFound} from './components/NotFound';
import {ProtectedRoute} from './components/ProtectedRoute';
import {Offer} from './mocks/offers.ts';

type AppProps = {
  offers: Offer[];
}

const App: React.FC<AppProps> = ({offers}) => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage offers={offers}/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route element={
        <ProtectedRoute isAuthorized redirectPath={'/login'}/>
      }
      >
        <Route path="/favorites" element={<FavoritesPage offers={offers}/>}/>
      </Route>
      <Route path="/offer/:id" element={<PropertyPage/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  </BrowserRouter>
);

export default App;
