'use client';

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Mic } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const dropdownRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<any>(null);
  const router = useRouter(); // ✅ using Next.js App Router

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let dataArray: Uint8Array;
    let source: MediaStreamAudioSourceNode;
    let animationId: number;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      if (!ctx || !analyser) return;

      analyser.getByteTimeDomainData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "#22d3ee";
      ctx.beginPath();

      const sliceWidth = (canvas.width * 1.0) / analyser.fftSize;
      let x = 0;

      for (let i = 0; i < analyser.fftSize; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      animationId = requestAnimationFrame(draw);
    };

    if (listening) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        dataArray = new Uint8Array(analyser.fftSize);

        source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        draw();
      });
    }

    return () => {
      if (audioContext) audioContext.close();
      cancelAnimationFrame(animationId);
    };
  }, [listening]);

  const toggleMic = () => {
    const newState = !listening;
    setListening(newState);
    setShowAssistant(newState);
    console.log(newState ? "Listening..." : "Stopped listening");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center p-4 max-w-screen w-screen overflow-hidden relative">
      {/* Radial Canvas at the top */}
      {listening && (
        <canvas
          ref={canvasRef}
          width={window.innerWidth}
          height={300}
          className="absolute top-0 left-0 w-full h-[200px] z-2"
        ></canvas>
      )}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center z-10"
      >
        {/* Microphone Icon */}
        <div className="relative w-28 h-28 mx-auto mb-4">
          <motion.div
            whileTap={{ scale: 0.9, rotate: -5 }}
            whileHover={{ scale: 1.1 }}
            onClick={toggleMic}
            className={`relative z-10 w-28 h-28 flex items-center justify-center rounded-full cursor-pointer ${
              listening
                ? "bg-red-500 text-white shadow-xl animate-pulse"
                : "bg-gray-700 text-white"
            }`}
          >
            <Mic className="w-8 h-8" />
          </motion.div>
        </div>

        {/* Assistant Greeting Popup */}
        <AnimatePresence>
          {showAssistant && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="mt-6 inline-block bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg"
            >
              Hi, how can I help you today?
            </motion.div>
          )}
        </AnimatePresence>

        <h1 className="text-4xl font-bold mt-8">Welcome to ScoutX</h1>
        <p className="mt-4 text-lg">Your AI-powered recruitment assistant</p>

        <div className="flex justify-center mt-10 space-x-4 relative z-20">
          <div className="relative" ref={dropdownRef}>
            <Button
              onClick={() => setOpen(!open)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create Screenline ▾
            </Button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-0 w-48 bg-gray-900 border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() => {
                      setOpen(false);
                      console.log("Create Job Post");
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-700 transition font-light text-sm"
                  >
                    Create Job Post
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false);
                      router.push("/create/jobs"); 
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-700 transition font-light text-sm"
                  >
                    View Job Postings
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Analyze
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
