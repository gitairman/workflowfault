import { useEffect, useState } from 'react';

export default function ChatBoxSSE() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  console.log('inside ChatBoxSSE');

  useEffect(() => {
    const retrieveMessages = async () => {
      const response = await fetch('/api/messages');
      const messages = await response.json();
      console.log(messages);
      setMessages(messages);
    };
    (async () => {
      await retrieveMessages();
      console.log(eventSource);
    })();

    const controller = new AbortController();
    const signal = controller.signal;

    const eventSource = new EventSource('/api/stream', {signal});
    eventSource.onopen = () => console.log('>>> Connection opened!');
    eventSource.onmessage = async (event) => await retrieveMessages();
    eventSource.onerror = () => console.log('Error opening connection');

    window.onbeforeunload = (e) => {
      eventSource.cancel();
    };

    return () => eventSource.close();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setMessage('');
  };

  return (
    <main>
      <h1>Chat</h1>
      <ul id="messages">
        {messages.map((m) => (
          <li key={m._id}>{m.content}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} id="chat">
        <input
          onChange={({ target }) => setMessage(target.value)}
          id="message"
          type="text"
          value={message}
        />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}
