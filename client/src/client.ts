let client = new WebSocket('ws://localhost:9001');

client.onopen = (event) => {
  console.log('socket opened', event);
};

client.onclose = (event) => {
  client = new WebSocket('ws://localhost:9001');
};

export default client;
