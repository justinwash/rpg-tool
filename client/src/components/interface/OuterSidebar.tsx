import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { NavLink } from 'react-router-dom';
import { styles } from '../../componentStyles/styles';

const OuterSidebar = (props: { width: number }) => {
  const auth = useContext(AuthContext);
  const { outerSidebar: outerSidebarStyles, navLink: navLinkStyles } = styles;
  const navIconSrc = 'https://cdn.discordapp.com/emojis/804837948024422440.png';

  return (
    <div
      id='placeholder-outer-sidebar'
      style={{
        ...outerSidebarStyles,
        width: `${props.width}px`,
      }}
    >
      {auth.authState.googleUser && <img style={{ width: '80%' }} alt='user-icon' src={auth.authState.googleUser.getImageUrl()} />}
    </div>
  );
};

export default OuterSidebar;
