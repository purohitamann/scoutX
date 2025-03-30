"use client";

import { useEffect, useState } from "react";

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

export default function JobDetails({ jobId }: { jobId: string }) {
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/jobs/${jobId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch job details");
        return res.json();
      })
      .then((data) => setJob(data))
      .catch((err) => setError(err.message));
  }, [jobId]);

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;
  if (!job) return <p className="text-gray-400 text-center">Loading job details...</p>;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 p-8 rounded-2xl shadow-xl max-w-3xl mx-auto border border-gray-800">
      <h1 className="text-4xl font-bold text-blue-400 mb-3">{job.title}</h1>
      <p className="text-gray-400 text-lg mb-6">{job.description}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-gray-800 pt-4 text-sm">
        <p><span className="font-semibold text-gray-300">Field:</span> {job.field}</p>
        <p><span className="font-semibold text-gray-300">Location:</span> {job.location}</p>
        <p><span className="font-semibold text-gray-300">Type:</span> {job.employment_type}</p>
        <p><span className="font-semibold text-gray-300">Salary:</span> {job.salary_range}</p>
        <p><span className="font-semibold text-gray-300">Experience:</span> {job.experience_level}</p>
        <p><span className="font-semibold text-gray-300">Status:</span> {job.status}</p>
      </div>
      <div className="mt-6 border-t border-gray-800 pt-4">
        <p className="font-semibold text-gray-300 mb-1">Required Skills</p>
        <p className="text-gray-400 text-sm">{job.required_skills.join(", ")}</p>
      </div>
      <div className="mt-4">
        <p className="font-semibold text-gray-300 mb-1">Preferred Skills</p>
        <p className="text-gray-400 text-sm">{job.preferred_skills.join(", ")}</p>
      </div>
      <div className="mt-6 border-t border-gray-800 pt-4">
        <p className="font-semibold text-gray-300 mb-1">Company</p>
        <a href={job.company_website} className="text-blue-400 hover:text-blue-500 text-sm underline">
          {job.company_name}
        </a>
      </div>
      <div className="mt-4">
        <p><span className="font-semibold text-gray-300">Deadline:</span> {new Date(job.application_deadline).toDateString()}</p>
      </div>
      <div className="mt-6 border-t border-gray-800 pt-4">
        <p className="font-semibold text-gray-300 mb-1">Additional Requirements</p>
        <p className="text-gray-400 text-sm">{job.requirements}</p>
      </div>
    </div>
  );
}
