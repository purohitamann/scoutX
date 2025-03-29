'use client';
import React from "react";
import { useEffect, useState } from "react";

export default function CandidatesTable() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetch("/api/candidates")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.text(); // Get the response as text first
      })
      .then((text) => {
        if (text) {
          return JSON.parse(text); // Parse the text as JSON
        } else {
          throw new Error('Empty response body');
        }
      })
      .then((data) => setCandidates(data))
      .catch((error) => console.error('Error fetching candidates:', error));
  }, []);
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Candidates</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Resume</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr
              key={candidate.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => window.location.href = `/candidates/${candidate.id}`}
            >
              <td className="border p-2">{candidate.name}</td>
              <td className="border p-2">{candidate.email}</td>
              <td className="border p-2">{candidate.phone}</td>
              <td className="border p-2">
                <a href={candidate.resume} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
