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
import { TopStreamsBar } from './components/TopStreamsBar';

function App() {
  const [channel, setChannel] = useState('alanzoka');
  
  const { status, mps, topEmotes, sentiment, chatMessages, hypeEvents, topUsers, demographics, topCommands } = useTwitchChat(channel);

  return (
    // Fundo escuro geral e container flexível
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 lg:p-6 flex flex-col xl:flex-row gap-6 font-sans">
      
      {/* 1. ÁREA PRINCIPAL (Esquerda/Centro) */}
      <main className="flex-1 flex flex-col gap-6">
        
        {/* Barra Superior - Pesquisa e Status */}
        <header className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="w-full max-w-md">
            <h1 className="text-xl font-bold mb-2 hidden sm:block">Radar de Streaming 🎮</h1>
            <SearchBar onSearch={setChannel} />
          </div>
          <div className="text-slate-400 text-sm font-medium bg-slate-950/50 px-4 py-2 rounded-lg border border-slate-800/50">
            {status}
          </div>
        </header>

        {/* NOVA BARRA DE ATALHOS ADICIONADA AQUI */}
        <TopStreamsBar onSelectStreamer={setChannel} />

        {/* Hero Metrics (Temperatura e Hype) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm min-h-[160px]">
            <HypeMeter mps={mps} />
          </div>
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm min-h-[160px]">
            <SentimentThermometer sentiment={sentiment} />
          </div>
        </section>

        {/* Data Cards (Listas e Rankins) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm h-80 overflow-hidden">
            <TopUsers users={topUsers} />
          </div>
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm h-80 overflow-hidden">
            <EmoteRanking emotes={topEmotes} />
          </div>
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm h-80 overflow-hidden">
            <Demographics ratio={demographics} />
          </div>
        </section>

        {/* Eventos e Comandos */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm">
            <CommandTracker commands={topCommands} />
          </div>
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm">
            <HypeEvents events={hypeEvents} />
          </div>
        </section>

      </main>

      {/* 2. BARRA LATERAL (Direita) - Live Chat */}
      <aside className="w-full xl:w-[400px] flex flex-col gap-6 flex-shrink-0">
        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm flex-1 flex flex-col overflow-hidden min-h-[600px] xl:min-h-0 xl:h-[calc(100vh-3rem)] sticky top-6">
          <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
            <h2 className="font-semibold text-slate-200">Live Chat</h2>
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <LiveChat messages={chatMessages} />
          </div>
        </div>
      </aside>

    </div>
  );
}

export default App;