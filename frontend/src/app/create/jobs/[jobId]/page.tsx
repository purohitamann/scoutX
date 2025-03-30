'use client'
import { use } from 'react';
import JobDetails from "@/components/JobDetails";
// import AppliedCandidatesTable from '@/components/AppliedCandidate';
import AppliedCandidatesTable from '@/components/AllCandidates';

export default function JobPostingPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);
  
  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-gray-900 to-gray-800">

      <JobDetails jobId={jobId} />
      
      <AppliedCandidatesTable jobId={jobId} />
    </div>
  );
}
