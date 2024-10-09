import { useEffect, useState } from 'react';
import { socket } from './socket';
import './App.css';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (isConnected) {
      function onMessage(data) {
        console.log("Mensaje recibido:", data);
        setMessages(messages => [...messages, data]);
      }

      socket.on("message", onMessage);

      return () => {
        socket.off('message', onMessage);
        socket.disconnect()
      };
    }
  }, [isConnected]);

  const handleUsernameSet = () => {
    if (username) {
      socket.emit("username", username);
      socket.connect();
      setIsConnected(true); 
    }
  };

  const handleClick = () => {
    console.log(value)
    socket.emit("message", value)
    setValue('');
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="App">
      {!isConnected ? (
        <div>
          <input
            type="text"
            placeholder="Enter your username"
            onChange={handleUsernameChange}
          />
          <button onClick={handleUsernameSet}>Set Username</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Your message"
            onChange={handleChange}
            value={value}
          />
          <button onClick={handleClick}>Send</button>
        </div>
      )}
      <ul>
        {messages?.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
