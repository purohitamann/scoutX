"use client";

import { useParams } from "next/navigation";

const mockAnalysis = {
  candidate_name: "Patel Parth",
  candidate_summary:
    "Patel Parth is a data professional with experience working at multiple companies and familiarity with Python libraries. He has worked on SQL projects involving large datasets and has experience in networking-related data analysis.",
  criteria_scores: {
    "Communication Skills": 2,
    "Relevant Experience": 3,
    "Technical Knowledge": 2,
    "Cultural Fit": 2,
    "Enthusiasm / Motivation": 2,
    "English Fluency": 3,
  },
  strengths: "Experience with SQL and large datasets, some networking project experience",
  weaknesses: "Difficulty articulating machine learning concepts, discomfort with technical questions, limited enthusiasm",
  sentiment_confidence_analysis:
    "The candidate seemed hesitant and lacked confidence when asked about machine learning. His responses were often brief and he appeared uncomfortable with some technical questions.",
  ai_recommendation:
    "🚩 Weak Fit. While the candidate has some relevant experience, he struggled to articulate his skills clearly and showed reluctance to discuss technical aspects. His lack of enthusiasm suggests he may not be well-suited for the role.",
};

export default function CandidateAnalysisReport() {
  const { candidateId } = useParams();

  return (
    <div className="max-w-4xl mx-auto p-8 text-gray-200 bg-gray-900 rounded-xl shadow-lg mt-10 border border-gray-700">
      <h1 className="text-3xl font-bold mb-4 text-blue-400">AI Screening Report</h1>
      <p className="text-sm text-gray-500 mb-6">Candidate ID: {candidateId}</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Candidate: {mockAnalysis.candidate_name}</h2>
        <p className="text-gray-300">{mockAnalysis.candidate_summary}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Criteria Scores</h3>
        <ul className="grid grid-cols-2 gap-2">
          {Object.entries(mockAnalysis.criteria_scores).map(([key, value]) => (
            <li key={key}>
              <span className="text-gray-400">{key}:</span>{" "}
              <span className="text-blue-300 font-medium">{value}/5</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-1">Strengths</h3>
        <p className="text-green-400">{mockAnalysis.strengths}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-1">Weaknesses</h3>
        <p className="text-yellow-400">{mockAnalysis.weaknesses}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-1">Sentiment & Confidence</h3>
        <p className="text-gray-400">{mockAnalysis.sentiment_confidence_analysis}</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-300 mb-1">AI Recommendation</h3>
        <p className="text-red-400">{mockAnalysis.ai_recommendation}</p>
      </section>
    </div>
  );
}
