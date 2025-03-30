'use client';

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center mt-20">
        Welcome to ScoutX
      </h1>
      <p className="text-center mt-4 text-lg">
        Your AI-powered recruitment assistant
      </p>

      <div className="flex justify-center mt-10 space-x-4 relative z-20">
        <div className="relative" ref={dropdownRef}>
          <Button
            onClick={() => setOpen(!open)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
                className="absolute left-0 mt-2 w-48 bg-gray-900 border border-gray-200 rounded-xl shadow-lg overflow-hidden"
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
                    console.log("View Job Postings");
                  }}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-700 transition font-light text-sm"
                >
                  View Job Postings
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Analyze
        </Button>
      </div>
    </div>
  );
}
