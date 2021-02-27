import React from 'react';

const InnerSidebar = (props: { width: number }) => (
  <div
    id='placeholder-inner-sidebar'
    style={{
      background: '#888',
      width: `${props.width}px`,
      height: '100vh',
      float: 'left',
    }}
  >
    chat and event log and stuff
  </div>
);

export default InnerSidebar;
