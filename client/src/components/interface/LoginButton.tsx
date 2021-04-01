import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { AuthState } from '../../types/AuthState';
import http from '../../http';
import { CLIENT_ID, API_URL } from '../../environment';
import { Link, Redirect } from 'react-router-dom';

const LoginButton = () => {
  const auth = useContext(AuthContext);
  const [rerender, setRerender] = useState(true);

  useEffect(() => {
    const onSuccess = (authData: any) => {
      let profile = authData.getBasicProfile();
      let res = {} as any;
      //testing
      if (API_URL)
        http
          .post(`${API_URL}/user`, {
            google_id: profile.getId(),
            first_name: profile.getGivenName(),
            last_name: profile.getFamilyName(),
            image: profile.getImageUrl(),
            email: profile.getEmail(),
          })
          .then((res) => {
            if (res?.data) {
              auth.setAuthState({ rpgToolUser: res.data, googleUser: profile } as AuthState);
            }
          })
          .catch((err) => console.log(err));
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
        client_id: CLIENT_ID,
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
    <div>
      <div id='signin-button'></div>
      <Link to='/registration'>register</Link>
      {auth.authState.googleUser && <button onClick={signOut}>Sign Out</button>}
    </div>
  );
};

export default LoginButton;
