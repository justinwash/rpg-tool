import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { AuthState } from '../../types/AuthState';

const LoginButton = () => {
  const auth = useContext(AuthContext);
  const [rerender, setRerender] = useState(true);

  useEffect(() => {
    const onSuccess = (authData: any) => {
      let profile = authData.getBasicProfile();
      console.log(profile.getId());
      auth.setAuthState({ googleUser: profile } as AuthState);
    };

    const onFailure = (error: any) => {
      auth.setAuthState({ error } as AuthState);
      console.log(error);
    };

    // @ts-expect-error
    const { gapi } = window;

    if (!gapi) {
      setRerender(!rerender);
      return;
    }

    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: process.env.CLIENT_ID,
      });

      gapi.signin2.render('signin-button', {
        onsuccess: (googleUser: any) => onSuccess(googleUser),
        onfailure: (error: any) => onFailure(error),
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerender, setRerender]);

  const signOut = () => {
    // @ts-expect-error
    const { gapi } = window;
    if (!gapi) return;

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      auth.setAuthState({});
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: '10px',
      }}
    >
      <div id='signin-button'></div>
      {auth.authState.googleUser && <button onClick={signOut}>Sign Out</button>}
    </div>
  );
};

export default LoginButton;
