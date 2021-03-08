import React, { useEffect, useState } from 'react';

export const AuthContext = 
  React.createContext<{authState: any, setAuthState: any}>({
    authState: null, 
    setAuthState: Function
  });

const AuthProvider = (props: any) => {

  const [authState, setAuthState] = useState<Record<string, any>>({});

  useEffect(() => {
    console.log('auth state changed: ', authState);
  }, [authState])

  return <AuthContext.Provider value={{authState, setAuthState}}>
    {props.children}
    </AuthContext.Provider>
}

export default AuthProvider;