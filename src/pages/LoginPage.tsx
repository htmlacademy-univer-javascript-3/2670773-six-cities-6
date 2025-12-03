import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../store/authThunk';
import type {AppDispatch, RootState} from '../store';
import {Navigate, useNavigate} from 'react-router';
import {AuthorizationStatus} from '../store/authSlice';
import axios from 'axios';

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authorizationStatus = useSelector((state: RootState) => state.auth.authorizationStatus);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await dispatch(login({email, password})).unwrap();
      navigate('/');
    } catch (err: unknown) {
      setError(axios.isAxiosError(err) ? err.message : 'Unknown error');
    }
  };

  if (authorizationStatus === AuthorizationStatus.Authorized) {
    return <Navigate to={'/'} replace/>;
  }

  return (
    <div className="page page--gray page--login">
      <main className="page__main page__main--login">
        <div className="container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              onSubmit={(event) => {
                handleSubmit(event);
              }}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="login__error">{error}</div>}
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};
