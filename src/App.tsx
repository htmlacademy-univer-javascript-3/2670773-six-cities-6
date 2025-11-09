import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router';
import {MainPage} from './pages/MainPage';
import {LoginPage} from './pages/LoginPage';
import {FavoritesPage} from './pages/FavoritesPage';
import {PropertyPage} from './pages/PropertyPage';
import {NotFound} from './components/NotFound';
import {ProtectedRoute} from './components/ProtectedRoute';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route
        element={<ProtectedRoute isAuthorized redirectPath={'/login'}/>}
      >
        <Route path="/favorites" element={<FavoritesPage/>}/>
      </Route>
      <Route path="/offer/:id" element={<PropertyPage/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  </BrowserRouter>
);

export default App;
