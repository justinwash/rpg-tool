import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { CLIENT_ID, API_URL } from '../../environment';
import { Link, Redirect } from 'react-router-dom';

const LoginButton = () => {
  const auth = useContext(AuthContext);
  const [rerender, setRerender] = useState(true);

  useEffect(() => {
    // @ts-expect-error
    const { gapi } = window;

    if (!gapi) {
      setRerender(!rerender);
      return;
    }

    gapi.signin2.render('signin-button', {
      onsuccess: (googleUser: any) => auth.onSuccess(googleUser),
      onfailure: (error: any) => auth.onFailure(error),
    });
  }, [rerender, setRerender]);

  return (
    <div style={{ position: 'fixed', top: '8px', right: '8px' }}>
      <div id='signin-button'></div>
      {auth.authState.googleUser && <button onClick={() => auth.signOut()}>Sign Out</button>}
    </div>
  );
};

export default LoginButton;
