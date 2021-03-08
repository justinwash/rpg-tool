import React from 'react';

const OuterSidebar = (props: { width: number }) => {
  
return <div
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
    <div className="g-signin2" data-onsuccess="onSignIn"></div>

    <img style={{ width: '80%' }} alt='user-icon' src='assets/placeholders/icons/user.png' />
  </div>
}

export default OuterSidebar;
