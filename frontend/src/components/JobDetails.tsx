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
    <div className="bg-gray-900 text-gray-200 p-6 rounded-xl shadow-lg max-w-2xl mx-auto border border-gray-700">
      <h1 className="text-3xl font-semibold text-white mb-2">{job.title}</h1>
      <p className="text-gray-400 mb-4">{job.description}</p>
      <div className="grid grid-cols-2 gap-4 border-t border-gray-700 pt-4">
        <p><span className="font-medium text-gray-300">Field:</span> {job.field}</p>
        <p><span className="font-medium text-gray-300">Location:</span> {job.location}</p>
        <p><span className="font-medium text-gray-300">Type:</span> {job.employment_type}</p>
        <p><span className="font-medium text-gray-300">Salary:</span> {job.salary_range}</p>
        <p><span className="font-medium text-gray-300">Experience:</span> {job.experience_level}</p>
        <p><span className="font-medium text-gray-300">Status:</span> {job.status}</p>
      </div>
      <div className="mt-4 border-t border-gray-700 pt-4">
        <p className="font-medium text-gray-300">Required Skills:</p>
        <p className="text-gray-400">{job.required_skills.join(", ")}</p>
      </div>
      <div className="mt-2">
        <p className="font-medium text-gray-300">Preferred Skills:</p>
        <p className="text-gray-400">{job.preferred_skills.join(", ")}</p>
      </div>
      <div className="mt-4 border-t border-gray-700 pt-4">
        <p className="font-medium text-gray-300">Company:</p>
        <a href={job.company_website} className="text-blue-400 hover:text-blue-500 transition">
          {job.company_name}
        </a>
      </div>
      <p className="mt-4"><span className="font-medium text-gray-300">Deadline:</span> {new Date(job.application_deadline).toDateString()}</p>
      <div className="mt-4 border-t border-gray-700 pt-4">
        <p className="font-medium text-gray-300">Requirements:</p>
        <p className="text-gray-400">{job.requirements}</p>
      </div>
    </div>
  );
}
