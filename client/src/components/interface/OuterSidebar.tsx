import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import LoginButton from './LoginButton';

const OuterSidebar = (props: { width: number }) => {
  const auth = useContext(AuthContext);

  return (
    <div
      id='placeholder-outer-sidebar'
      style={{
        background: '#222',
        width: `${props.width}px`,
        height: '100vh',
        float: 'left',
        paddingTop: '10px',
        textAlign: 'center',
      }}
    >
      <LoginButton />

      {auth.authState.googleUser && <img style={{ width: '80%' }} alt='user-icon' src={auth.authState.googleUser.getImageUrl()} />}
    </div>
  );
};

export default OuterSidebar;
