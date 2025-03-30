import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Home,
  Briefcase,
  Settings,
  FileText,
  Users,
  Calendar,
  LayoutDashboard,
} from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar className="bg-gradient-to-b from-gray-900 to-black w-64 min-h-screen shadow-xl border-r border-gray-800">
      <div className="p-6 flex flex-col h-full justify-between">
        <SidebarHeader className="text-center border-b border-gray-700 pb-4">
          <h1 className="text-3xl font-extrabold text-blue-400">VoiceHire</h1>
          <p className="text-xs text-gray-500">AI-Powered Recruiting Automation</p>
        </SidebarHeader>

        <SidebarContent className="mt-8 flex-1">
          <SidebarGroup className="space-y-2">
            <a href="/" className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-gray-800 hover:text-blue-400">
              <Home className="w-5 h-5 text-blue-400" /> Home
            </a>
            {/* <a href="/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-gray-800 hover:text-blue-400">
              <LayoutDashboard className="w-5 h-5 text-blue-400" /> Dashboard
            </a> */}
            {/* <a href="/create/resume-analyzer" className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-gray-800 hover:text-blue-400">
              <FileText className="w-5 h-5 text-blue-400" /> Resume Analyzer
            </a> */}
            <a href="/create/jobs" className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-gray-800 hover:text-blue-400">
              <Briefcase className="w-5 h-5 text-blue-400" /> Job Postings
            </a>
            <a href="/create/jobs/1/candidate" className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-gray-800 hover:text-blue-400">
              <Users className="w-5 h-5 text-blue-400" /> Candidates
            </a>
            <a href="/create/schedule" className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-gray-800 hover:text-blue-400">
              <Calendar className="w-5 h-5 text-blue-400" /> Schedule
            </a>
            <a href="/create/settings" className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-gray-800 hover:text-blue-400">
              <Settings className="w-5 h-5 text-blue-400" /> Settings
            </a>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="text-center border-t border-gray-700 pt-4">
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} ScoutX</p>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}