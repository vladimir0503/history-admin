
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logIn } from '../features/auth/authSlice';
import Login from '../pages/Login/Login';
import Main from '../pages/Main/Main';


import './App.scss';

function App() {

  const { isAuth } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (sessionStorage.getItem('authData')) {
      dispatch(logIn());
    };
  }, [])

  return (
    <div className="App">
      {!isAuth ? <Login /> : <Main />}
    </div>
  );
};

export default App;
