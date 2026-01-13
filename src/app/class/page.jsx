"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ErrorMessage from "@/components/UI/ErrorMessage";
import Sidebar from "@/components/Sidebar/Sidebar";
import MediaPlayer from "@/components/MediaPlayer/MediaPlayer";
import ContentList from "@/components/ContentList/ContentList";

export default function ClassroomPage() {
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

  const API_BASE_URL = "http://localhost:5000/api";

  // Fetch all milestones on mount
  useEffect(() => {
    fetchMilestones();
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1221] to-[#0A1A2F] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight">
              <span className="bg-gradient-to-r from-[#07A8ED] via-[#3B82F6] to-[#07A8ED] bg-clip-text text-transparent">
                Interactive Classroom
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Select milestone → module → content to play
            </p>
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