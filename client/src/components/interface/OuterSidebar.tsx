import React from 'react';

const OuterSidebar = (props: { width: number }) => {
  
  function onSignIn(googleUser: any) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
  

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
    <div className="g-signin2" data-onsuccess={onSignIn}></div>

    <img style={{ width: '80%' }} alt='user-icon' src='assets/placeholders/icons/user.png' />
  </div>
}

export default OuterSidebar;
