import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center mt-20">
        Welcome to ScoutX
      </h1>
      <p className="text-center mt-4 text-lg">
        Your AI-powered recruitment assistant
      </p>
      <div className="flex justify-center mt-10 space-x-4">
       <Button className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Screenline
        </Button>
        <Button className="bg-blue-500 text-white px-4 py-2 rounded">
          Analyze
        </Button>

      
      </div>
    </div>
  );
}
