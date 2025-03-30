'use client';


import CandidateProfile from "@/components/CandidateProfile";
import { use } from 'react';

export default function CandidatePage({ params }: { params: Promise<{ candidateId: string }> }) {
  const { candidateId } = use(params);
  return (
    <div className="">
      <CandidateProfile candidateId={candidateId} />
    </div>
  );
}
