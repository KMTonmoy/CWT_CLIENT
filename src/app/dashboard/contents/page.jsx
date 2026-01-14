"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  UploadCloud, Trash2, FileVideo, FileAudio, FileText, Image, File, Eye, Download, Copy, Check,
  ExternalLink, FolderOpen, Layers, Search, Plus, X, Calendar, BarChart3, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ContentManagement = () => {
  const [milestones, setMilestones] = useState([]);
  const [modules, setModules] = useState([]);
  const [contents, setContents] = useState([]);
  const [filteredContents, setFilteredContents] = useState([]);
  const [milestoneId, setMilestoneId] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("video");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [copiedUrl, setCopiedUrl] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(true);
  const [filePreview, setFilePreview] = useState(null);
  const [cloudinaryUploading, setCloudinaryUploading] = useState(false);

  // Cloudinary Configuration (from your .env)
  const cloudName = "dgwknm4yi"; // Your cloud name
  const uploadPreset = "cwt_profile_preset"; // Your upload preset

  useEffect(() => {
    axios.get("https://cwt-server.vercel.app/api/milestones").then(res => setMilestones(res.data)).catch(() => toast.error("Failed to load milestones"));
  }, []);

  useEffect(() => {
    if (!milestoneId) { setModules([]); return; }
    axios.get(`https://cwt-server.vercel.app/api/modules/milestone/${milestoneId}`)
      .then(res => { setModules(res.data); setSelectedMilestone(milestones.find(m => m._id === milestoneId)); })
      .catch(() => toast.error("Failed to load modules"));
  }, [milestoneId, milestones]);

  useEffect(() => {
    if (!moduleId) { setContents([]); setFilteredContents([]); return; }
    axios.get(`https://cwt-server.vercel.app/api/content/module/${moduleId}`)
      .then(res => { setContents(res.data); setFilteredContents(res.data); setSelectedModule(modules.find(m => m._id === moduleId)); toast.success(`Loaded ${res.data.length} content items`); })
      .catch(() => toast.error("Failed to load contents"));
  }, [moduleId, modules]);

  useEffect(() => {
    let filtered = contents;
    if (searchTerm) filtered = filtered.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    if (filterType !== "all") filtered = filtered.filter(item => item.type === filterType);
    setFilteredContents(filtered);
  }, [searchTerm, filterType, contents]);

  const resetForm = () => { 
    setTitle(""); 
    setType("video"); 
    setFile(null); 
    setFileName(""); 
    setFilePreview(null); 
    setUploadProgress(0); 
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    setFile(selectedFile); 
    setFileName(selectedFile.name);
    
    // Auto-detect type from file extension
    const ext = selectedFile.name.split('.').pop().toLowerCase();
    if (['mp4', 'mov', 'avi', 'mkv', 'webm'].includes(ext)) {
      setType("video");
    } else if (['mp3', 'wav', 'ogg', 'm4a'].includes(ext)) {
      setType("audio");
    } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
      setType("image");
    } else if (ext === 'pdf') {
      setType("pdf");
    }
    
    // Preview for images
    if (selectedFile.type.startsWith('image/')) { 
      const reader = new FileReader(); 
      reader.onload = (e) => setFilePreview(e.target.result); 
      reader.readAsDataURL(selectedFile); 
    } else {
      setFilePreview(null);
    }
  };

  // 1. Upload to Cloudinary directly
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'cwt-content');
    formData.append('cloud_name', cloudName);

    // Set resource type based on file type
    if (file.type.startsWith('video')) {
      formData.append('resource_type', 'video');
    } else if (file.type.startsWith('audio')) {
      formData.append('resource_type', 'video'); // Cloudinary treats audio as video
    } else if (file.type.includes('pdf')) {
      formData.append('resource_type', 'raw');
    } else {
      formData.append('resource_type', 'auto');
    }

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: 'POST',
        body: formData,
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || "Cloudinary upload failed");
      }
      
      return data;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  };

  // 2. Save Cloudinary URL to your backend
  const saveToBackend = async (cloudinaryData) => {
    const response = await axios.post("https://cwt-server.vercel.app/api/content/upload", {
      title: title || cloudinaryData.original_filename || file.name.split('.')[0],
      type: type,
      url: cloudinaryData.secure_url,
      publicId: cloudinaryData.public_id,
      moduleId: moduleId,
      fileSize: cloudinaryData.bytes || file.size,
      duration: cloudinaryData.duration || 0,
      format: cloudinaryData.format || file.name.split('.').pop(),
      width: cloudinaryData.width || 0,
      height: cloudinaryData.height || 0,
    });
    
    return response.data;
  };

  // 3. Main upload handler
  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    if (!moduleId) {
      toast.error("Please select a module");
      return;
    }

    setLoading(true);
    setCloudinaryUploading(true);
    setUploadProgress(0);

    try {
      // Step 1: Upload to Cloudinary
      toast.info("Uploading to Cloudinary...");
      const cloudinaryData = await uploadToCloudinary(file);
      
      // Step 2: Save URL to backend
      setUploadProgress(90);
      toast.info("Saving to database...");
      await saveToBackend(cloudinaryData);
      
      // Step 3: Refresh content list
      setUploadProgress(100);
      const res = await axios.get(`https://cwt-server.vercel.app/api/content/module/${moduleId}`);
      setContents(res.data);
      
      toast.success("Content uploaded and saved successfully!");
      
      // Reset form
      setTimeout(() => {
        resetForm();
        setShowUploadForm(false);
        setTimeout(() => setShowUploadForm(true), 300);
      }, 1000);
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Upload failed: " + (error.response?.data?.message || error.message || "Unknown error"));
    } finally {
      setLoading(false);
      setCloudinaryUploading(false);
      setTimeout(() => setUploadProgress(0), 2000);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this content?")) return;
    try { 
      await axios.delete(`https://cwt-server.vercel.app/api/content/${id}`); 
      toast.success("Content deleted successfully"); 
      const res = await axios.get(`https://cwt-server.vercel.app/api/content/module/${moduleId}`); 
      setContents(res.data); 
    } catch { 
      toast.error("Failed to delete content"); 
    }
  };

  const copyToClipboard = (url) => { 
    navigator.clipboard.writeText(url); 
    setCopiedUrl(url); 
    toast.success("URL copied to clipboard!"); 
    setTimeout(() => setCopiedUrl(""), 2000); 
  };

  const getIcon = (type) => {
    const iconClass = "w-5 h-5";
    switch (type) { 
      case "video": return <FileVideo className={`${iconClass} text-red-500`} />; 
      case "audio": return <FileAudio className={`${iconClass} text-green-500`} />; 
      case "image": return <Image className={`${iconClass} text-purple-500`} />; 
      case "pdf": return <FileText className={`${iconClass} text-red-400`} />; 
      default: return <File className={`${iconClass} text-blue-500`} />; 
    }
  };

  const getFileType = (mimeType) => { 
    if (mimeType === 'video') return 'video'; 
    if (mimeType === 'audio') return 'audio'; 
    if (mimeType === 'image') return 'image'; 
    if (mimeType === 'pdf') return 'pdf'; 
    return 'file'; 
  };

  const formatFileSize = (bytes) => { 
    if (!bytes || bytes === 0) return '0 Bytes'; 
    const k = 1024; 
    const sizes = ['Bytes', 'KB', 'MB', 'GB']; 
    const i = Math.floor(Math.log(bytes) / Math.log(k)); 
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]; 
  };

  const stats = { 
    total: contents.length, 
    videos: contents.filter(c => c.type === 'video').length, 
    images: contents.filter(c => c.type === 'image').length, 
    audios: contents.filter(c => c.type === 'audio').length, 
    pdfs: contents.filter(c => c.type === 'pdf').length 
  };

  return (
    <div className="min-h-screen bg-[#0B1221] p-4 md:p-8 text-white">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-7xl mx-auto text-white">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Layers className="text-blue-500" size={28} /> Content Management
              </h1>
              <p className="mt-2 text-gray-300">Upload and manage learning resources</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-4 py-2 bg-gray-800 rounded-xl">
                <span className="text-sm text-gray-400">Total Content:</span>
                <span className="ml-2 font-semibold">{stats.total}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><FolderOpen size={20} className="text-blue-500" />Select Learning Path</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Milestone</label>
              <select value={milestoneId} onChange={e => { setMilestoneId(e.target.value); setModuleId(""); setContents([]); }} className="w-full px-4 py-3 border border-gray-600 rounded-xl bg-gray-900 text-white focus:ring-2 focus:ring-blue-500">
                <option value="">Select Milestone</option>
                {milestones.map(m => <option key={m._id} value={m._id}>{m.title}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Module</label>
              <select value={moduleId} onChange={e => setModuleId(e.target.value)} disabled={!milestoneId} className="w-full px-4 py-3 border border-gray-600 rounded-xl bg-gray-900 text-white disabled:opacity-50 focus:ring-2 focus:ring-blue-500">
                <option value="">Select Module</option>
                {modules.map(m => <option key={m._id} value={m._id}>{m.title}</option>)}
              </select>
            </div>
          </div>
          {selectedMilestone && selectedModule && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 p-4 bg-blue-900 rounded-xl border border-blue-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-300">Selected: <span className="font-semibold">{selectedMilestone.title}</span> → <span className="font-semibold">{selectedModule.title}</span></p>
                  <p className="text-xs text-blue-400 mt-1">{contents.length} content items available</p>
                </div>
                <button onClick={() => setShowUploadForm(!showUploadForm)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {showUploadForm ? <X size={16} /> : <Plus size={16} />}
                  {showUploadForm ? "Hide Upload" : "Upload Content"}
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        <AnimatePresence>
          {showUploadForm && moduleId && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <UploadCloud size={20} className="text-green-500" />
                Upload New Content (Direct to Cloudinary)
              </h2>
              <form onSubmit={handleUpload} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input 
                      value={title} 
                      onChange={e => setTitle(e.target.value)} 
                      placeholder="Enter content title" 
                      className="w-full px-4 py-3 border border-gray-600 rounded-xl bg-gray-900 text-white focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Content Type</label>
                    <select 
                      value={type} 
                      onChange={e => setType(e.target.value)} 
                      className="w-full px-4 py-3 border border-gray-600 rounded-xl bg-gray-900 text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="video">Video</option>
                      <option value="audio">Audio</option>
                      <option value="image">Image</option>
                      <option value="pdf">PDF Document</option>
                    </select>
                  </div>
                </div>

                <div className="border-2 border-dashed border-gray-600 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors">
                  <input 
                    type="file" 
                    id="file-upload" 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="video/*,audio/*,image/*,.pdf,.doc,.docx"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer block">
                    <div className="mx-auto w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-4">
                      <UploadCloud size={24} className="text-gray-400" />
                    </div>
                    <p className="text-white font-medium">{fileName || "Click to upload or drag and drop"}</p>
                    <p className="text-gray-400 mt-2 text-sm">Max file size: 1GB (Uploads directly to Cloudinary)</p>
                    {file && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-green-500 mt-2 font-medium">
                        ✓ {fileName} ({formatFileSize(file.size)}) selected
                      </motion.p>
                    )}
                  </label>
                  {filePreview && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-4">
                      <img src={filePreview} alt="Preview" className="mx-auto max-h-48 rounded-lg shadow" />
                    </motion.div>
                  )}
                </div>

                {uploadProgress > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        {cloudinaryUploading ? "Uploading to Cloudinary..." : "Saving to database..."}
                      </span>
                      <span className="font-medium">{uploadProgress}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full" 
                        initial={{ width: 0 }} 
                        animate={{ width: `${uploadProgress}%` }} 
                        transition={{ duration: 0.3 }} 
                      />
                    </div>
                  </motion.div>
                )}

                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    disabled={loading || !file} 
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        {cloudinaryUploading ? "Uploading..." : "Saving..."}
                      </>
                    ) : (
                      <>
                        <UploadCloud size={18} />
                        Upload to Cloudinary
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {moduleId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="text-lg font-semibold">{`Content Library (${filteredContents.length})`}</h3>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search content..." 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                    className="pl-10 pr-4 py-2 border border-gray-600 rounded-xl bg-gray-900 text-white focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <select 
                  value={filterType} 
                  onChange={e => setFilterType(e.target.value)} 
                  className="px-4 py-2 border border-gray-600 rounded-xl bg-gray-900 text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="video">Video</option>
                  <option value="audio">Audio</option>
                  <option value="image">Image</option>
                  <option value="pdf">PDF</option>
                </select>
              </div>
            </div>

            <div className="divide-y divide-gray-700">
              {filteredContents.length === 0 ? (
                <div className="p-12 text-center">
                  <File className="mx-auto text-gray-500" size={48} />
                  <p className="text-gray-400 mt-4">{contents.length === 0 ? "No content uploaded yet" : "No matching content found"}</p>
                  <p className="text-sm text-gray-500 mt-2">Upload your first content using the form above</p>
                </div>
              ) : (
                <AnimatePresence>
                  {filteredContents.map((item, index) => (
                    <motion.div 
                      key={item._id} 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -20 }} 
                      transition={{ delay: index * 0.05 }} 
                      className="p-6 hover:bg-gray-700/30 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="p-3 rounded-xl bg-gray-700">
                            {getIcon(item.type)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.title}</h4>
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                              <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-lg text-xs font-medium">
                                {item.type}
                              </span>
                              {item.fileSize > 0 && (
                                <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-lg text-xs">
                                  {formatFileSize(item.fileSize)}
                                </span>
                              )}
                              <div className="flex items-center gap-1 text-sm text-gray-400">
                                <Calendar size={14} />
                                {new Date(item.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="mt-3 flex items-center gap-3">
                              <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-500">
                                <ExternalLink size={14} />
                                View Content
                              </a>
                              <button 
                                onClick={() => copyToClipboard(item.url)} 
                                className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-200"
                              >
                                {copiedUrl === item.url ? (
                                  <>
                                    <Check size={14} className="text-green-500" />
                                    <span className="text-green-500">Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy size={14} />
                                    Copy URL
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => window.open(item.url, '_blank')} 
                            className="p-2 text-blue-400 hover:bg-blue-900 rounded-lg transition-colors" 
                            title="Preview"
                          >
                            <Eye size={18} />
                          </button>
                          <a 
                            href={item.url} 
                            download 
                            className="p-2 text-green-400 hover:bg-green-900 rounded-lg transition-colors" 
                            title="Download"
                          >
                            <Download size={18} />
                          </a>
                          <button 
                            onClick={() => handleDelete(item._id)} 
                            className="p-2 text-red-400 hover:bg-red-900 rounded-lg transition-colors" 
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        )}

        {!moduleId && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-12 text-center">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-900 to-blue-800 rounded-full flex items-center justify-center mb-6">
              <FolderOpen size={32} className="text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Select a Learning Path</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Choose a milestone and module from the dropdowns above to start managing content
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <BarChart3 size={16} />
              <span>{milestones.length} milestones available</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ContentManagement;