'use client';

import { useState } from 'react';

interface Interview {
  id: number;
  title: string;
  start: Date;
  end: Date;
  candidateName: string;
  jobTitle: string;
  isAIInterview: boolean;
}

interface InterviewDetailsProps {
  interview: Interview | null;
  onClose: () => void;
}

export default function InterviewDetails({ interview, onClose }: InterviewDetailsProps) {
  const [isSending, setIsSending] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!interview) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSendInvite = () => {
    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      alert('Interview invitation sent to candidate!');
    }, 1000);
  };

  const getMeetLink = () => {
    // In a real app, you would generate an actual Google Meet link
    // This is just a placeholder
    return `https://meet.google.com/abc-defg-hij?${interview.id}`;
  };

  const generateICalData = () => {
    const startTime = interview.start.toISOString();
    const endTime = interview.end.toISOString();
    const meetLink = getMeetLink();
    
    return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:AI Interview with ${interview.candidateName}
DTSTART:${startTime.replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${endTime.replace(/[-:]/g, '').split('.')[0]}Z
DESCRIPTION:AI Phone Interview for ${interview.jobTitle} position\\nMeeting Link: ${meetLink}
LOCATION:Virtual - Google Meet
END:VEVENT
END:VCALENDAR`;
  };

  const handleDownloadICal = () => {
    const data = generateICalData();
    const blob = new Blob([data], { type: 'text/calendar' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `interview-${interview.candidateName.replace(/\s+/g, '-').toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyMeetLink = () => {
    navigator.clipboard.writeText(getMeetLink()).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">{interview.title}</h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <div className="text-sm text-gray-500">Candidate</div>
          <div className="font-medium">{interview.candidateName}</div>
        </div>
        
        <div>
          <div className="text-sm text-gray-500">Position</div>
          <div className="font-medium">{interview.jobTitle}</div>
        </div>
        
        <div>
          <div className="text-sm text-gray-500">Time</div>
          <div className="font-medium">{formatDate(interview.start)} - {formatDate(interview.end)}</div>
        </div>
        
        <div>
          <div className="text-sm text-gray-500">Google Meet Link</div>
          <div className="flex items-center mt-1">
            <input 
              readOnly 
              className="flex-1 p-2 border rounded mr-2 text-sm bg-gray-50" 
              value={getMeetLink()}
            />
            <button
              onClick={copyMeetLink}
              className="px-3 py-2 bg-gray-100 rounded text-sm hover:bg-gray-200"
            >
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleSendInvite}
          disabled={isSending}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSending ? 'Sending...' : 'Send Invite to Candidate'}
        </button>
        
        <button
          onClick={handleDownloadICal}
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
        >
          Download iCal
        </button>
        
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
        >
          Close
        </button>
      </div>
    </div>
  );
} 