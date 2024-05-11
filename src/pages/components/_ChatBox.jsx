import { useEffect, useState } from 'react';

export default function ChatBox() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [refetch, setRefetch] = useState(true)

  console.log('inside ChatBox', messages);

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/messages');
      const data = await response.json();
      setMessages(data);
      setMessage('');
    })();
  }, [refetch]);

  const handleClick = async () => {
    console.log('inside handleClick');
    const data = {
      content: message,
    };
    try {
      let response = await fetch('/api/messages', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("successfully saved")
        setRefetch(!refetch);
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      alert('Error saving message.');
    }
  };
  return (
    <div>
      <ul id="messages">
        {messages.map((m, i) => (
          <li key={m._id}>{m.content}</li>
        ))}
      </ul>

      <input
        value={message}
        onChange={({ target }) => setMessage(target.value)}
        id="input"
        autoComplete="off"
        placeholder="type something here"
      />
      <button onClick={handleClick}>Send</button>
    </div>
  );
}
