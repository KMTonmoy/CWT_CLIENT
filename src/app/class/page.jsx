"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ErrorMessage from "@/components/UI/ErrorMessage";
import Sidebar from "@/components/Sidebar/Sidebar";
import MediaPlayer from "@/components/MediaPlayer/MediaPlayer";
import ContentList from "@/components/ContentList/ContentList";
import { useUserData } from "@/hooks/useUserData";

export default function ClassroomPage() {
  const router = useRouter();
  const { userData, loading: userLoading } = useUserData();
  
  const [milestones, setMilestones] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [moduleContents, setModuleContents] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [moduleLoading, setModuleLoading] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedMilestone, setExpandedMilestone] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);
  const [showContentList, setShowContentList] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);

  const API_BASE_URL = "https://cwt-server.vercel.app/api";

  // Check if user has prostudent role
  useEffect(() => {
    if (!userLoading && userData) {
      const prostudentRoles = ["prostudent", "admin", "superadmin", "administrator", "super_admin", "Admin", "SuperAdmin", "ProStudent", "pro_student"];
      const isProStudent = prostudentRoles.includes(userData.role);
      
      if (!isProStudent) {
        setShowAccessModal(true);
      }
    }
  }, [userData, userLoading]);

  // Fetch all milestones on mount if authorized
  useEffect(() => {
    if (userData && !showAccessModal) {
      fetchMilestones();
    }
  }, [userData, showAccessModal]);

  const fetchMilestones = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`${API_BASE_URL}/milestones`);

      const milestonesData = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
      setMilestones(milestonesData);

      if (milestonesData.length > 0) {
        setExpandedMilestone(milestonesData[0]._id);
      }
    } catch (error) {
      console.error("Error fetching milestones:", error);
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const fetchModulesByMilestone = async (milestoneId) => {
    try {
      setModuleLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/modules/milestone/${milestoneId}`
      );

      const modulesData = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
      const sortedModules = modulesData.sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      );
      setModules(sortedModules);
    } catch (error) {
      console.error("Error fetching modules:", error);
      setError("Failed to load modules");
    } finally {
      setModuleLoading(false);
    }
  };

  const fetchContentsByModule = async (moduleId) => {
    try {
      setContentLoading(true);
      setError("");

      const response = await axios.get(
        `${API_BASE_URL}/content/module/${moduleId}`
      );

      const contents = response.data;

      if (!Array.isArray(contents)) {
        console.error("Expected array but got:", contents);
        setModuleContents([]);
        return;
      }

      const transformedContents = contents
        .map((content) => ({
          id: content._id,
          title: content.title || "Untitled",
          description: content.description || "",
          type: content.type || "video",
          duration: content.duration || 0,
          url: content.url || "",
          thumbnail: content.thumbnail || "",
          fileSize: content.fileSize || 0,
          fileType: content.fileType || "",
          isFree: content.isFree !== undefined ? content.isFree : true,
          views: content.views || 0,
          downloads: content.downloads || 0,
          order: content.order || 0,
          createdAt: content.createdAt || new Date().toISOString(),
          moduleId: content.moduleId,
          publicId: content.publicId,
        }))
        .sort((a, b) => a.order - b.order);

      setModuleContents(transformedContents);

      if (transformedContents.length > 0) {
        setTimeout(() => {
          handleContentSelect(transformedContents[0]);
        }, 100);
      } else {
        setSelectedContent(null);
        setError("No contents found for this module");
      }
    } catch (error) {
      console.error("Error fetching module contents:", error);
      setModuleContents([]);
      setSelectedContent(null);
      setError(`Failed to load contents: ${error.message}`);
    } finally {
      setContentLoading(false);
    }
  };

  const handleMilestoneClick = (milestoneId) => {
    setExpandedMilestone(
      expandedMilestone === milestoneId ? null : milestoneId
    );
    setExpandedModule(null);
    setModuleContents([]);
    setSelectedContent(null);
    setShowContentList(false);

    if (expandedMilestone !== milestoneId) {
      fetchModulesByMilestone(milestoneId);
    }
  };

  const handleModuleExpand = async (module) => {
    if (expandedModule === module._id) {
      setExpandedModule(null);
      setModuleContents([]);
      setSelectedContent(null);
      setShowContentList(false);
      return;
    }

    setExpandedModule(module._id);
    setSelectedModule(module);
    setSelectedContent(null);
    setShowContentList(true);

    await fetchContentsByModule(module._id);
  };

  const handleContentSelect = (content) => {
    setSelectedContent(content);
  };

  const handleSwitchAccount = () => {
    router.push("/login");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  // Show loading while checking user role
  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0B1221] to-[#0A1A2F] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#07A8ED] mx-auto mb-4"></div>
          <p className="text-white text-lg">Checking access permissions...</p>
        </div>
      </div>
    );
  }

  // If not prostudent, show access denied modal
  if (showAccessModal) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0B1221] to-[#0A1A2F] flex items-center justify-center p-4">
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl max-w-md w-full p-6">
          {/* Warning Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-red-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.73-.833-2.464 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-white text-center mb-2">
            Pro Student Access Required
          </h2>
          
          {/* Message */}
          <p className="text-gray-300 text-center mb-6 text-sm">
            {userData 
              ? `Your role (${userData.role || 'user'}) does not have access to the classroom.`
              : "You need to login as a Pro Student to access the classroom."
            }
            <br />
            <span className="text-blue-400 mt-1 block">
              Upgrade to Pro Student to access all premium content!
            </span>
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleSwitchAccount}
              className="w-full bg-gradient-to-r from-[#07A8ED] to-[#3B82F6] hover:opacity-90 text-white font-medium py-3 rounded-lg transition-all"
            >
              Switch Account
            </button>
            
            <button
              onClick={handleGoHome}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 rounded-lg transition-colors"
            >
              Go to Homepage
            </button>
          </div>

          {/* Contact Info */}
          <p className="text-xs text-gray-500 text-center mt-6">
            Contact support to upgrade to Pro Student
          </p>
        </div>
      </div>
    );
  }

  // If authorized, show classroom
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1221] to-[#0A1A2F] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header with User Info */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight">
                <span className="bg-gradient-to-r from-[#07A8ED] via-[#3B82F6] to-[#07A8ED] bg-clip-text text-transparent">
                  Interactive Classroom
                </span>
              </h1>
              <p className="text-xl text-gray-300">
                Welcome, {userData?.name || userData?.email || "Student"}!
              </p>
            </div>
            
            {/* User Badge */}
            <div className="flex items-center gap-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl px-4 py-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#07A8ED] to-[#1E3A8A] flex items-center justify-center font-bold text-white">
                {userData?.name?.[0] || userData?.email?.[0] || "S"}
              </div>
              <div>
                <p className="text-white font-medium text-sm">
                  {userData?.name || userData?.email || "Student"}
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                    {userData?.role || "Student"}
                  </span>
                  <span className="text-xs text-gray-400">• Pro Student</span>
                </div>
              </div>
            </div>
          </div>

          {error && <ErrorMessage message={error} />}

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column - Milestones & Modules */}
            <div className="lg:w-1/4">
              <Sidebar
                milestones={milestones}
                modules={modules}
                loading={loading}
                moduleLoading={moduleLoading}
                expandedMilestone={expandedMilestone}
                expandedModule={expandedModule}
                onMilestoneClick={handleMilestoneClick}
                onModuleExpand={handleModuleExpand}
              />
            </div>

            {/* Middle Column - Media Player */}
            <div className="lg:w-2/4">
              <MediaPlayer
                selectedContent={selectedContent}
                selectedModule={selectedModule}
                onContentSelect={handleContentSelect}
              />
            </div>

            {/* Right Column - Module Contents */}
            <div className="lg:w-1/4">
              {showContentList && expandedModule && (
                <ContentList
                  contents={moduleContents}
                  loading={contentLoading}
                  selectedContent={selectedContent}
                  onContentSelect={handleContentSelect}
                  selectedModule={selectedModule}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}