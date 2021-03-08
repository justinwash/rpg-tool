import React, { useEffect, useState } from 'react';
import { AuthState } from '../../types/AuthState';

export const AuthContext = React.createContext<{ authState: AuthState; setAuthState: any }>({
  authState: {} as AuthState,
  setAuthState: Function,
});

const AuthProvider = (props: any) => {
  const [authState, setAuthState] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    console.log('auth state changed: ', authState);
  }, [authState]);

  return <AuthContext.Provider value={{ authState, setAuthState }}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;
