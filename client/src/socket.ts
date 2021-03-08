let socket = new WebSocket('ws://localhost:9001');

socket.onopen = (event) => {
  console.log('socket opened', event);
};

socket.onclose = (event) => {
  socket = new WebSocket('ws://localhost:9001');
};

export default socket;
