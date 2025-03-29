import Image from "next/image";
import Link from "next/link";

interface JobCard {
  id: string;
  title: string;
  description: string;
  field: string;
}

const sampleJobs: JobCard[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    description: "Join our team to build scalable web applications using modern technologies like React and Node.js",
    field: "Software Development"
  },
  {
    id: "2",
    title: "Data Scientist",
    description: "Work on machine learning models and data analysis to drive business insights",
    field: "Data Science"
  },
  {
    id: "3",
    title: "Product Manager",
    description: "Lead product development initiatives and work closely with engineering teams",
    field: "Product Management"
  },
  {
    id: "4",
    title: "UX Designer",
    description: "Create beautiful and intuitive user interfaces for our digital products",
    field: "Design"
  },
  {
    id: "5",
    title: "Business Analyst",
    description: "Analyze business processes and data to support strategic decision-making",
    field: "Business Analysis"
  },
  {
    id: "6",
    title: "Sales Manager",
    description: "Drive sales growth and manage client relationships to achieve business objectives",
    field: "Sales"
  },
  {
    id: "7",
    title: "Marketing Manager",
    description: "Develop and implement marketing strategies to increase brand awareness and customer engagement",
    field: "Marketing"
  },
  {
    id: "8",
    title: "HR Manager",
    description: "Manage human resource functions and ensure effective workforce planning and development",
    field: "Human Resources"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Jobs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleJobs.map((job) => (
            <Link href={`/create/jobs/${job.id}`} key={job.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="p-6">
                  <div className="text-sm font-medium text-blue-600 mb-2">{job.field}</div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">{job.title}</h2>
                  <p className="text-gray-600">{job.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
