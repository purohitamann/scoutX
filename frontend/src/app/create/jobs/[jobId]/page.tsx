'use client';

// import { notFound } from 'next/navigation';
// import JobChart from '../components/JobChart';

// interface JobCard {
//   id: string;
//   title: string;
//   description: string;
//   field: string;
// }

// interface Applicant {
//   name: string;
//   score: number;
//   experience: string;
//   skills: string[];
// }

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

// const sampleApplicants: Applicant[] = [
//   {
//     name: "John Doe",
//     score: 92,
//     experience: "5 years",
//     skills: ["React", "Node.js", "TypeScript"]
//   },
//   {
//     name: "Jane Smith",
//     score: 88,
//     experience: "4 years",
//     skills: ["Python", "Machine Learning", "Data Analysis"]
//   },
//   {
//     name: "Mike Johnson",
//     score: 85,
//     experience: "3 years",
//     skills: ["UI/UX", "Figma", "Adobe XD"]
//   }
// ];

// export default function JobDetails({ params }: { params: { jobId: string } }) {
//   const job = sampleJobs.find(j => j.id === params.jobId);
  
//   if (!job) {
//     notFound();
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
//           <div className="text-sm text-blue-600 mb-4">{job.field}</div>
//           <p className="text-gray-600 mb-6">
//             {job.description}
//           </p>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <div className="text-sm text-gray-500">Total Applicants</div>
//               <div className="text-2xl font-bold text-gray-900">50</div>
//             </div>
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <div className="text-sm text-gray-500">Average Score</div>
//               <div className="text-2xl font-bold text-gray-900">88.3</div>
//             </div>
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <div className="text-sm text-gray-500">Days Posted</div>
//               <div className="text-2xl font-bold text-gray-900">180</div>
//             </div>
//           </div>

//           <JobChart />

//           <div>
//             <h2 className="text-xl font-semibold mb-4">Top Applicants</h2>
//             <div className="space-y-4">
//               {sampleApplicants.map((applicant, index) => (
//                 <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-semibold">{applicant.name}</h3>
//                       <p className="text-sm text-gray-500">{applicant.experience} experience</p>
//                     </div>
//                     <div className="text-lg font-bold text-blue-600">{applicant.score}%</div>
//                   </div>
//                   <div className="mt-2 flex flex-wrap gap-2">
//                     {applicant.skills.map((skill, skillIndex) => (
//                       <span key={skillIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// } 
import { use } from 'react';
import JobDetails from "@/components/JobDetails";

export default function JobPostingPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);
  
  return (
    <div className="container mx-auto p-4">

      <JobDetails jobId={jobId} />
    </div>
  );
}
