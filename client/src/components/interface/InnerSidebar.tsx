import { useEffect, useState, useContext } from 'react';
import socket from '../../socket';
import { cleanJsonString } from '../../utilities/json';
import { AuthContext } from '../contexts/AuthProvider';

const InnerSidebar = (props: { session: any; width: number }) => {
  const auth = useContext(AuthContext);
  const [messages, setMessages] = useState<Record<string, any>[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    console.log('adding event listener for chat');
    socket.addEventListener('message', function (event) {
      let message = JSON.parse(event.data);
      if (cleanJsonString(message.channel) !== 'group' || message.session?.uuid !== props.session?.uuid) return;
      setMessages((messages) => [...messages, JSON.parse(event.data)]);
    });
  }, [props.session]);

  const sendMessage = (message: string) => {
    if (message === '' || !auth.authState.rpgToolUser) return;
    const user = auth.authState.rpgToolUser;

    if (message.startsWith('/roll ')) {
      message = message.replace('/roll ', '');
      socket.send(
        JSON.stringify({
          socket_id: 1234,
          username: user.username,
          channel: 'roll',
          timestamp: Date.now(),
          message: message,
          session: props.session,
        })
      );
    } else if (message.startsWith('/newmap ')) {
      message = message.replace('/newmap ', '');
      socket.send(
        JSON.stringify({
          socket_id: 1234,
          username: user.username,
          channel: 'map',
          command: 'new',
          timestamp: Date.now(),
          message: message,
        })
      );
    } else {
      socket.send(
        JSON.stringify({
          socket_id: 1234,
          username: user.username,
          channel: 'group',
          timestamp: Date.now(),
          message: message,
          session: props.session,
        })
      );
    }
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
          {messages.map((message, index) => (
            <span
              style={{
                margin: '0px 10px',
                borderBottom: '1px solid #0001',
                padding: '2px 0px',
                wordWrap: 'break-word',
              }}
              key={`message-${index}`}
            >
              <b>{cleanJsonString(message.username)}: </b>
              <span>{cleanJsonString(message.message)}</span>
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
