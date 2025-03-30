'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function InterviewPage() {
  const params = useParams();
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch('/api/perplexity/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            candidateId: params.id,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch analysis');
        }

        const data = await response.json();
        setAnalysis(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Analyzing candidate profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">AI Interview Analysis</h1>
        {analysis && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="font-semibold mb-2">Profile Analysis</h2>
              <p className="text-gray-700">{analysis.profileAnalysis}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="font-semibold mb-2">Suggested Questions</h2>
              <ul className="list-disc list-inside space-y-2">
                {analysis.questions?.map((q: string, i: number) => (
                  <li key={i} className="text-gray-700">{q}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 