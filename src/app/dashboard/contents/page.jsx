"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  UploadCloud, Trash2, FileVideo, FileAudio, FileText, Image, File, Eye, Download, Copy, Check,
  ExternalLink, FolderOpen, Layers, Search, Plus, X, Calendar, BarChart3
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

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } } };

  useEffect(() => {
    axios.get("http://localhost:5000/api/milestones").then(res => setMilestones(res.data)).catch(() => toast.error("Failed to load milestones"));
  }, []);

  useEffect(() => {
    if (!milestoneId) { setModules([]); return; }
    axios.get(`http://localhost:5000/api/modules/milestone/${milestoneId}`)
      .then(res => { setModules(res.data); setSelectedMilestone(milestones.find(m => m._id === milestoneId)); })
      .catch(() => toast.error("Failed to load modules"));
  }, [milestoneId, milestones]);

  useEffect(() => {
    if (!moduleId) { setContents([]); setFilteredContents([]); return; }
    axios.get(`http://localhost:5000/api/content/module/${moduleId}`)
      .then(res => { setContents(res.data); setFilteredContents(res.data); setSelectedModule(modules.find(m => m._id === moduleId)); toast.success(`Loaded ${res.data.length} content items`); })
      .catch(() => toast.error("Failed to load contents"));
  }, [moduleId, modules]);

  useEffect(() => {
    let filtered = contents;
    if (searchTerm) filtered = filtered.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    if (filterType !== "all") filtered = filtered.filter(item => item.type === filterType);
    setFilteredContents(filtered);
  }, [searchTerm, filterType, contents]);

  const resetForm = () => { setTitle(""); setType("video"); setFile(null); setFileName(""); setFilePreview(null); setUploadProgress(0); };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile); setFileName(selectedFile.name);
    if (selectedFile.type.startsWith('image/')) { const reader = new FileReader(); reader.onload = (e) => setFilePreview(e.target.result); reader.readAsDataURL(selectedFile); } else setFilePreview(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !moduleId) { toast.error("Please select a module and file"); return; }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title || file.name.split('.')[0]);
    formData.append("type", type);
    formData.append("moduleId", moduleId);
    setLoading(true); setUploadProgress(10);
    try {
      const progressInterval = setInterval(() => { setUploadProgress(prev => { if (prev >= 90) { clearInterval(progressInterval); return prev; } return prev + 10; }); }, 200);
      await axios.post("http://localhost:5000/api/content/upload", formData, { onUploadProgress: (progressEvent) => setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total)) });
      clearInterval(progressInterval);
      setUploadProgress(100);
      toast.success("Content uploaded successfully!");
      const res = await axios.get(`http://localhost:5000/api/content/module/${moduleId}`);
      setContents(res.data);
      setTimeout(() => { resetForm(); setShowUploadForm(false); setTimeout(() => setShowUploadForm(true), 300); }, 1000);
    } catch (error) { toast.error("Upload failed: " + (error.response?.data?.message || error.message)); }
    finally { setLoading(false); setTimeout(() => setUploadProgress(0), 2000); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this content?")) return;
    try { await axios.delete(`http://localhost:5000/api/content/${id}`); toast.success("Content deleted successfully"); const res = await axios.get(`http://localhost:5000/api/content/module/${moduleId}`); setContents(res.data); }
    catch { toast.error("Failed to delete content"); }
  };

  const copyToClipboard = (url) => { navigator.clipboard.writeText(url); setCopiedUrl(url); toast.success("URL copied to clipboard!"); setTimeout(() => setCopiedUrl(""), 2000); };

  const getIcon = (type) => {
    const iconClass = "w-5 h-5";
    switch (type) { case "video": return <FileVideo className={`${iconClass} text-red-500`} />; case "audio": return <FileAudio className={`${iconClass} text-green-500`} />; case "image": return <Image className={`${iconClass} text-purple-500`} />; case "application/pdf": return <FileText className={`${iconClass} text-red-400`} />; default: return <File className={`${iconClass} text-blue-500`} />; }
  };

  const getFileType = (mimeType) => { if (mimeType.startsWith('video/')) return 'video'; if (mimeType.startsWith('audio/')) return 'audio'; if (mimeType.startsWith('image/')) return 'image'; if (mimeType === 'application/pdf') return 'pdf'; return 'file'; };
  const formatFileSize = (bytes) => { if (bytes === 0) return '0 Bytes'; const k = 1024; const sizes = ['Bytes', 'KB', 'MB', 'GB']; const i = Math.floor(Math.log(bytes) / Math.log(k)); return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]; };
  const stats = { total: contents.length, videos: contents.filter(c => getFileType(c.type) === 'video').length, images: contents.filter(c => getFileType(c.type) === 'image').length, audios: contents.filter(c => getFileType(c.type) === 'audio').length, others: contents.filter(c => !['video', 'image', 'audio'].includes(getFileType(c.type))).length };

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
                <button onClick={() => setShowUploadForm(!showUploadForm)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">{showUploadForm ? <X size={16} /> : <Plus size={16} />}{showUploadForm ? "Hide Upload" : "Upload Content"}</button>
              </div>
            </motion.div>
          )}
        </motion.div>

        <AnimatePresence>
          {showUploadForm && moduleId && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><UploadCloud size={20} className="text-green-500" />Upload New Content</h2>
              <form onSubmit={handleUpload} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter content title" className="w-full px-4 py-3 border border-gray-600 rounded-xl bg-gray-900 text-white focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Content Type</label>
                    <select value={type} onChange={e => setType(e.target.value)} className="w-full px-4 py-3 border border-gray-600 rounded-xl bg-gray-900 text-white focus:ring-2 focus:ring-blue-500">
                      <option value="video">Video</option>
                      <option value="audio">Audio</option>
                      <option value="image">Image</option>
                      <option value="pdf">PDF Document</option>
                      <option value="document">Other Document</option>
                    </select>
                  </div>
                </div>

                <div className="border-2 border-dashed border-gray-600 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors">
                  <input type="file" id="file-upload" onChange={handleFileChange} className="hidden" />
                  <label htmlFor="file-upload" className="cursor-pointer block">
                    <div className="mx-auto w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-4">
                      <UploadCloud size={24} className="text-gray-400" />
                    </div>
                    <p className="text-white font-medium">{fileName || "Click to upload or drag and drop"}</p>
                    <p className="text-gray-400 mt-2 text-sm">Max file size: 1GB</p>
                    {file && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-green-500 mt-2 font-medium">✓ {fileName} selected</motion.p>}
                  </label>
                  {filePreview && <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-4"><img src={filePreview} alt="Preview" className="mx-auto max-h-48 rounded-lg shadow" /></motion.div>}
                </div>

                {uploadProgress > 0 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-gray-400">Uploading...</span><span className="font-medium">{uploadProgress}%</span></div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-green-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${uploadProgress}%` }} transition={{ duration: 0.3 }} />
                  </div>
                </motion.div>}

                <div className="flex justify-end">
                  <button type="submit" disabled={loading || !file} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl">
                    <UploadCloud size={18} />{loading ? "Uploading..." : "Upload Content"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {moduleId && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-lg font-semibold">{`Content Library (${filteredContents.length})`}</h3>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" placeholder="Search content..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-600 rounded-xl bg-gray-900 text-white focus:ring-2 focus:ring-blue-500" />
              </div>
              <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-4 py-2 border border-gray-600 rounded-xl bg-gray-900 text-white focus:ring-2 focus:ring-blue-500">
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
                  <motion.div key={item._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: index * 0.05 }} className="p-6 hover:bg-gray-700/30 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 rounded-xl bg-gray-700">{getIcon(item.type)}</div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.title}</h4>
                          <div className="flex flex-wrap items-center gap-3 mt-2">
                            <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-lg text-xs font-medium">{getFileType(item.type)}</span>
                            <div className="flex items-center gap-1 text-sm text-gray-400"><Calendar size={14} />{new Date(item.createdAt).toLocaleDateString()}</div>
                          </div>
                          <div className="mt-3 flex items-center gap-3">
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-500"><ExternalLink size={14} />View Content</a>
                            <button onClick={() => copyToClipboard(item.url)} className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-200">{copiedUrl === item.url ? <><Check size={14} className="text-green-500" /><span className="text-green-500">Copied!</span></> : <><Copy size={14} />Copy URL</>}</button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => window.open(item.url, '_blank')} className="p-2 text-blue-400 hover:bg-blue-900 rounded-lg transition-colors" title="Preview"><Eye size={18} /></button>
                        <a href={item.url} download className="p-2 text-green-400 hover:bg-green-900 rounded-lg transition-colors" title="Download"><Download size={18} /></a>
                        <button onClick={() => handleDelete(item._id)} className="p-2 text-red-400 hover:bg-red-900 rounded-lg transition-colors" title="Delete"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>}

        {!moduleId && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-12 text-center">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-900 to-blue-800 rounded-full flex items-center justify-center mb-6"><FolderOpen size={32} className="text-blue-400" /></div>
            <h3 className="text-xl font-semibold mb-2">Select a Learning Path</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">Choose a milestone and module from the dropdowns above to start managing content</p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400"><BarChart3 size={16} /><span>{milestones.length} milestones available</span></div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ContentManagement;
