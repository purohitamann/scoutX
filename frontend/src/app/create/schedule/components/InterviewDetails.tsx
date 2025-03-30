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
    <div className="bg-white rounded-xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">{interview.title}</h2>
      
      <div className="space-y-6 mb-8">
        <div>
          <div className="text-sm text-gray-500 mb-1">Candidate</div>
          <div className="font-medium text-lg">{interview.candidateName}</div>
        </div>
        
        <div>
          <div className="text-sm text-gray-500 mb-1">Position</div>
          <div className="font-medium text-lg">{interview.jobTitle}</div>
        </div>
        
        <div>
          <div className="text-sm text-gray-500 mb-1">Time</div>
          <div className="font-medium text-lg">{formatDate(interview.start)} - {formatDate(interview.end)}</div>
        </div>
        
        <div>
          <div className="text-sm text-gray-500 mb-2">Google Meet Link</div>
          <div className="flex items-center mt-1">
            <input 
              readOnly 
              className="flex-1 p-3 border rounded-l-md text-base bg-gray-50 focus:outline-none" 
              value={getMeetLink()}
            />
            <button
              onClick={copyMeetLink}
              className="px-4 py-3 bg-blue-50 text-blue-700 rounded-r-md text-base hover:bg-blue-100 font-medium"
            >
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleSendInvite}
          disabled={isSending}
          className="px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-base font-medium shadow-sm transition-colors"
        >
          {isSending ? 'Sending...' : 'Send Invite to Candidate'}
        </button>
        
        <button
          onClick={handleDownloadICal}
          className="px-5 py-3 bg-white text-blue-700 border border-blue-200 rounded-md hover:bg-blue-50 text-base font-medium shadow-sm transition-colors"
        >
          Download iCal
        </button>
        
        <button
          onClick={onClose}
          className="px-5 py-3 border border-gray-300 rounded-md hover:bg-gray-100 text-base font-medium transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
} 