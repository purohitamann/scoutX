import { use } from 'react';
import JobDetails from "@/components/JobDetails";
import AppliedCandidatesTable from '@/components/AllCandidates';

export default function JobPostingPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);
  
  return (
    <div className="container mx-auto p-4">

      
      <AppliedCandidatesTable jobId={jobId} />
    </div>
  );
}
