'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
interface JobCard {
  id: string;
  title: string;
  description: string;
  field: string;
}

// const sampleJobs: JobCard[] = [
//   {
//     id: "1",
//     title: "Senior Software Engineer",
//     description: "Join our team to build scalable web applications using modern technologies like React and Node.js",
//     field: "Software Development"
//   },
//   {
//     id: "2",
//     title: "Data Scientist",
//     description: "Work on machine learning models and data analysis to drive business insights",
//     field: "Data Science"
//   },
//   {
//     id: "3",
//     title: "Product Manager",
//     description: "Lead product development initiatives and work closely with engineering teams",
//     field: "Product Management"
//   },
//   {
//     id: "4",
//     title: "UX Designer",
//     description: "Create beautiful and intuitive user interfaces for our digital products",
//     field: "Design"
//   },
//   {
//     id: "5",
//     title: "Business Analyst",
//     description: "Analyze business processes and data to support strategic decision-making",
//     field: "Business Analysis"
//   },
//   {
//     id: "6",
//     title: "Sales Manager",
//     description: "Drive sales growth and manage client relationships to achieve business objectives",
//     field: "Sales"
//   },
//   {
//     id: "7",
//     title: "Marketing Manager",
//     description: "Develop and implement marketing strategies to increase brand awareness and customer engagement",
//     field: "Marketing"
//   },
//   {
//     id: "8",
//     title: "HR Manager",
//     description: "Manage human resource functions and ensure effective workforce planning and development",
//     field: "Human Resources"
//   }
// ];

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobCard[]>([]);

  useEffect(() => {
    fetch("/api/jobs")
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
      .then((data) => setJobs(data))
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []);

  if (jobs.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader fullScreen />
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight">Your Active Screen Jobs</h1>
          <Button className="bg-blue-600 hover:bg-blue-700 transition">Create ScreenJob</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <Link href={`/create/jobs/${job.id}`} key={job.id}>
              <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer">
                <div className="p-5">
                  <span className="inline-block bg-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide text-blue-100 mb-2">
                    {job.field}
                  </span>
                  <h2 className="text-xl font-semibold mb-2 text-white">{job.title}</h2>
                  <p className="text-sm text-gray-300 line-clamp-3">{job.description}</p>
=======
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
     
        <h1 className="text-3xl font-bold mb-8 ">Existing Screen Jobs</h1>
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <Link href={`/create/jobs/${job.id}`} key={job.id}>
              <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden hover:bg-gray-800 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="p-6">
                  <div className="text-sm font-medium text-blue-600 mb-2">{job.field}</div>
                  <h2 className="text-xl font-semibold text-white mb-3">{job.title}</h2>
                  <p className="text-gray-600">{job.description}</p>
>>>>>>> 1901da6 (feat: add moment.js for date handling and enhance scheduling UI)
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
