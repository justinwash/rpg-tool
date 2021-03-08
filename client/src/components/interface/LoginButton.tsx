import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

const LoginButton = () => {
  const auth = useContext(AuthContext);

  const onSuccess = (googleUser: any) => {
    auth.setAuthState(googleUser);
  };

  const onFailure = (error: any) => {
    auth.setAuthState(error);
    console.log(error);
  };

  useEffect(() => {
    // @ts-expect-error
    const { gapi } = window;
    if (!gapi) return;

    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: process.env.CLIENT_ID,
      });

      gapi.signin2.render('signin-button', {
        onsuccess: (googleUser: any) => onSuccess(googleUser),
        onfailure: (error: any) => onFailure(error),
      });
    });
  }, []);

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
    <div>
      <div id='signin-button'></div>
      {auth.authState.Ca && <button onClick={signOut}>Sign Out</button>}
    </div>
  );
};

export default LoginButton;
