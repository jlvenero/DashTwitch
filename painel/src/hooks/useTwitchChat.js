import { useState, useEffect, useRef } from 'react';
import tmi from 'tmi.js';
import { TIME_WINDOW_MS, UPDATE_INTERVAL_MS, SENTIMENT_KEYWORDS, MAX_CHAT_MESSAGES } from '../constants/twitchConfig';

export const useTwitchChat = (channel) => {
  const [status, setStatus] = useState('Conectando...');
  const [mps, setMps] = useState(0);
  const [topEmotes, setTopEmotes] = useState([]);
  const [sentiment, setSentiment] = useState({ wPercent: 50, lPercent: 50, totalVotes: 0 });
  const [chatMessages, setChatMessages] = useState([]);
  const [hypeEvents, setHypeEvents] = useState([]); 
  const [topUsers, setTopUsers] = useState([]);
  const [demographics, setDemographics] = useState({ subPercent: 50, plebPercent: 50, total: 0 });
  const [topCommands, setTopCommands] = useState([]);

  const messageCounter = useRef(0);
  const emotesHistory = useRef({});
  const sentimentHistory = useRef({ w: [], l: [] });
  const usersHistory = useRef({});
  const subHistory = useRef({ subs: [], plebs: [] });
  const commandsHistory = useRef({});

  useEffect(() => {
    messageCounter.current = 0;
    emotesHistory.current = {};
    sentimentHistory.current = { w: [], l: [] };
    usersHistory.current = {};
    subHistory.current = { subs: [], plebs: [] };
    commandsHistory.current = {};
    
    setMps(0);
    setTopEmotes([]);
    setSentiment({ wPercent: 50, lPercent: 50, totalVotes: 0 });
    setChatMessages([]);
    setHypeEvents([]); 
    setTopUsers([]);
    setDemographics({ subPercent: 50, plebPercent: 50, total: 0 });
    setTopCommands([]);

    if (!channel) return;

    setStatus(`Conectando a ${channel}...`);

    const client = new tmi.Client({ channels: [channel] });
    client.connect()
      .then(() => setStatus(`🟢 Conectado ao chat de: ${channel}`))
      .catch((err) => setStatus(`🔴 Erro ao conectar: ${err}`));

    client.on('cheer', (_, tags) => setHypeEvents(prev => [{ id: tags.id || Date.now().toString(), type: 'BITS', user: tags['display-name'], detail: `${tags.bits} Bits`, color: 'text-amber-400', bg: 'bg-amber-400/10' }, ...prev].slice(0, 5)));
    client.on('subscription', (_, username) => setHypeEvents(prev => [{ id: Date.now().toString() + Math.random(), type: 'SUB', user: username, detail: 'Novo Apoiador', color: 'text-blue-400', bg: 'bg-blue-400/10' }, ...prev].slice(0, 5)));
    client.on('resub', (_, username, months) => setHypeEvents(prev => [{ id: Date.now().toString() + Math.random(), type: 'RESUB', user: username, detail: `${months} Meses`, color: 'text-purple-400', bg: 'bg-purple-400/10' }, ...prev].slice(0, 5)));
    client.on('raided', (_, username, viewers) => setHypeEvents(prev => [{ id: Date.now().toString() + Math.random(), type: 'RAID', user: username, detail: `${viewers} Espectadores`, color: 'text-red-400', bg: 'bg-red-400/10' }, ...prev].slice(0, 5)));

    client.on('message', (_, tags, message) => {
      messageCounter.current += 1;
      const now = Date.now();
      const username = tags['display-name'];
      const cleanMessage = message.trim().toLowerCase();

      if (!usersHistory.current[username]) usersHistory.current[username] = [];
      usersHistory.current[username].push(now);

      if (tags.subscriber) subHistory.current.subs.push(now);
      else subHistory.current.plebs.push(now);

      if (cleanMessage.startsWith('!')) {
        const commandName = cleanMessage.split(' ')[0];
        if (!commandsHistory.current[commandName]) commandsHistory.current[commandName] = [];
        commandsHistory.current[commandName].push(now);
      }

      const newMessage = { id: tags.id, user: username, color: tags.color || '#9146FF', text: message, isSub: tags.subscriber };
      setChatMessages((prev) => [...prev, newMessage].slice(-MAX_CHAT_MESSAGES));

      if (tags.emotes) {
        Object.entries(tags.emotes).forEach(([emoteId, positions]) => {
          if (!emotesHistory.current[emoteId]) emotesHistory.current[emoteId] = [];
          for (let i = 0; i < positions.length; i++) emotesHistory.current[emoteId].push(now);
        });
      }

      if (SENTIMENT_KEYWORDS.WIN.some(word => cleanMessage.includes(word))) sentimentHistory.current.w.push(now);
      if (SENTIMENT_KEYWORDS.LOSE.some(word => cleanMessage.includes(word))) sentimentHistory.current.l.push(now);
    });

    const interval = setInterval(() => {
      const now = Date.now();

      const cleanHistory = (historyRef) => {
        const counts = {};
        Object.keys(historyRef.current).forEach((key) => {
          const valid = historyRef.current[key].filter(t => now - t <= TIME_WINDOW_MS);
          historyRef.current[key] = valid;
          if (valid.length > 0) counts[key] = valid.length;
          else delete historyRef.current[key];
        });
        return counts;
      };

      const currentUsers = cleanHistory(usersHistory);
      setTopUsers(Object.entries(currentUsers).map(([user, count]) => ({ user, count })).sort((a, b) => b.count - a.count).slice(0, 3));

      const currentEmotes = cleanHistory(emotesHistory);
      setTopEmotes(Object.entries(currentEmotes).map(([id, count]) => ({ id, count })).sort((a, b) => b.count - a.count).slice(0, 5));

      const currentCommands = cleanHistory(commandsHistory);
      setTopCommands(Object.entries(currentCommands).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 5));

      const validWs = sentimentHistory.current.w.filter(t => now - t <= TIME_WINDOW_MS);
      const validLs = sentimentHistory.current.l.filter(t => now - t <= TIME_WINDOW_MS);
      sentimentHistory.current.w = validWs;
      sentimentHistory.current.l = validLs;
      const totalSent = validWs.length + validLs.length;
      setSentiment(totalSent > 0 
        ? { wPercent: Math.round((validWs.length / totalSent) * 100), lPercent: 100 - Math.round((validWs.length / totalSent) * 100), totalVotes: totalSent }
        : { wPercent: 50, lPercent: 50, totalVotes: 0 });

      const validSubs = subHistory.current.subs.filter(t => now - t <= TIME_WINDOW_MS);
      const validPlebs = subHistory.current.plebs.filter(t => now - t <= TIME_WINDOW_MS);
      subHistory.current.subs = validSubs;
      subHistory.current.plebs = validPlebs;
      const totalDemo = validSubs.length + validPlebs.length;
      setDemographics(totalDemo > 0
        ? { subPercent: Math.round((validSubs.length / totalDemo) * 100), plebPercent: 100 - Math.round((validSubs.length / totalDemo) * 100), total: totalDemo }
        : { subPercent: 50, plebPercent: 50, total: 0 });

      setMps(messageCounter.current);
      messageCounter.current = 0;

    }, UPDATE_INTERVAL_MS);

    return () => {
      client.disconnect();
      clearInterval(interval);
    };
  }, [channel]);

  return { status, mps, topEmotes, sentiment, chatMessages, hypeEvents, topUsers, demographics, topCommands };
};