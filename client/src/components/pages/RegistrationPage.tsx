import React from 'react';
import react, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { API_URL } from '../../environment';
import http from '../../http';
import { AuthContext } from '../contexts/AuthProvider';

const RegistrationPage = (props: {}) => {
  const auth = useContext(AuthContext);

  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string>('');

  const submitUsername = (username: string) => {
    console.log(auth);
    if (username.length < 3) setError('username must be longer than 3 characters');
    else {
      http
        .put(`${API_URL}/user`, {
          ...auth.authState.rpgToolUser,
          username: username,
        })
        .then((res) => {
          if (res?.data) {
            auth.setAuthState({
              ...auth.authState,
              rpgToolUser: res.data,
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  if (auth.authState.rpgToolUser?.username) {
    return <Redirect to='/play' />;
  }

  return (
    <div>
      <h2>pls choose a username</h2>
      <input placeholder='username' value={username} onChange={(event) => setUsername(event.target.value)} />
      <br />
      {error}
      <br />
      <button onClick={() => submitUsername(username)}>Register</button>
    </div>
  );
};

export default RegistrationPage;
