import React, { useContext, useEffect } from 'react';
import { AuthContext} from '../contexts/AuthProvider';

const LoginButton = () => {
  const auth = useContext(AuthContext);

  const onSuccess= (googleUser: any) => {
    auth.setAuthState(googleUser);
  };

  const onFailure = (error: any) => {
    auth.setAuthState(error)
    console.log(error);
  };

  useEffect(() => {
    // @ts-expect-error
    const { gapi } = window;

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

  return (
    <div id="signin-button"></div>
  );
};

export default LoginButton;