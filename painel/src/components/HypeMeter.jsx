export const HypeMeter = ({ mps }) => (
  <div 
    className={`p-8 bg-[#1a1a1a] rounded-2xl w-[250px] ${
      mps > 5 ? 'text-[#ff4d4d]' : 'text-[#00ffcc]'
    }`}
  >
    <h3 className="text-xl text-white">HYPE METER</h3>
    
    <p className="text-[4rem] font-bold leading-none mt-2">
      {mps} <span className="text-2xl font-normal">msg/s</span>
    </p>
  </div>
);