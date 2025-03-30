"use client";

import { useEffect, useState } from "react";
import Loader from "./ui/loader";
import Link from "next/link";
import { FirstScreenFormModal } from "./FirstScreenModal";
import { Inbox } from "lucide-react";
interface Job {
  id: string;
  title: string;
  description: string;
  field: string;
  location: string;
  employment_type: string;
  salary_range: string;
  experience_level: string;
  required_skills: string[];
  preferred_skills: string[];
  company_name: string;
  company_website: string;
  application_deadline: string;
  status: string;
  requirements: string;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  applied_at: string;
  experience_years: number;
  current_job_title: string;
  current_company: string;
  location: string;
  ai_skill_match_score: number;
  ai_experience_match_score: number;
}

export default function AppliedCandidatesTable({ jobId }: { jobId: string }) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    // Fetch job details
    fetch(`/api/jobs/${jobId}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch job details");
        return res.json();
      })
      .then((data) => {
        console.log('Job data:', data);
        setJob(data);
      })
      .catch((err) => setError(err.message));

    // Fetch candidates
    fetch(`/api/jobs/${jobId}/all-candidates/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch candidates");
        return res.json();
      })
      .then(setCandidates)
      .catch((err) => setError(err.message));
  }, [jobId]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!candidates.length || !job) return (<Loader />);

  return (
    <div className="mt-6">
      {showModal && selectedCandidate && job && (
        <FirstScreenFormModal 
          candidate={{
            id: selectedCandidate.id,
            name: selectedCandidate.name,
            email: selectedCandidate.email,
            phone: selectedCandidate.phone,
            status: selectedCandidate.status,
            applied_at: selectedCandidate.applied_at,
            experience_years: selectedCandidate.experience_years,
            current_job_title: selectedCandidate.current_job_title,
            current_company: selectedCandidate.current_company,
            location: selectedCandidate.location,
            ai_skill_match_score: selectedCandidate.ai_skill_match_score,
            ai_experience_match_score: selectedCandidate.ai_experience_match_score,
            job_name: job.title,
            descirption: job.description || job.requirements
          }}
          onClose={() => {
            setShowModal(false);
            setSelectedCandidate(null);
          }}
        />
      )}
      <h2 className="text-xl font-semibold mb-4">Applied Candidates</h2>
      <table className="w-full text-left text-sm border border-gray-700 rounded overflow-hidden">
        <thead className="bg-gray-800 text-gray-100">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Current Position</th>
            <th className="p-3">Experience</th>
            <th className="p-3">Location</th>
            <th className="p-3">Match Score</th>
            <th className="p-3">Status</th>
            <th className="p-3">Applied</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c) => (
            <tr key={c.id} className="border-t border-gray-700 hover:bg-gray-800 transition">
              <td className="p-3">
                <Link href={`/create/jobs/${jobId}/candidate/${c.id}`} className="text-blue-400 hover:underline">
                  {c.name}
                </Link>
              </td>
              <td className="p-3">
                <div className="text-gray-300 font-medium">{c.current_job_title}</div>
                <div className="text-gray-500 text-xs">{c.current_company}</div>
              </td>
              <td className="p-3">{c.experience_years} years</td>
              <td className="p-3">{c.location}</td>
              <td className="p-3">
                <div className="flex flex-col gap-1">
                  <span className="text-green-400 text-sm">Skill: {c.ai_skill_match_score}%</span>
                  <span className="text-blue-400 text-sm">Exp: {c.ai_experience_match_score}%</span>
                </div>
              </td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded text-xs font-medium uppercase tracking-wide ${
                  c.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                  c.status === 'interviewed' ? 'bg-blue-500/20 text-blue-400' :
                  c.status === 'hired' ? 'bg-green-500/20 text-green-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {c.status}
                </span>
              </td>
              <td className="p-3 text-gray-400 text-sm">
                {new Date(c.applied_at).toLocaleDateString()}
              </td>
              <td className="p-3 text-center">
                <button
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs px-4 py-1 rounded shadow-md transition"
                  onClick={() => window.location.href = `/interview/${c.id}`}
                >
                 Schedule Interview
                </button>
              </td>
              <td className="p-3 text-center">
                <div className="flex flex-col gap-2">
                  <button
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs px-4 py-1 rounded shadow-md transition"
                    onClick={() => {
                      setSelectedCandidate(c);
                      setShowModal(true);
                    }}
                  >
                    First Screening
                  </button>
                  <button
                    className="bg-gradient-to-r from-pink-400 to-indigo-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs px-4 py-1 rounded shadow-md transition"
              
                  >
            <Link href={`/create/analysis/${c.id}`}>
                      View Analysis
                    </Link>
                  </button>
                </div>
              </td>
              <td className="p-3 text-center">
                <button
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs px-4 py-1 rounded shadow-md transition"
                  onClick={() => alert(`Start AI interview for ${c.name}`)}
                >
            <Inbox />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
