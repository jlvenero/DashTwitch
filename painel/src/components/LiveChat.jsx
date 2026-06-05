import { useEffect, useRef } from 'react';

export const LiveChat = ({ messages }) => {
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col bg-[#1a1a1a] rounded-2xl w-[350px] h-[500px] overflow-hidden text-left">
      <div className="p-4 bg-[#222] text-center font-bold border-b border-[#333]">
        💬 Chat ao Vivo
      </div>
      
      <div ref={chatRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 scroll-smooth">
        {messages.length === 0 ? (
          <p className="text-center text-[#777] my-auto">Aguardando mensagens...</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="text-sm break-words leading-relaxed">
              <span 
                style={{ color: msg.color }} 
                className="font-bold mr-2"
              >
                {msg.isSub && '⭐ '}
                {msg.user}:
              </span>
              <span className="text-[#e0e0e0]">{msg.text}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};