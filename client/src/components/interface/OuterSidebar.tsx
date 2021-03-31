import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { NavLink } from 'react-router-dom';

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
      <NavLink to='/link'>
        <img style={{ maxWidth: '75%' }} src='https://cdn.discordapp.com/emojis/804837948024422440.png' alt='Home' />
      </NavLink>

      {auth.authState.googleUser && <img style={{ width: '80%' }} alt='user-icon' src={auth.authState.googleUser.getImageUrl()} />}
    </div>
  );
};

export default OuterSidebar;
