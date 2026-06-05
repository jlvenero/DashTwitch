export const SentimentThermometer = ({ sentiment }) => {
  return (
    <div className="p-6 bg-[#1a1a1a] rounded-2xl w-[250px]">
      <h3 className="mb-4 text-xl">SENTIMENTO (30s)</h3>
      
      <div className="flex w-full h-[25px] rounded-lg overflow-hidden bg-[#333]">
        {/* Barra de Hype/Positiva */}
        <div 
          style={{ width: `${sentiment.wPercent}%` }}
          className="flex items-center justify-center bg-[#22c55e] transition-[width] duration-500 ease-out text-xs font-bold text-white whitespace-nowrap"
        >
          {sentiment.wPercent > 10 && `KKK / HYPE ${sentiment.wPercent}%`}
        </div>
        
        {/* Barra de F/Negativa */}
        <div 
          style={{ width: `${sentiment.lPercent}%` }}
          className="flex items-center justify-center bg-[#ef4444] transition-[width] duration-500 ease-out text-xs font-bold text-white whitespace-nowrap"
        >
          {sentiment.lPercent > 10 && `${sentiment.lPercent}% F / SAD`}
        </div>
      </div>
      
      <p className="mt-3 text-sm text-[#666]">
        Amostras no radar: {sentiment.totalVotes}
      </p>
    </div>
  );
};