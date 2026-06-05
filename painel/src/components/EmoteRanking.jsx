import { motion, AnimatePresence } from 'framer-motion';

export const EmoteRanking = ({ emotes }) => {
  return (
    <div className="p-8 bg-[#1a1a1a] rounded-2xl w-[300px] text-left">
      <h3 className="mb-5 text-xl text-center">🔥 TOP EMOTES (30s)</h3>
      
      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {emotes.length === 0 ? (
            <p className="text-center text-[#777]">Aguardando emotes...</p>
          ) : (
            emotes.map((emote, index) => (
              <motion.div 
                key={emote.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="flex items-center justify-between bg-[#2a2a2a] p-3 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <span className="font-bold text-xl text-[#888]">
                    #{index + 1}
                  </span>
                  <img 
                    src={`https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/2.0`} 
                    alt="Emote" 
                    className="w-10 h-10" 
                  />
                </div>
                <span className="font-bold text-xl">
                  {emote.count}
                </span>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};