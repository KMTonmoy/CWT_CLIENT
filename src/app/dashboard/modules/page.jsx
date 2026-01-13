"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus, Pencil, Trash2, ChevronRight, BookOpen, Layers
} from "lucide-react";

const ModulesManagement = () => {
  const [milestones, setMilestones] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedMilestone, setSelectedMilestone] = useState("");
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch milestones
  useEffect(() => {
    axios.get("http://localhost:5000/api/milestones")
      .then(res => setMilestones(res.data));
  }, []);

  // Fetch modules when milestone changes
  useEffect(() => {
    if (!selectedMilestone) return;
    axios.get(`http://localhost:5000/api/modules/milestone/${selectedMilestone}`)
      .then(res => setModules(res.data));
  }, [selectedMilestone]);

  const resetForm = () => {
    setTitle("");
    setOrder("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !selectedMilestone) return alert("Select milestone and title");

    setLoading(true);
    const data = {
      title,
      order: Number(order) || 0,
      milestoneId: selectedMilestone,
    };

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/modules/${editingId}`, data);
      } else {
        await axios.post("http://localhost:5000/api/modules", data);
      }
      resetForm();
      const res = await axios.get(`http://localhost:5000/api/modules/milestone/${selectedMilestone}`);
      setModules(res.data);
    } catch {
      alert("Save failed");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete module?")) return;
    await axios.delete(`http://localhost:5000/api/modules/${id}`);
    const res = await axios.get(`http://localhost:5000/api/modules/milestone/${selectedMilestone}`);
    setModules(res.data);
  };

  return (
    <div className="min-h-screen p-6 text-white">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold flex items-center gap-3 mb-6">
          <Layers className="text-[#07A8ED]" /> Modules Management
        </h1>

        {/* Milestone Select */}
        <select
          value={selectedMilestone}
          onChange={e => setSelectedMilestone(e.target.value)}
          className="mb-6 w-full bg-transparent border border-white/20 p-3 rounded-xl"
        >
          <option value="" className="text-black">Select Milestone</option>
          {milestones.map(m => (
            <option key={m._id} value={m._id} className="text-black">
              {m.title}
            </option>
          ))}
        </select>

        {/* Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl mb-4 flex gap-2">
            <Plus className="text-[#07A8ED]" /> {editingId ? "Edit" : "Create"} Module
          </h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Module Title"
              className="bg-transparent border border-white/20 rounded-xl p-3"
            />
            <input
              value={order}
              onChange={e => setOrder(e.target.value)}
              placeholder="Order"
              className="bg-transparent border border-white/20 rounded-xl p-3"
            />
            <div className="md:col-span-2 flex justify-end gap-3">
              {editingId && (
                <button type="button" onClick={resetForm}
                  className="border border-white/20 px-5 py-2 rounded-xl">
                  Cancel
                </button>
              )}
              <button disabled={loading}
                className="bg-[#07A8ED] text-[#0B1221] px-6 py-2 rounded-xl font-semibold">
                {loading ? "Saving..." : editingId ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>

        {/* Modules List */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {modules.map(item => (
            <div key={item._id} className="p-5 border-b border-white/10 hover:bg-white/5">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <button onClick={() => setExpandedId(expandedId === item._id ? null : item._id)}>
                    <ChevronRight className={`${expandedId === item._id ? "rotate-90" : ""} transition`} />
                  </button>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-white/50 text-sm">Order: {item.order}</p>
                    {expandedId === item._id && (
                      <p className="text-white/60 mt-2">
                        Milestone ID: {item.milestoneId}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(item._id);
                      setTitle(item.title);
                      setOrder(item.order || "");
                    }}
                    className="text-[#07A8ED] hover:bg-[#07A8ED]/10 p-2 rounded-xl">
                    <Pencil />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-400 hover:bg-red-500/10 p-2 rounded-xl">
                    <Trash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!selectedMilestone && (
          <p className="text-white/50 mt-6 text-center">
            Select a milestone to see its modules
          </p>
        )}
      </div>
    </div>
  );
};

export default ModulesManagement;
