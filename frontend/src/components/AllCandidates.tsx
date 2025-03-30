"use client";

import { useEffect, useState } from "react";
import Loader from "./ui/loader";
import Link from "next/link";
import { Inbox, InfoIcon } from "lucide-react";
import { FirstScreenFormModal } from "./FirstScreenModal";

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
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    fetch(`/api/candidates`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch candidates");
        return res.json();
      })
      .then(setCandidates)
      .catch((err) => setError(err.message));
  }, [jobId]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!candidates.length) return (<Loader />);

  return (
    <div className="mt-6">
      {showModal && selectedCandidate && (
        <FirstScreenFormModal 
          candidate={selectedCandidate}
          onClose={() => {
            setShowModal(false);
            setSelectedCandidate(null);
          }}
        />
      )}
      <h2 className="text-xl font-semibold mb-4">Applied Candidates</h2>
      <table className="w-full text-left text-sm border border-gray-700 rounded">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Current Position</th>
            <th className="p-3">Experience</th>
            <th className="p-3">Location</th>
            <th className="p-3">Match Score</th>
            <th className="p-3">Status</th>
            <th className="p-3">Applied</th>
            <th className="p-3 text-center">Screen</th>
            <th className="p-3 text-center">Schedule</th>
            <th className="p-3 text-center">Send Feedback</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c) => (
            <tr key={c.id} className="border-t border-gray-700 hover:bg-gray-800">
              <td className="p-3">
                <Link href={`/create/jobs/${jobId}/candidate/${c.id}`} className="text-blue-400 hover:text-blue-300">
                  {c.name}
                </Link>
              </td>
              <td className="p-3">
                <div className="text-gray-300">{c.current_job_title}</div>
                <div className="text-gray-400 text-xs">{c.current_company}</div>
              </td>
              <td className="p-3">{c.experience_years} years</td>
              <td className="p-3">{c.location}</td>
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">{c.ai_skill_match_score}%</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-blue-400">{c.ai_experience_match_score}%</span>
                </div>
              </td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded text-xs ${
                  c.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                  c.status === 'interviewed' ? 'bg-blue-500/20 text-blue-400' :
                  c.status === 'hired' ? 'bg-green-500/20 text-green-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {c.status}
                </span>
              </td>
              <td className="p-3 text-gray-400">
                {new Date(c.applied_at).toLocaleDateString()}
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
                    onClick={() => alert(`Start AI interview for ${c.name}`)}
                  >
                    Analysis
                  </button>
                </div>
              </td>
              <td className="p-3 text-center">
                <button
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs px-4 py-1 rounded shadow-md transition"
                  onClick={() => alert(`Start AI interview for ${c.name}`)}
                >
                  Schedule Interview
                </button>
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
