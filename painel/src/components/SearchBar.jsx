import { useState } from 'react';

export const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim().toLowerCase());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5 flex justify-center">
      <input 
        type="text" 
        placeholder="Digite o nome do streamer..." 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="px-4 py-2.5 text-base rounded-l-lg border border-[#333] bg-[#222] text-white outline-none focus:outline-none focus:border-[#9146FF] transition-colors"
      />
      <button 
        type="submit"
        className="px-5 py-2.5 text-base rounded-r-lg bg-[#9146FF] text-white font-bold hover:bg-[#7a3be0] transition-colors"
      >
        Monitorar
      </button>
    </form>
  );
};