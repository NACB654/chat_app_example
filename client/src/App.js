import { useEffect, useState } from 'react';
import { socket } from './socket';
import './App.css';
import messageAPI from './api/messageApi';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  const chatId = "f72cb5a7-06da-4802-85ff-abe6526e6dd7"
  const senderId = "5f4493cc-92e2-489f-9d47-224dbce3877f"

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

  const handleUsernameSet = async () => {
    if (username) {
      socket.emit("username", username);
      socket.connect();
      setIsConnected(true);
    }
  };

  const handleClick = async () => {
    console.log(value)
    socket.emit("message", value)
    setValue('');

    const response = await messageAPI.sendMessage({ chatId: chatId, senderId: senderId, content: value })
    
    if (response) {
      console.log("Mensage guardado");
    }
    else {
      console.log("Error al guardar mensaje");
    }
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
