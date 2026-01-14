"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus, Pencil, Trash2, X, BookOpen, ChevronRight,
  Calendar, CheckCircle, Clock, AlertCircle
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MilestonesManagement = () => {
  const [milestones, setMilestones] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [order, setOrder] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMilestones = async () => {
    try {
      const res = await axios.get("https://cwt-server.vercel.app/api/milestones");
      setMilestones(res.data);
    } catch {
      toast.error("Failed to load milestones");
    }
  };

  useEffect(() => { fetchMilestones(); }, []);

  const resetForm = () => {
    setTitle(""); setDescription(""); setStatus("active"); setOrder(""); setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Title required");
    setLoading(true);
    const data = {
      title, description, status, order: Number(order) || 0,
      updatedAt: new Date()
    };
    try {
      if (editingId) {
        await axios.put(`https://cwt-server.vercel.app/api/milestones/${editingId}`, data);
        toast.success("Updated");
      } else {
        await axios.post("https://cwt-server.vercel.app/api/milestones", { ...data, createdAt: new Date() });
        toast.success("Created");
      }
      resetForm(); fetchMilestones();
    } catch { toast.error("Save failed"); }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete milestone?")) return;
    await axios.delete(`https://cwt-server.vercel.app/api/milestones/${id}`);
    toast.success("Deleted"); fetchMilestones();
  };

  const getStatusColor = (s) => {
    if (s === "active") return "bg-green-500/10 text-green-400 border-green-500/30";
    if (s === "inactive") return "bg-white/5 text-white/50 border-white/10";
    return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
  };

  const getStatusIcon = (s) =>
    s === "active" ? <CheckCircle size={16}/> : s==="inactive" ? <Clock size={16}/> : <AlertCircle size={16}/>;

  return (
    <div className="min-h-screen p-4 md:p-8 text-white">
      <ToastContainer theme="dark"/>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-6">
          <BookOpen className="text-[#07A8ED]" /> Milestones Management
        </h1>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            ["Total", milestones.length],
            ["Active", milestones.filter(m=>m.status==="active").length],
            ["Inactive", milestones.filter(m=>m.status==="inactive").length],
          ].map(([t,v],i)=>(
            <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
              <p className="text-white/50">{t}</p>
              <p className="text-3xl font-bold">{v}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl mb-4 flex gap-2"><Plus className="text-[#07A8ED]"/> {editingId?"Edit":"Create"} Milestone</h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title"
              className="bg-transparent border border-white/20 text-white rounded-xl p-3 focus:ring-2 focus:ring-[#07A8ED]" />
            <select value={status} onChange={e=>setStatus(e.target.value)}
              className="bg-transparent border border-white/20 text-white rounded-xl p-3">
              <option className="text-black">active</option>
              <option className="text-black">inactive</option>
              <option className="text-black">draft</option>
            </select>
            <input value={order} onChange={e=>setOrder(e.target.value)} placeholder="Order"
              className="bg-transparent border border-white/20 text-white rounded-xl p-3"/>
            <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description"
              className="md:col-span-2 bg-transparent border border-white/20 text-white rounded-xl p-3"/>
            <div className="md:col-span-2 flex justify-end gap-3">
              {editingId && <button type="button" onClick={resetForm}
                className="border border-white/20 px-5 py-2 rounded-xl">Cancel</button>}
              <button disabled={loading}
                className="bg-[#07A8ED] text-[#0B1221] px-6 py-2 rounded-xl font-semibold">
                {loading?"Saving...":editingId?"Update":"Create"}
              </button>
            </div>
          </form>
        </div>

        {/* List */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          {milestones.map(item=>(
            <div key={item._id} className="p-5 border-b border-white/10 hover:bg-white/5">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <button onClick={()=>setExpandedId(expandedId===item._id?null:item._id)}>
                    <ChevronRight className={`${expandedId===item._id?"rotate-90":""} transition`} />
                  </button>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs border rounded-full ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)} {item.status}
                    </span>
                    {expandedId===item._id && (
                      <p className="text-white/60 mt-2">{item.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>{setEditingId(item._id);setTitle(item.title);setDescription(item.description||"");setStatus(item.status||"active");setOrder(item.order||"");}}
                    className="text-[#07A8ED] hover:bg-[#07A8ED]/10 p-2 rounded-xl"><Pencil/></button>
                  <button onClick={()=>handleDelete(item._id)}
                    className="text-red-400 hover:bg-red-500/10 p-2 rounded-xl"><Trash2/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MilestonesManagement;
