'use client';
import React from "react";
import { useEffect, useState } from "react";
import Loader from "./ui/loader";
import { useRouter } from "next/navigation";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Mail, Phone, FileText, ArrowRight } from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  resume: string;
  skills?: string[];
  experience?: string;
  score?: number;
}

export default function CandidatesTable() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/candidates")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.text();
      })
      .then((text) => {
        if (text) {
          return JSON.parse(text);
        } else {
          throw new Error('Empty response body');
        }
      })
      .then((data) => setCandidates(data))
      .catch((error) => console.error('Error fetching candidates:', error));
  }, []);

  if (candidates.length <= 0) {
    return (
      <div className="">
        <Loader fullScreen />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Candidates</h2>
        <div className="text-sm text-gray-500">
          {candidates.length} candidates found
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <Card 
            key={candidate.id}
            className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            onClick={() => router.push(`/candidates/${candidate.id}`)}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                    {candidate.name}
                  </h3>
                  {candidate.experience && (
                    <p className="text-sm text-gray-500">{candidate.experience} experience</p>
                  )}
                </div>
                {candidate.score && (
                  <Badge variant="secondary" className="text-sm">
                    {candidate.score}% Match
                  </Badge>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {candidate.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {candidate.phone}
                </div>
              </div>

              {candidate.skills && candidate.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {candidate.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="flex items-center text-sm text-blue-600">
                  <FileText className="w-4 h-4 mr-2" />
                  View Resume
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
