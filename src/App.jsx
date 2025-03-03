import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TimerApp() {
  const [time, setTime] = useState(10); // Temps du timer en secondes
  const [loops, setLoops] = useState(1); // Nombre de répétitions
  const [running, setRunning] = useState(false);
  const [currentLoop, setCurrentLoop] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(time);
  
  useEffect(() => {
    setSecondsLeft(time); // Mettre à jour l'affichage du temps en direct
  }, [time]);

  useEffect(() => {
    let interval;
    if (running && currentLoop < loops) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            playSound();
            if (currentLoop + 1 < loops) {
              setCurrentLoop((loop) => loop + 1);
              return time; // Réinitialiser le timer
            } else {
              setRunning(false);
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running, currentLoop, loops, time]);

  const playSound = () => {
    const audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
    audio.play();
  };

  const startTimer = () => {
    setRunning(true);
  };

  const stopTimer = () => {
    setRunning(false);
  };

  const resetTimer = () => {
    setRunning(false);
    setCurrentLoop(0);
    setSecondsLeft(time);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-900 min-h-screen text-white">
      <motion.h1 
        className="text-4xl font-bold mb-6 text-cyan-400"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Timer Futuriste
      </motion.h1>
      <div className="mt-4 flex flex-col gap-4 bg-gray-800 p-6 rounded-xl shadow-lg">
        <label className="text-lg">Temps (s) :</label>
        <motion.input
          type="number"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
          className="text-white w-24 text-center bg-transparent border-none outline-none appearance-none"
          whileHover={{ opacity: 1 }}
          onMouseEnter={(e) => e.target.style.opacity = 1}
          onMouseLeave={(e) => e.target.style.opacity = 0}
          onClick={(e) => e.target.select()}
          disabled={running}
        />
        <label className="text-lg">Répétitions :</label>
        <motion.input
          type="number"
          value={loops}
          onChange={(e) => setLoops(Number(e.target.value))}
          className="text-white w-24 text-center bg-transparent border-none outline-none appearance-none"
          whileHover={{ opacity: 1 }}
          onMouseEnter={(e) => e.target.style.opacity = 1}
          onMouseLeave={(e) => e.target.style.opacity = 0}
          onClick={(e) => e.target.select()}
          disabled={running}
        />
      </div>
      <motion.div 
        className="mt-6 text-3xl font-semibold text-cyan-300"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {secondsLeft} sec
      </motion.div>
      <div className="mt-2 text-lg">Cycle {currentLoop + 1} / {loops}</div>
      <div className="mt-6 flex gap-4">
        <motion.button
          onClick={startTimer}
          className="p-3 bg-cyan-500 hover:bg-cyan-700 text-white text-xl rounded-xl transition-transform transform hover:scale-105 shadow-lg"
          disabled={running}
          whileHover={{ scale: 1.1 }}
        >
          Démarrer
        </motion.button>
        <motion.button
          onClick={stopTimer}
          className="p-3 bg-red-500 hover:bg-red-700 text-white text-xl rounded-xl transition-transform transform hover:scale-105 shadow-lg"
          whileHover={{ scale: 1.1 }}
        >
          Arrêter
        </motion.button>
        <motion.button
          onClick={resetTimer}
          className="p-3 bg-yellow-500 hover:bg-yellow-700 text-white text-xl rounded-xl transition-transform transform hover:scale-105 shadow-lg"
          whileHover={{ scale: 1.1 }}
        >
          Reset
        </motion.button>
      </div>
    </div>
  );
}
