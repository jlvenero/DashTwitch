import { motion, AnimatePresence } from 'framer-motion';

export const HypeEvents = ({ events }) => {
  return (
    <div className="flex flex-col bg-[#1a1a1a] rounded-2xl w-[250px] overflow-hidden text-left p-6">
      <h3 className="mb-4 text-xl text-center">💸 Transações & Hype</h3>
      
      <div className="flex flex-col gap-3 min-h-[200px]">
        <AnimatePresence>
          {events.length === 0 ? (
            <p className="text-center text-[#777] my-auto text-sm">
              Aguardando eventos...
            </p>
          ) : (
            events.map((evt) => (
              <motion.div 
                key={evt.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`flex flex-col p-3 rounded-lg border border-white/5 ${evt.bg}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-white truncate max-w-[120px]">
                    {evt.user}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${evt.color} bg-black/30`}>
                    {evt.type}
                  </span>
                </div>
                <span className={`text-sm font-bold ${evt.color}`}>
                  {evt.detail}
                </span>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};