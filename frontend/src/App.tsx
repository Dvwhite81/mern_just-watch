import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { AuthResult, MovieResult, SeriesResult, UserType } from './utils/types';
import userService from './services/userService';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import './App.css';
import ProfilePage from './pages/ProfilePage';
import ResultPage from './pages/ResultPage';

function App() {
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);
  const [userMovies, setUserMovies] = useState<MovieResult[]>([]);
  const [userSeries, setUserSeries] = useState<SeriesResult[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const checkedLoggedIn = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        const result = await userService.getUserByToken(token);
        if (result) {
          const { success, user } = result;

          if (success && user) {
            const { user } = result;

            setLoggedInUser(user);
            setUserMovies(user.savedMovies);
            setUserSeries(user.savedSeries);
            console.log('App navigate to home');
            navigate('/');
          } else {
            localStorage.removeItem('token');
          }
        }
      }
    };

    checkedLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegister = async (
    username: string,
    password: string,
    confirmation: string
  ) => {
    if (username === '' || password === '' || confirmation === '') {
      toast.error('All fields are required');
      return;
    }

    if (password !== confirmation) {
      toast.error('Passwords must match');
      return;
    }

    const result: AuthResult | undefined = await userService.register(
      username,
      password
    );

    if (result) {
      const { success, message } = result;
      if (success) {
        handleLogin(username, password);
      } else {
        toast.error(message);
      }
    }
  };

  const handleLogin = async (username: string, password: string) => {
    if (username === '' || password === '') {
      toast.error('All fields are required');
      return;
    }

    const result: AuthResult | undefined = await userService.login(
      username,
      password
    );

    if (result) {
      const { success, message } = result;
      if (success) {
        const { user, token } = result;
        if (user && token) {
          setLoggedInUser(user);
          localStorage.setItem('token', token);
          setUserMovies(user.savedMovies);
          setUserSeries(user.savedSeries);
          navigate('/');
        }

        toast.success(message);
      } else {
        toast.error(message);
      }
    }
  };

  /*
  const saveMovie = async (
    movie: MovieResult
  ) => {
    const token = localStorage.getItem('token');

    if (!loggedInUser || !token) return;

    const result = await userService.addUserMovie(token, movie);

    if (result) {
      const { success, message } = result;

      if (success) {
        toast.success(message);
        setUserMovies(result.savedMovies);
      } else {
        toast.error(message);
      }
    }
  };

  const handleDeleteMovie = async (eventId: string) => {
    console.log('handleDeleteEvent eventId:', eventId);
    if (!loggedInUser) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    const result = await userService.deleteUserEvent(token, eventId);
    console.log('handleDelete result:', result);
    if (result) {
      const { success, events, message } = result;

      if (success) {
        setUserMovies(events);
        toast.success(message);
      } else {
        toast.error(message);
      }
    }
  };

  const handleLogOut = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('handleLogout e:', e);
    localStorage.removeItem('token');
    setLoggedInUser(null);
    navigate('/login');
    toast.success('Logged out');
  };
  */

  return (
    <div id="main-container">
      <Routes>
        <Route path="/" element={<HomePage loggedInUser={loggedInUser} />} />
        <Route
          path="/register"
          element={<RegisterPage handleRegister={handleRegister} />}
        />
        <Route
          path="/login"
          element={<LoginPage handleLogin={handleLogin} />}
        />
        <Route
          path="/profile"
          element={
            <ProfilePage
              loggedInUser={loggedInUser}
              savedMovies={userMovies}
              savedSeries={userSeries}
            />
          }
        />
        <Route path="/:imdbId" element={<ResultPage />} />
      </Routes>
      <ToastContainer theme="colored" newestOnTop />
    </div>
  );
}

export default App;
