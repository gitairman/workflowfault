import { useEffect, useState } from 'react';

export default function ChatBoxSSE() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loaded, setLoaded] = useState(false);

  console.log('inside ChatBoxSSE');

  useEffect(() => {
    const retrieveMessages = async () => {
      const response = await fetch('/api/messages');
      const messages = await response.json();
      console.log(messages);
      setMessages(messages);
      setLoaded(true);
    };
    (async () => {
      await retrieveMessages();
      console.log(eventSource);
    })();

    const eventSource = new EventSource('/api/stream');
    eventSource.onopen = () => console.log('>>> Connection opened!');
    eventSource.onmessage = async (event) => await retrieveMessages();
    eventSource.onerror = () => console.log('Error opening connection');

    window.onbeforeunload = (e) => {
      eventSource.cancel();
    };

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
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setMessage('');
  };

  return (
      <div className="bg-white shadow-md rounded-lg max-w-full w-full h-full">
        <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center h-[50px]">
          <p className="text-lg font-semibold">Project Chat</p>
        </div>
        <div id="chatbox" className="p-4 overflow-y-auto h-[calc(100%-130px)]">
          <ul id="messages" className="mb-2 text-right flex flex-col items-end h-full">
            {messages.map((m) => (
              <div className="mb-2 text-right" key={m._id}>
                <span className="mr-3">{new Date(m.created_at).toLocaleString()} - "User said:"</span>
                <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
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
            className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">
            Send
          </button>
        </form>
      </div>
  );
}

// <div class="fixed bottom-0 right-0 mb-4 mr-4">
//         <button id="open-chat" class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
//             </svg>
//             Chat with Admin Bot
//         </button>
//     </div>
//     <div id="chat-container" class="hidden fixed bottom-16 right-4 w-96">
//         <div class="bg-white shadow-md rounded-lg max-w-lg w-full">
//             <div class="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
//                 <p class="text-lg font-semibold">Admin Bot</p>
//                 <button id="close-chat" class="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400">
//                     <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
//                     </svg>
//                 </button>
//             </div>
//             <div id="chatbox" class="p-4 h-80 overflow-y-auto">
//               <!-- Chat messages will be displayed here -->
//               <div class="mb-2 text-right">
//                 <p class="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">hello</p>
//               </div>
//               <div class="mb-2">
//                 <p class="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">This is a response from the chatbot.</p>
//               </div>
//               <div class="mb-2 text-right">
//                 <p class="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">this example of chat</p>
//               </div>
//               <div class="mb-2">
//                 <p class="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">This is a response from the chatbot.</p>
//               </div>
//               <div class="mb-2 text-right">
//                 <p class="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">design with tailwind</p>
//               </div>
//               <div class="mb-2">
//                 <p class="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">This is a response from the chatbot.</p>
//               </div>
//             </div>
//             <div class="p-4 border-t flex">
//                 <input id="user-input" type="text" placeholder="Type a message" class="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <button id="send-button" class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">Send</button>
//             </div>
//         </div>
//     </div>
