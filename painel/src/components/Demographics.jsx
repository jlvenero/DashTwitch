export const Demographics = ({ ratio }) => {
  return (
    <div className="p-6 bg-[#1a1a1a] rounded-2xl w-[300px]">
      <h3 className="mb-4 text-xl text-center">📊 DEMOGRAFIA (30s)</h3>
      
      <div className="flex w-full h-[25px] rounded-lg overflow-hidden bg-[#333]">
        {/* Barra de Subs */}
        <div 
          style={{ width: `${ratio.subPercent}%` }}
          className="flex items-center justify-center bg-[#9146FF] transition-[width] duration-500 ease-out text-xs font-bold text-white whitespace-nowrap"
        >
          {ratio.subPercent > 10 && `⭐ SUBS ${ratio.subPercent}%`}
        </div>
        
        {/* Barra de Não-Inscritos (Plebs) */}
        <div 
          style={{ width: `${ratio.plebPercent}%` }}
          className="flex items-center justify-center bg-[#555] transition-[width] duration-500 ease-out text-xs font-bold text-white whitespace-nowrap"
        >
          {ratio.plebPercent > 10 && `${ratio.plebPercent}% PLEBS`}
        </div>
      </div>
      
      <p className="mt-3 text-sm text-center text-[#666]">
        Mensagens analisadas: {ratio.total}
      </p>
    </div>
  );
};