import { useState } from 'react';
import { useTwitchChat } from './hooks/useTwitchChat';
import { SearchBar } from './components/SearchBar';
import { HypeMeter } from './components/HypeMeter';
import { SentimentThermometer } from './components/SentimentThermometer';
import { EmoteRanking } from './components/EmoteRanking';
import { LiveChat } from './components/LiveChat';
import { HypeEvents } from './components/HypeEvents';
import { TopUsers } from './components/TopUsers';
import { Demographics } from './components/Demographics';
import { CommandTracker } from './components/CommandTracker';

function App() {
  const [channel, setChannel] = useState('alanzoka');
  
  const { status, mps, topEmotes, sentiment, chatMessages, hypeEvents, topUsers, demographics, topCommands } = useTwitchChat(channel);

  return (
    <div className="text-center mt-8 font-sans text-white">
      <h1 className="text-3xl font-bold mb-4">Radar de Streaming 🎮</h1>
      
      <SearchBar onSearch={setChannel} />

      <h2 className="text-[#aaa] text-lg mb-8">{status}</h2>
      
      <div className="flex justify-center items-start gap-8 mt-8 flex-wrap max-w-[1200px] mx-auto pb-10">
        
        <div className="flex flex-col gap-6">
          <HypeMeter mps={mps} />
          <TopUsers users={topUsers} />
          <HypeEvents events={hypeEvents} />
        </div>

        <div className="flex flex-col gap-6 items-center">
          <SentimentThermometer sentiment={sentiment} />
          <Demographics ratio={demographics} />
          <EmoteRanking emotes={topEmotes} />
          <CommandTracker commands={topCommands} />
        </div>

        <LiveChat messages={chatMessages} />

      </div>
    </div>
  );
}

export default App;