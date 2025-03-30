'use client';


import CandidateProfile from "@/components/CandidateProfile";
import { use } from 'react';

export default function CandidatePage({ params }: { params: Promise<{ candidateId: string }> }) {
  const { candidateId } = use(params);
  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-gray-900 to-gray-800">
      <CandidateProfile candidateId={candidateId} />
    </div>
  );
}
