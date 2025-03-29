import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Home, Briefcase, Settings, FileText, Users, Calendar, LayoutDashboard } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar className="bg-gradient-to-b from-gray-900 to-black w-64 min-h-screen shadow-xl border-r border-gray-800">
      <div className="p-6 space-y-8">
        <SidebarHeader className="flex flex-col items-center text-center border-b border-gray-700 pb-4">
          <h1 className="text-3xl font-bold text-blue-400">ScoutX</h1>
          <p className="text-xs text-gray-500">AI-Powered Recruiting Automation</p>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup className="space-y-4">
            <ul className="space-y-2">
              <li>
                <a href="/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-gray-800 hover:text-blue-400">
                  <LayoutDashboard className="w-5 h-5 text-blue-400" /> Dashboard
                </a>
              </li>
              <li>
                <a href="/" className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-gray-800 hover:text-blue-400">
                  <Home className="w-5 h-5 text-blue-400" /> Home
                </a>
              </li>
              <li>
                <a href="/create/resume-analyzer" className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-gray-800 hover:text-blue-400">
                  <FileText className="w-5 h-5 text-blue-400" /> Resume Analyzer
                </a>
              </li>
              <li>
                <a href="/create/jobs" className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-gray-800 hover:text-blue-400">
                  <Briefcase className="w-5 h-5 text-blue-400" /> Job Postings
                </a>
              </li>
              <li>
                <a href="/create/jobs/1/candidate" className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-gray-800 hover:text-blue-400">
                  <Users className="w-5 h-5 text-blue-400" /> Candidates
                </a>
              </li>
              <li>
                <a href="/create/schedule" className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-gray-800 hover:text-blue-400">
                  <Calendar className="w-5 h-5 text-blue-400" /> Schedule
                </a>
              </li>
              <li>
                <a href="/create/settings" className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-gray-800 hover:text-blue-400">
                  <Settings className="w-5 h-5 text-blue-400" /> Settings
                </a>
              </li>
            </ul>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}