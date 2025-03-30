'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import NewInterviewForm from './components/NewInterviewForm';
import InterviewDetails from './components/InterviewDetails';

// Define interfaces
interface Interview {
  id: number;
  title: string;
  start: Date;
  end: Date;
  candidateName: string;
  jobTitle: string;
  isAIInterview: boolean;
}

// Sample interviews for initial state
const sampleInterviews: Interview[] = [
  {
    id: 1,
    title: 'AI Interview: John Doe',
    start: new Date(new Date().setHours(10, 0, 0, 0)),
    end: new Date(new Date().setHours(10, 30, 0, 0)),
    candidateName: 'John Doe',
    jobTitle: 'Senior Software Engineer',
    isAIInterview: true
  },
  {
    id: 2,
    title: 'AI Interview: Jane Smith',
    start: new Date(new Date().setHours(13, 0, 0, 0)),
    end: new Date(new Date().setHours(13, 30, 0, 0)),
    candidateName: 'Jane Smith',
    jobTitle: 'Data Scientist',
    isAIInterview: true
  },
  {
    id: 3,
    title: 'AI Interview: Mike Johnson',
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
    end: new Date(new Date().setDate(new Date().getDate() + 1)),
    candidateName: 'Mike Johnson',
    jobTitle: 'UX Designer',
    isAIInterview: true
  },
];

// Use dynamic import for the calendar component to avoid SSR issues
const InterviewCalendar = dynamic(() => import('./components/InterviewCalendar'), {
  ssr: false,
});

export default function SchedulePage() {
  const [interviews, setInterviews] = useState<Interview[]>(sampleInterviews);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'calendar' | 'upcoming'>('calendar');

  const handleScheduleInterview = (interviewData: {
    candidateName: string;
    jobTitle: string;
    email: string;
    date: Date;
    duration: number;
  }) => {
    const endDate = new Date(interviewData.date);
    endDate.setMinutes(endDate.getMinutes() + interviewData.duration);
    
    const newInterview: Interview = {
      id: interviews.length > 0 ? Math.max(...interviews.map(i => i.id)) + 1 : 1,
      title: `AI Interview: ${interviewData.candidateName}`,
      start: interviewData.date,
      end: endDate,
      candidateName: interviewData.candidateName,
      jobTitle: interviewData.jobTitle,
      isAIInterview: true
    };
    
    setInterviews(prev => [...prev, newInterview]);
    setShowScheduleForm(false);
    
    // Optionally show details of the newly created interview
    setSelectedInterview(newInterview);
  };

  const handleAddInterviewFromCalendar = (interview: Interview) => {
    setInterviews(prev => [...prev, interview]);
  };

  const handleSelectEvent = (interview: Interview) => {
    setSelectedInterview(interview);
  };

  const handleCloseDetails = () => {
    setSelectedInterview(null);
  };

  // Helper function to determine if an interview is upcoming
  const isUpcoming = (date: Date) => {
    return date > new Date();
  };

  // Filter upcoming interviews
  const upcomingInterviews = interviews.filter(interview => isUpcoming(interview.start));

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">
      <div className="w-full">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-4xl font-bold text-blue-500 mb-6 sm:mb-0">AI Interview Scheduling</h1>
          
          <button
            onClick={() => setShowScheduleForm(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg font-medium shadow-md"
          >
            Schedule New Interview
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg mb-10 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('calendar')}
                className={`py-5 px-8 text-center border-b-2 font-medium text-base ${
                  activeTab === 'calendar'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Calendar View
              </button>
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`py-5 px-8 text-center border-b-2 font-medium text-base ${
                  activeTab === 'upcoming'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Upcoming Interviews ({upcomingInterviews.length})
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'calendar' ? (
              <InterviewCalendar 
                interviews={interviews}
                onSelectEvent={handleSelectEvent}
                onAddInterview={handleAddInterviewFromCalendar}
              />
            ) : (
              <div className="space-y-6 max-h-[70vh] overflow-y-auto py-4 px-2">
                {upcomingInterviews.length === 0 ? (
                  <p className="text-center text-gray-500 py-12 text-lg">No upcoming interviews scheduled.</p>
                ) : (
                  upcomingInterviews.map(interview => (
                    <div 
                      key={interview.id} 
                      className="border rounded-lg p-5 hover:bg-gray-50 cursor-pointer shadow-sm transition-all hover:shadow"
                      onClick={() => handleSelectEvent(interview)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{interview.title}</h3>
                          <p className="text-base text-gray-500">{interview.jobTitle}</p>
                        </div>
                        <div className="text-base text-gray-600 font-medium">
                          {interview.start.toLocaleString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        
        {showScheduleForm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-6">
            <div className="max-w-3xl w-full">
              <NewInterviewForm 
                onSchedule={handleScheduleInterview}
                onCancel={() => setShowScheduleForm(false)}
              />
            </div>
          </div>
        )}
        
        {selectedInterview && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-6">
            <div className="max-w-3xl w-full">
              <InterviewDetails 
                interview={selectedInterview}
                onClose={handleCloseDetails}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
