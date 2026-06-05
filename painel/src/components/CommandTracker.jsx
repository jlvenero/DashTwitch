import { motion, AnimatePresence } from 'framer-motion';

export const CommandTracker = ({ commands }) => {
  return (
    <div className="p-6 bg-[#1a1a1a] rounded-2xl w-[300px] text-left">
      <h3 className="mb-4 text-xl text-center">🤖 TOP COMANDOS (30s)</h3>
      <div className="flex flex-col gap-2">
        <AnimatePresence>
          {commands.length === 0 ? (
            <p className="text-center text-[#777] text-sm">Nenhum comando detectado...</p>
          ) : (
            commands.map((cmd) => (
              <motion.div
                key={cmd.name}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center justify-between bg-[#2a2a2a] p-3 rounded-lg border-l-4 border-[#00ffcc]"
              >
                <span className="font-mono text-sm text-[#00ffcc] font-bold">
                  {cmd.name}
                </span>
                <span className="font-bold text-sm text-white">
                  {cmd.count}x
                </span>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};