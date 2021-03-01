import { useEffect, useState } from 'react';
import client from '../../client';

const InnerSidebar = (props: { width: number }) => {
  const [messages, setMessages] = useState<Record<string, any>[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    console.log('adding event listener for chat');
    client.addEventListener('message', function (event) {
      setMessages((messages) => [...messages, JSON.parse(event.data)]);
    });
  }, []);

  const sendMessage = (message: string) => {
    if (newMessage === '') return;

    client.send(
      JSON.stringify({
        client_id: 1234,
        username: process.env.REACT_APP_USERNAME, // do this better
        channel: 'group',
        timestamp: Date.now(),
        message: message,
      })
    );
  };

  return (
    <div
      id='placeholder-inner-sidebar'
      style={{
        background: '#444',
        width: `${props.width}px`,
        height: '100vh',
        float: 'left',
      }}
    >
      <div
        style={{
          height: '100%',
          flexDirection: 'column',
          display: 'flex',
        }}
      >
        <div
          style={{
            height: '100%',
            flexDirection: 'column',
            display: 'flex',
            overflow: 'auto',
            paddingBottom: '6px',
          }}
        >
          <span style={{ height: '100%' }}></span>
          {messages.map((message) => (
            <span
              style={{
                margin: '0px 10px',
                borderBottom: '1px solid #0001',
                padding: '2px 0px',
                wordWrap: 'break-word',
              }}
            >
              <b>{message.username}: </b>
              <span>{message.message}</span>
            </span>
          ))}
        </div>
        <div
          style={{
            padding: '10px',
            background: 'darkgray',
          }}
        >
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key !== 'Enter') return;
              sendMessage(newMessage);
              setNewMessage('');
            }}
            style={{ width: '76%', marginLeft: '10px', marginRight: '10px' }}
          ></input>
          <button onClick={() => sendMessage(newMessage)}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default InnerSidebar;
