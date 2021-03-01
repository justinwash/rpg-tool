const OuterSidebar = (props: { width: number }) => (
  <div
    id='placeholder-outer-sidebar'
    style={{
      background: '#222',
      width: `${props.width}px`,
      height: '100vh',
      float: 'left',
    }}
  >
    options, user profilepic, etc etc
  </div>
);

export default OuterSidebar;
