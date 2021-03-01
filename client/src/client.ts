const client = new WebSocket('ws://localhost:9001');

client.onopen = (event) => {
  console.log('socket opened', event);
};

client.onclose = (event) => {
  console.log('socket closed', event);
};

export default client;
