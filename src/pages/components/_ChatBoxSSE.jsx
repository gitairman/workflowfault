import { useEffect, useState } from 'react';

export default function ChatBoxSSE( { projectId }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [chatColor, setChatColor] = useState('gray');

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
      body: JSON.stringify({ message, user, project_id: projectId, chatColor }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setMessage('');
  };

  const handleChat = (e) => {
   setChatColor(e.target.value)
  }

  return (
    <div className="bg-gray-900 shadow-md rounded-lg max-w-full w-full h-full">
      <div className="p-4 border-b bg-yellow-500 text-white rounded-t-lg flex justify-between items-center h-[50px]">
        <p className="text-lg font-semibold">Project Chat</p>
        <form className="max-w-sm mx-0 flex items-center w-fit">
          <label htmlFor="chat_color" className="w-fit mr-2">Message Colour:</label>
          <select
            onChange={handleChat}
            id="chat_color"
            className={`${`bg-${chatColor}-500`} h-[50%] w-fit border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
            <option value="gray" className="bg-gray-500">
              Default
            </option>
            <option value="red" className="bg-red-500">
              Red
            </option>
            <option value="green" className="bg-green-500">
              Green
            </option>
            <option value="yellow" className="bg-yellow-500">
              Yellow
            </option>
            <option value="blue" className="bg-blue-500">
              Blue
            </option>
          </select>
        </form>
      </div>
      <div id="chatbox" className="p-4 overflow-y-auto h-[calc(100%-130px)]">
        <ul
          id="messages"
          className="mb-2 text-right flex flex-col items-end h-full">
          {messages.map((m) => (
            <div className="mb-2 text-right" key={m._id}>
              <span className="mr-3">
                {new Date(m.created_at).toLocaleString()} - {m.user || 'user'}{' '}
                said:
              </span>
              <p
                className={`bg-${
                  m.chatColor || 'gray'
                }-500 text-white rounded-lg py-2 px-4 inline-block`}>
                {m.content}
              </p>
            </div>
          ))}
        </ul>
      </div>
      <form
        onSubmit={handleSubmit}
        id="chat"
        className="p-4 border-t flex h-[80px]">
        <input
          onChange={({ target }) => setMessage(target.value)}
          id="message"
          type="text"
          value={message}
          className="text-black w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
