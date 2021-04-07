import React, { useContext } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import LoginButton from '../interface/LoginButton';

const LandingPage = () => {
  const auth = useContext(AuthContext);

  if (auth.authState.rpgToolUser && !auth.authState.rpgToolUser.username) {
    return <Redirect to='/registration' />;
  }

  return (
    <div style={{}}>
      <LoginButton />
      <h2>WELCOME TO RPG-TOOL (pls get a better name)</h2>
      <br />
      {auth.authState.rpgToolUser && (
        <NavLink style={{ color: 'white' }} to='/play'>
          PLAY
        </NavLink>
      )}
      {!auth.authState.rpgToolUser && <div>LOG IN TO PLAY</div>}
    </div>
  );
};

export default LandingPage;
