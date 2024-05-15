import { useEffect, useState } from 'react';

export default function ChatBoxSSE( { projectId }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);

  console.log('inside ChatBoxSSE');

  useEffect(() => {
    const retrieveMessages = async () => {
      const response = await fetch(`/api/messages/${projectId}`);
      const messages = await response.json();
      setMessages(messages);
    };
    (async () => {
      await retrieveMessages();
    })();

    const eventSource = new EventSource('/api/stream');
    eventSource.onopen = () => console.log('>>> Connection opened!');
    eventSource.onmessage = async () => await retrieveMessages();
    eventSource.onerror = () => console.log('Error opening connection');

    window.onbeforeunload = (e) => {
      eventSource.cancel();
    };

    setUser(localStorage.getItem('email'));

    return () => eventSource.close();
  }, []);

  useEffect(() => {
    const lastMsg = document.querySelector('ul').lastElementChild;
    if (lastMsg) lastMsg.scrollIntoView();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message, user, project_id: projectId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setMessage('');
  };

  return (
      <div className="bg-white shadow-md rounded-lg max-w-full w-full h-full">
        <div className="p-4 border-b bg-yellow-500 text-white rounded-t-lg flex justify-between items-center h-[50px]">
          <p className="text-lg font-semibold">Project Chat</p>
        </div>
        <div id="chatbox" className="p-4 overflow-y-auto h-[calc(100%-130px)]">
          <ul id="messages" className="mb-2 text-right flex flex-col items-end h-full">
            {messages.map((m) => (
              <div className="mb-2 text-right" key={m._id}>
                <span className="mr-3">{new Date(m.created_at).toLocaleString()} - {m.user || "user"} said:</span>
                <p className="bg-gray-400 text-white rounded-lg py-2 px-4 inline-block">
                  {m.content}
                </p>
              </div>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit} id="chat" className="p-4 border-t flex h-[80px]">
          <input
            onChange={({ target }) => setMessage(target.value)}
            id="message"
            type="text"
            value={message}
            className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded-r-md hover:bg-yellow-600 transition duration-300">
            Send
          </button>
        </form>
      </div>
  );
}
