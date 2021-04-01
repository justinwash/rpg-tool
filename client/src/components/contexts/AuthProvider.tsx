import React, { useEffect, useState } from 'react';
import { API_URL, CLIENT_ID } from '../../environment';
import http from '../../http';
import { AuthState } from '../../types/AuthState';

export const AuthContext = React.createContext<{
  authState: AuthState;
  setAuthState: any;
  onSuccess: Function;
  onFailure: Function;
  signOut: Function;
}>({
  authState: {} as AuthState,
  setAuthState: Function,
  onSuccess: Function,
  onFailure: Function,
  signOut: Function,
});

const AuthProvider = (props: any) => {
  const [authState, setAuthState] = useState<AuthState>({} as AuthState);
  const [rerender, setRerender] = useState(true);

  const onSuccess = (authData: any) => {
    let profile = authData.getBasicProfile();
    if (!profile) return;

    let newAuthState = { googleUser: profile } as AuthState;

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
            setAuthState({ ...newAuthState, rpgToolUser: res.data });
          }
        })
        .catch((err) => console.log(err));
  };

  const onFailure = (error: any) => {
    setAuthState({} as AuthState);
    console.log(error);
  };

  useEffect(() => {
    // @ts-expect-error
    const { gapi } = window;

    if (!gapi) {
      setRerender(!rerender);
      return;
    }

    gapi.load('auth2', () => {
      gapi.auth2
        .init({
          client_id: CLIENT_ID,
        })
        .then((auth2: any) => {
          let currentUser = auth2.currentUser.get();
          if (currentUser.Aa) {
            // is there a better way to check for this?
            onSuccess(currentUser);
          }
        });
    });
  }, [rerender, setRerender]);

  const signOut = () => {
    // @ts-expect-error
    const { gapi } = window;
    if (!gapi) return;

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      setAuthState({} as AuthState);
    });
  };

  useEffect(() => {
    console.log('auth state changed: ', authState);
  }, [authState]);

  return <AuthContext.Provider value={{ authState, setAuthState, onSuccess, onFailure, signOut }}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;
