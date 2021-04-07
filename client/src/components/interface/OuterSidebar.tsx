import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { styles } from '../../componentStyles/styles';

const OuterSidebar = (props: { width: number }) => {
  const auth = useContext(AuthContext);
  const { outerSidebar: outerSidebarStyles } = styles;

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
