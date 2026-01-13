"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  ChevronDown,
  ChevronRight,
  Clock,
  Loader2,
  AlertCircle,
  FolderOpen,
   Maximize2,
  Eye,
  Grid,
  List as ListIcon,
  FileVideo,
  FileAudio,
  FileImage,
   
  FileText,
  Type,
} from "lucide-react";

export default function ClassroomPage() {
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const [milestones, setMilestones] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [moduleContents, setModuleContents] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [moduleLoading, setModuleLoading] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [expandedMilestone, setExpandedMilestone] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [showContentList, setShowContentList] = useState(false);

  const API_BASE_URL = "http://localhost:5000/api";

  // Fetch all milestones on mount
  useEffect(() => {
    fetchMilestones();
  }, []);

  // Fetch modules when milestone is expanded
  useEffect(() => {
    if (expandedMilestone) {
      fetchModulesByMilestone(expandedMilestone);
    }
  }, [expandedMilestone]);

  // Auto-play when content changes
  useEffect(() => {
    if (
      selectedContent &&
      (selectedContent.type === "video" || selectedContent.type === "audio")
    ) {
      const playMedia = () => {
        if (selectedContent.type === "video" && videoRef.current) {
          videoRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((err) => {
              console.log("Auto-play prevented:", err);
              // Don't show error to user
            });
        } else if (selectedContent.type === "audio" && audioRef.current) {
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((err) => {
              console.log("Auto-play prevented:", err);
            });
        }
      };

      const timeout = setTimeout(playMedia, 300);
      return () => clearTimeout(timeout);
    }
  }, [selectedContent]);

  const fetchMilestones = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`${API_BASE_URL}/milestones`);

      const milestonesData = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
      setMilestones(milestonesData);

      // Expand first milestone by default
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

      console.log("Fetching contents for module:", moduleId);

      const response = await axios.get(
        `${API_BASE_URL}/content/module/${moduleId}`
      );

      const contents = response.data;

      if (!Array.isArray(contents)) {
        console.error("Expected array but got:", contents);
        setModuleContents([]);
        return;
      }

      // Transform API data to our format
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

      // Auto-select first content
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

  const handleMilestoneClick = (milestone) => {
    setExpandedMilestone(
      expandedMilestone === milestone._id ? null : milestone._id
    );
    setExpandedModule(null);
    setModuleContents([]);
    setSelectedContent(null);
    setShowContentList(false);
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
    setCurrentTime(0);
    // Don't auto-play, let user click play button
  };

  // Media controls
  const togglePlay = () => {
    if (selectedContent?.type === "video" && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else if (selectedContent?.type === "audio" && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (selectedContent?.type === "video" && videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    } else if (selectedContent?.type === "audio" && audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    if (selectedContent?.type === "video" && videoRef.current) {
      videoRef.current.volume = newVolume;
    } else if (selectedContent?.type === "audio" && audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);

    if (selectedContent?.type === "video" && videoRef.current) {
      videoRef.current.currentTime = newTime;
    } else if (selectedContent?.type === "audio" && audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const downloadFile = () => {
    if (selectedContent?.url) {
      const link = document.createElement("a");
      link.href = selectedContent.url;
      link.download = selectedContent.title || "download";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getContentIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "video":
      case "mp4":
      case "mov":
      case "avi":
      case "mkv":
      case "webm":
        return <FileVideo className="w-5 h-5" />;
      case "audio":
      case "mp3":
      case "wav":
      case "m4a":
      case "ogg":
        return <FileAudio className="w-5 h-5" />;
      case "image":
      case "jpeg":
      case "jpg":
      case "png":
      case "gif":
      case "webp":
      case "svg":
        return <FileImage className="w-5 h-5" />;
      case "pdf":
        return <FilePdf className="w-5 h-5" />;
      case "document":
      case "doc":
      case "docx":
      case "txt":
      case "rtf":
        return <FileText className="w-5 h-5" />;
      default:
        return <Type className="w-5 h-5" />;
    }
  };

  const getContentColor = (type) => {
    switch (type?.toLowerCase()) {
      case "video":
      case "mp4":
      case "mov":
      case "avi":
      case "mkv":
      case "webm":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "audio":
      case "mp3":
      case "wav":
      case "m4a":
      case "ogg":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pdf":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "image":
      case "jpeg":
      case "jpg":
      case "png":
      case "gif":
      case "webp":
      case "svg":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "document":
      case "doc":
      case "docx":
      case "txt":
      case "rtf":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const renderMediaPlayer = () => {
    if (!selectedContent) return null;

    const isVideo = selectedContent.type === "video";
    const isAudio = selectedContent.type === "audio";
    const isImage = selectedContent.type === "image";
    const isPDF = selectedContent.type === "pdf";

    if (isVideo) {
      return (
        <div className="relative w-full bg-black rounded-xl overflow-hidden border border-gray-800">
          <video
            ref={videoRef}
            src={selectedContent.url}
            className="w-full h-full"
            onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.target.duration)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            controls={false}
            muted={isMuted}
            playsInline
          />
          {/* Play overlay for video */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <button
                onClick={togglePlay}
                className="p-4 bg-gradient-to-r from-[#07A8ED] to-[#3B82F6] text-white rounded-full hover:opacity-90 transition-all shadow-lg shadow-blue-500/25"
              >
                <Play className="w-10 h-10" fill="white" />
              </button>
            </div>
          )}
        </div>
      );
    }

    if (isAudio) {
      return (
        <div className="relative w-full bg-gradient-to-br from-emerald-900/80 to-teal-900/80 rounded-xl p-8 border border-emerald-800/50">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 text-emerald-400">🎵</div>
            <h3 className="text-2xl font-bold text-white">
              {selectedContent.title}
            </h3>
            <p className="text-emerald-300">Audio Lesson</p>
            <button
              onClick={togglePlay}
              className="mt-6 p-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full hover:opacity-90 transition-all"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" fill="white" />
              ) : (
                <Play className="w-8 h-8" fill="white" />
              )}
            </button>
          </div>
          <audio
            ref={audioRef}
            src={selectedContent.url}
            className="w-full"
            onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.target.duration)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            muted={isMuted}
          />
        </div>
      );
    }

    if (isPDF) {
      return (
        <div className="relative w-full h-full bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(
              selectedContent.url
            )}&embedded=true`}
            className="w-full h-full min-h-[400px]"
            frameBorder="0"
            title="PDF Viewer"
          />
        </div>
      );
    }

    if (isImage) {
      return (
        <div className="relative w-full h-full bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
          <img
            src={selectedContent.url}
            alt={selectedContent.title}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/600x400/1e293b/94a3b8?text=Image+Not+Available";
            }}
          />
        </div>
      );
    }

    // For other file types
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/80 to-indigo-900/80 rounded-xl border border-blue-800/50">
        <div className="text-center p-8">
          <div className="text-6xl mb-4 text-blue-400">📄</div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {selectedContent.title}
          </h3>
          <p className="text-blue-300 mb-6">
            {selectedContent.description || "Document"}
          </p>
          <a
            href={selectedContent.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            <Download size={20} />
            Download {selectedContent.type.toUpperCase()}
          </a>
        </div>
      </div>
    );
  };

  const calculateModuleDuration = () => {
    return moduleContents.reduce(
      (sum, content) => sum + (content.duration || 0),
      0
    );
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

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-3">
              <AlertCircle className="text-red-400" />
              <p className="text-red-300">{error}</p>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column - Milestones & Modules */}
            <div className="lg:w-1/4">
              <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl border border-gray-800 overflow-hidden">
                <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-[#07A8ED]/10 via-transparent to-[#1E3A8A]/10">
                  <h3 className="text-lg font-bold text-white">
                    Course Curriculum
                  </h3>
                </div>

                <div className="p-3 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-8 h-8 animate-spin text-[#07A8ED]" />
                    </div>
                  ) : milestones.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      No milestones available
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {milestones.map((milestone) => (
                        <div key={milestone._id} className="space-y-1">
                          {/* Milestone Button */}
                          <button
                            onClick={() => handleMilestoneClick(milestone)}
                            className="w-full p-3 text-left hover:bg-[#1E293B]/50 transition-colors rounded-lg flex items-center justify-between bg-[#1E293B]/30"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-[#07A8ED] to-[#1E3A8A] rounded-lg flex items-center justify-center font-bold text-sm">
                                {milestone.order || 1}
                              </div>
                              <div className="text-left">
                                <div className="font-medium text-white">
                                  {milestone.title}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {milestone.modulesCount || 0} modules
                                </div>
                              </div>
                            </div>
                            <ChevronDown
                              className={`text-gray-400 transition-transform ${
                                expandedMilestone === milestone._id
                                  ? "rotate-180 text-[#07A8ED]"
                                  : ""
                              }`}
                            />
                          </button>

                          {/* Modules under milestone */}
                          {expandedMilestone === milestone._id && (
                            <div className="ml-4 pl-4 border-l border-gray-700/50 space-y-1">
                              {moduleLoading ? (
                                <div className="flex justify-center py-2">
                                  <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                                </div>
                              ) : modules.length === 0 ? (
                                <div className="text-xs text-gray-500 py-2 text-center">
                                  No modules
                                </div>
                              ) : (
                                modules.map((module) => (
                                  <button
                                    key={module._id}
                                    onClick={() => handleModuleExpand(module)}
                                    className={`w-full p-2 text-left hover:bg-[#1E293B]/30 transition-colors rounded flex items-center justify-between ${
                                      expandedModule === module._id
                                        ? "bg-[#07A8ED]/10 border border-[#07A8ED]/20"
                                        : ""
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <FolderOpen className="w-4 h-4 text-gray-400" />
                                      <span className="text-sm text-gray-300">
                                        {module.title}
                                      </span>
                                    </div>
                                    <ChevronRight
                                      className={`w-3 h-3 text-gray-500 ${
                                        expandedModule === module._id
                                          ? "rotate-90 text-[#07A8ED]"
                                          : ""
                                      }`}
                                    />
                                  </button>
                                ))
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Middle Column - Media Player */}
            <div className="lg:w-2/4">
              <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl border border-gray-800 overflow-hidden">
                <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-[#07A8ED]/10 via-transparent to-[#1E3A8A]/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white truncate">
                        {selectedContent?.title ||
                          selectedModule?.title ||
                          "Select Content"}
                      </h2>
                      {selectedContent && (
                        <div
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mt-1 ${getContentColor(
                            selectedContent.type
                          )}`}
                        >
                          {getContentIcon(selectedContent.type)}
                          <span>{selectedContent.type?.toUpperCase()}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedContent?.url && (
                        <button
                          onClick={downloadFile}
                          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#07A8ED] to-[#3B82F6] text-white rounded-lg hover:opacity-90 transition-all text-sm"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      )}
                      <button
                        onClick={toggleFullscreen}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all"
                      >
                        <Maximize2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800">
                    {selectedContent ? (
                      renderMediaPlayer()
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center min-h-[400px] p-8">
                        <div className="text-8xl mb-4 text-gray-700 opacity-50">
                          🎬
                        </div>
                        <h3 className="text-2xl font-bold text-gray-600 mb-2">
                          Welcome to Classroom
                        </h3>
                        <p className="text-gray-500 text-center">
                          1. Select a milestone
                          <br />
                          2. Expand a module
                          <br />
                          3. Click any content to view
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Media Controls for Video/Audio */}
                  {selectedContent &&
                    (selectedContent.type === "video" ||
                      selectedContent.type === "audio") && (
                      <div className="mt-4 space-y-3">
                        <div className="w-full">
                          <div className="flex justify-between text-sm text-gray-400 mb-1">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max={duration || 100}
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#07A8ED]"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={togglePlay}
                              className="p-2.5 bg-gradient-to-r from-[#07A8ED] to-[#3B82F6] text-white rounded-full hover:opacity-90 transition-all"
                            >
                              {isPlaying ? (
                                <Pause className="w-5 h-5" />
                              ) : (
                                <Play className="w-5 h-5" />
                              )}
                            </button>

                            <button
                              onClick={toggleMute}
                              className="p-1.5 text-gray-400 hover:text-white transition-colors"
                            >
                              {isMuted ? (
                                <VolumeX className="w-5 h-5" />
                              ) : (
                                <Volume2 className="w-5 h-5" />
                              )}
                            </button>

                            <div className="flex items-center gap-2">
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-20 h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-400"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>

            {/* Right Column - Module Contents */}
            <div className="lg:w-1/4">
              {showContentList && expandedModule && (
                <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl border border-gray-800 overflow-hidden">
                  <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-[#07A8ED]/10 via-transparent to-[#1E3A8A]/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-white">
                          Module Contents
                        </h3>
                        <p className="text-xs text-gray-400">
                          {moduleContents.length} items •{" "}
                          {calculateModuleDuration()} min
                        </p>
                      </div>
                      <div className="flex border border-gray-700 rounded overflow-hidden">
                        <button
                          onClick={() => setViewMode("grid")}
                          className={`p-1.5 ${
                            viewMode === "grid"
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          <Grid className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setViewMode("list")}
                          className={`p-1.5 ${
                            viewMode === "list"
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          <ListIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 max-h-[calc(100vh-200px)] overflow-y-auto">
                    {contentLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-[#07A8ED]" />
                      </div>
                    ) : moduleContents.length === 0 ? (
                      <div className="text-center py-8 text-gray-400">
                        No contents in this module
                      </div>
                    ) : viewMode === "grid" ? (
                      <div className="grid grid-cols-1 gap-2">
                        {moduleContents.map((content) => (
                          <button
                            key={content.id}
                            onClick={() => handleContentSelect(content)}
                            className={`p-3 rounded-lg border text-left transition-all ${
                              selectedContent?.id === content.id
                                ? "border-[#07A8ED] bg-gradient-to-r from-[#07A8ED]/20 to-[#3B82F6]/20"
                                : "border-gray-800 hover:border-gray-700 hover:bg-gray-900/50"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`p-2 rounded ${getContentColor(
                                  content.type
                                )}`}
                              >
                                {getContentIcon(content.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-white text-sm truncate">
                                  {content.title}
                                </h4>
                                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                  <span>{content.duration || 0} min</span>
                                  <span>•</span>
                                  <Eye className="w-3 h-3" />
                                  <span>{content.views || 0}</span>
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {moduleContents.map((content) => (
                          <button
                            key={content.id}
                            onClick={() => handleContentSelect(content)}
                            className={`w-full p-3 rounded-lg border text-left transition-all ${
                              selectedContent?.id === content.id
                                ? "border-[#07A8ED] bg-gradient-to-r from-[#07A8ED]/20 to-[#3B82F6]/20"
                                : "border-gray-800 hover:border-gray-700 hover:bg-gray-900/50"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded ${getContentColor(
                                  content.type
                                )}`}
                              >
                                {getContentIcon(content.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-white text-sm truncate">
                                  {content.title}
                                </h4>
                                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{content.duration || 0} min</span>
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
