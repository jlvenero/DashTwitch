import { useState, useEffect } from 'react';
// Caso suas credenciais estejam exportadas neste arquivo, você pode importá-las aqui:
// import { CLIENT_ID, ACCESS_TOKEN } from '../constants/twitchConfig';

export const TopStreamsBar = ({ onSelectStreamer }) => {
  const [streams, setStreams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLiveStreams = async () => {
      try {
        // Buscando os 10 canais mais assistidos em português
        const response = await fetch('https://api.twitch.tv/helix/streams?first=10&language=pt', {
          headers: {
            // ATENÇÃO: Substitua pelas suas credenciais reais ou importe do seu twitchConfig.js
            'Client-ID': import.meta.env.VITE_TWITCH_CLIENT_ID, 
            'Authorization': `Bearer ${import.meta.env.VITE_TWITCH_ACCESS_TOKEN}` 
          }
        });
        
        const json = await response.json();
        
        if (json.data) {
          setStreams(json.data);
        }
      } catch (error) {
        console.error('Erro ao buscar streams ao vivo:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLiveStreams();
  }, []);

  // Função para formatar o número de viewers (ex: 25400 -> 25.4 mil)
  const formatViewers = (num) => {
    return Intl.NumberFormat('pt-BR', { notation: "compact", maximumFractionDigits: 1 }).format(num);
  };

  // Função para formatar a URL da thumbnail que a Twitch retorna com {width} e {height}
  const getThumbnailUrl = (url, width = 60, height = 60) => {
    return url.replace('{width}', width).replace('{height}', height);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 mb-2 mt-4">
        <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          Carregando transmissões ao vivo...
        </span>
        <div className="flex gap-4 overflow-hidden h-14">
          {/* Skeleton loading para dar feedback visual */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-48 h-12 bg-slate-800 animate-pulse rounded-full flex-shrink-0"></div>
          ))}
        </div>
      </div>
    );
  }

  if (streams.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 mb-2 mt-4">
      <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        Em Alta Agora
      </span>
      
      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
        {streams.map((stream) => (
          <button
            key={stream.id}
            onClick={() => onSelectStreamer(stream.user_login)}
            className="flex items-center gap-3 bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-slate-800 transition-all rounded-full pr-5 p-1.5 flex-shrink-0 group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <div className="relative">
              <img 
                src={getThumbnailUrl(stream.thumbnail_url)} 
                alt={stream.user_name} 
                className="w-10 h-10 rounded-full border-2 border-slate-900 group-hover:border-indigo-500 transition-colors object-cover" 
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 border-2 border-slate-900 rounded-full"></span>
            </div>
            
            <div className="flex flex-col items-start text-left max-w-[120px]">
              <span className="text-sm font-bold text-slate-200 leading-tight group-hover:text-indigo-400 transition-colors truncate w-full">
                {stream.user_name}
              </span>
              <span className="text-xs text-slate-400 truncate w-full">
                {formatViewers(stream.viewer_count)} • {stream.game_name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};