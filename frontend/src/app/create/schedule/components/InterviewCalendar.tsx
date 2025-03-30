'use client';

import { useState, useCallback } from 'react';
import { Calendar, Views, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addHours } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Create a date-fns based localizer
const locales = {
  'en-US': enUS,
};

// Create proper localizer
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Define events interface
interface Interview {
  id: number;
  title: string;
  start: Date;
  end: Date;
  candidateName: string;
  jobTitle: string;
  isAIInterview: boolean;
}

interface InterviewCalendarProps {
  interviews?: Interview[];
  onSelectEvent?: (interview: Interview) => void;
  onAddInterview?: (interview: Interview) => void;
}

// Sample interviews
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
    start: addHours(new Date(), 24),
    end: addHours(new Date(), 24.5),
    candidateName: 'Mike Johnson',
    jobTitle: 'UX Designer',
    isAIInterview: true
  },
];

export default function InterviewCalendar({ 
  interviews = sampleInterviews,
  onSelectEvent,
  onAddInterview
}: InterviewCalendarProps) {
  const handleSelectEvent = useCallback((event: Interview) => {
    if (onSelectEvent) {
      onSelectEvent(event);
    }
  }, [onSelectEvent]);

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      const title = window.prompt('New AI interview with candidate:');
      if (title) {
        const newInterview: Interview = {
          id: Math.max(0, ...interviews.map((e) => e.id)) + 1,
          title: `AI Interview: ${title}`,
          start,
          end,
          candidateName: title,
          jobTitle: 'Position TBD',
          isAIInterview: true,
        };
        
        if (onAddInterview) {
          onAddInterview(newInterview);
        }
      }
    },
    [interviews, onAddInterview]
  );

  return (
    <div className="h-[75vh] pb-4">
      <Calendar
        localizer={localizer}
        events={interviews}
        startAccessor="start"
        endAccessor="end"
        style={{ 
          height: '100%', 
          width: '100%' 
        }}
        selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        defaultView={Views.WEEK}
        views={['month', 'week', 'day']}
        popup
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: '#3b82f6',
            borderRadius: '4px',
            border: 'none',
            color: 'white',
            padding: '2px 4px',
            fontWeight: 'medium'
          }
        })}
        dayPropGetter={(date) => ({
          style: {
            backgroundColor: date.getDate() === new Date().getDate() ? '#f3f4f6' : 'transparent'
          }
        })}
      />
    </div>
  );
} 