import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
  
  export function AppSidebar() {
    return (



      <Sidebar >
        <div className="p-8 space-y-12">


        <SidebarHeader  className="flex flex-col items-cente border-b border-gray-200">
            <h1 className="text-2xl font-bold">ScoutX</h1>
            <p className="text-sm text-gray-500">Automated First Round of Screening for Recruiters</p>
        </SidebarHeader>
        <SidebarContent>

      
        </SidebarContent>
        <SidebarFooter >
        <SidebarGroup className="space-y-4  pt-4"> 
      
      <ul className="space-y-4">
          <li>
<a href="/dashboard" className="text-gray-700 hover:text-blue-500">Dashboard</a>

          </li>
          <li>
<a href="/" className="text-gray-700 hover:text-blue-500">Home</a>
          </li>
  
        <li>
          <a href="/create/resume-analyzer" className="text-gray-700 hover:text-blue-500">Resume Analyzer</a>
        </li>
        <li>
          <a href="/create/jobs" className="text-gray-700 hover:text-blue-500">Job Postings</a>
        </li>
        <li>
          <a href="/create/jobs/1/candidate" className="text-gray-700 hover:text-blue-500">Candidates</a>
        </li>
        <li>
          <a href="/create/schedule" className="text-gray-700 hover:text-blue-500">Schedule</a>
        </li>
        <li>
          <a href="/create/settings" className="text-gray-700 hover:text-blue-500">Settings</a>
        </li>
      </ul>
      </SidebarGroup>

            </SidebarFooter>
        </div>
      </Sidebar>

    )
  }
  