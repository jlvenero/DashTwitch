import { motion, AnimatePresence } from 'framer-motion';

export const TopUsers = ({ users }) => {
  return (
    <div className="p-6 bg-[#1a1a1a] rounded-2xl w-[250px] text-left">
      <h3 className="mb-4 text-xl text-center">🏆 MVP DO CHAT (30s)</h3>
      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {users.length === 0 ? (
            <p className="text-center text-[#777] text-sm">Contando mensagens...</p>
          ) : (
            users.map((u, index) => {
              const medalColor = 
                index === 0 ? 'text-yellow-400' : 
                index === 1 ? 'text-gray-300' : 
                'text-amber-600';

              return (
                <motion.div
                  key={u.user}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="flex items-center justify-between bg-[#2a2a2a] p-3 rounded-lg"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className={`font-bold text-lg ${medalColor}`}>
                      #{index + 1}
                    </span>
                    <span className="font-bold text-sm truncate max-w-[100px] text-white">
                      {u.user}
                    </span>
                  </div>
                  <span className="font-bold text-sm text-[#9146FF] whitespace-nowrap">
                    {u.count} msg
                  </span>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};