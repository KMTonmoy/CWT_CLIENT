"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
 
import axios from "axios";
import toast from "react-hot-toast";
import { FiCheckCircle, FiChevronDown, FiClock, FiDatabase, FiEdit2, FiEye, FiRefreshCw, FiSave, FiSearch, FiShield, FiTrash2, FiTrendingDown, FiTrendingUp, FiUser, FiUsers, FiX } from "react-icons/fi";
import { ChessQueen } from "lucide-react";
import { FaCrown } from "react-icons/fa";

const Dashboard = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://cwt-server.vercel.app";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    pendingUsers: 0,
    revenue: 0,
    adminUsers: 0,
    studentUsers: 0,
    proStudentUsers: 0,
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    role: "student",
    phone: "",
    status: "active",
    bio: "",
    occupation: "",
    address: "",
    city: "",
    postCode: "",
    displayName: "",
    education: "",
  });

  // All available roles
  const availableRoles = [
    { value: "student", label: "Student", color: "bg-gray-500/20 text-gray-400" },
    { value: "prostudent", label: "Pro Student", color: "bg-purple-500/20 text-purple-400" },
    { value: "admin", label: "Admin", color: "bg-blue-500/20 text-blue-400" },
    { value: "superadmin", label: "Super Admin", color: "bg-red-500/20 text-red-400" },
    { value: "editor", label: "Editor", color: "bg-green-500/20 text-green-400" },
  ];

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/users`);
      if (response.data.success) {
        const usersData = response.data.users || [];
        setUsers(usersData);

        // Calculate stats
        const totalUsers = usersData.length;
        const activeUsers = usersData.filter(
          (u) => u.status === "active"
        ).length;
        const pendingUsers = usersData.filter(
          (u) => u.status === "pending"
        ).length;
        const adminUsers = usersData.filter(
          (u) => u.role === "admin" || u.role === "superadmin"
        ).length;
        const studentUsers = usersData.filter(
          (u) => u.role === "student"
        ).length;
        const proStudentUsers = usersData.filter(
          (u) => u.role === "prostudent" || u.role === "pro_student" || u.role === "ProStudent"
        ).length;

        setStats({
          totalUsers,
          activeUsers,
          pendingUsers,
          revenue: 0,
          adminUsers,
          studentUsers,
          proStudentUsers,
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm) ||
      user.displayName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // View user details
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  // Start editing user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "student",
      phone: user.phone || "",
      status: user.status || "active",
      bio: user.bio || "",
      occupation: user.occupation || "",
      address: user.address || "",
      city: user.city || "",
      postCode: user.postCode || "",
      displayName: user.displayName || user.name || "",
      education: user.education || "",
    });
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save edited user
  const handleSaveEdit = async () => {
    if (!editingUser) return;

    try {
      const response = await axios.patch(
        `${BASE_URL}/api/users/id/${editingUser._id}`,
        editFormData
      );

      if (response.data.success) {
        setUsers(
          users.map((user) =>
            user._id === editingUser._id ? response.data.user : user
          )
        );

        setEditingUser(null);
        setEditFormData({
          name: "",
          email: "",
          role: "student",
          phone: "",
          status: "active",
          bio: "",
          occupation: "",
          address: "",
          city: "",
          postCode: "",
          displayName: "",
          education: "",
        });

        fetchUsers(); // Refresh stats
        toast.success("User updated successfully!");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditFormData({
      name: "",
      email: "",
      role: "student",
      phone: "",
      status: "active",
      bio: "",
      occupation: "",
      address: "",
      city: "",
      postCode: "",
      displayName: "",
      education: "",
    });
  };

  // Quick role change
  const handleQuickRoleChange = async (userId, newRole) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/users/id/${userId}`,
        { role: newRole }
      );

      if (response.data.success) {
        setUsers(
          users.map((user) =>
            user._id === userId ? response.data.user : user
          )
        );

        fetchUsers(); // Refresh stats
        toast.success(`Role changed to ${newRole}`);
      }
    } catch (error) {
      console.error("Error changing role:", error);
      toast.error("Failed to change role");
    }
  };

  // Delete user
  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      await axios.delete(`${BASE_URL}/api/users/${userToDelete.uid}`);
      setUsers(users.filter((u) => u.uid !== userToDelete.uid));
      setShowDeleteModal(false);
      setUserToDelete(null);
      fetchUsers(); // Refresh stats
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  // Update user status
  const handleUpdateStatus = async (userId, newStatus) => {
    try {
      await axios.patch(`${BASE_URL}/api/users/uid/${userId}`, {
        status: newStatus,
      });

      setUsers(
        users.map((user) =>
          user.uid === userId ? { ...user, status: newStatus } : user
        )
      );

      fetchUsers(); // Refresh stats
      toast.success(`Status changed to ${newStatus}`);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update status");
    }
  };

  // Get role color
  const getRoleColor = (role) => {
    const roleObj = availableRoles.find(r => r.value === role);
    return roleObj ? roleObj.color : "bg-gray-500/20 text-gray-400";
  };

  // Get role icon
  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
      case "superadmin":
        return <FiShield className="w-3 h-3 mr-1" />;
      case "prostudent":
      case "pro_student":
      case "ProStudent":
        return <ChessQueen  className="w-3 h-3 mr-1" />;
      case "editor":
        return <FiEdit2 className="w-3 h-3 mr-1" />;
      default:
        return <FiUser className="w-3 h-3 mr-1" />;
    }
  };

  // Stats cards data
  const statsCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <FiUsers className="text-blue-500" />,
      color: "from-blue-500/20 to-blue-600/20",
      change: "+12.5%",
      trend: "up",
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: <FiCheckCircle className="text-green-500" />,
      color: "from-green-500/20 to-emerald-600/20",
      change: "+8.2%",
      trend: "up",
    },
    {
      title: "Pending Users",
      value: stats.pendingUsers,
      icon: <FiClock className="text-yellow-500" />,
      color: "from-yellow-500/20 to-amber-600/20",
      change: "-2.1%",
      trend: "down",
    },
    {
      title: "Admin Users",
      value: stats.adminUsers,
      icon: <FiShield className="text-purple-500" />,
      color: "from-purple-500/20 to-violet-600/20",
      change: "+3.4%",
      trend: "up",
    },
    {
      title: "Pro Students",
      value: stats.proStudentUsers,
      icon: <FaCrown  className="text-amber-500" />,
      color: "from-amber-500/20 to-orange-600/20",
      change: "+15.2%",
      trend: "up",
    },
    {
      title: "Regular Students",
      value: stats.studentUsers,
      icon: <FiUser className="text-pink-500" />,
      color: "from-pink-500/20 to-rose-600/20",
      change: "+5.1%",
      trend: "up",
    },
  ];

  // Recent users (last 5)
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // Role distribution
  const roleDistribution = {
    admin: users.filter((u) => u.role === "admin" || u.role === "superadmin")
      .length,
    student: users.filter((u) => u.role === "student").length,
    prostudent: users.filter((u) => u.role === "prostudent" || u.role === "pro_student" || u.role === "ProStudent").length,
    editor: users.filter((u) => u.role === "editor").length,
    other: users.filter(
      (u) => !["admin", "superadmin", "student", "prostudent", "pro_student", "ProStudent", "editor"].includes(u.role)
    ).length,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-400">
              Manage users, view analytics, and control platform settings
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchUsers}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <FiRefreshCw />
              Refresh
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8"
      >
        {statsCards.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:shadow-xl transition-all duration-300`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              </div>
              <div className="text-2xl">{stat.icon}</div>
            </div>
            <div className="flex items-center">
              {stat.trend === "up" ? (
                <FiTrendingUp className="text-green-400 mr-2" />
              ) : (
                <FiTrendingDown className="text-red-400 mr-2" />
              )}
              <span
                className={`text-sm ${
                  stat.trend === "up" ? "text-green-400" : "text-red-400"
                }`}
              >
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Management Table */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-xl font-bold text-white">
                  User Management
                </h2>
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:flex-none">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="all">All Roles</option>
                      {availableRoles.map((role) => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800/50">
                    <th className="p-4 text-left text-gray-300">User</th>
                    <th className="p-4 text-left text-gray-300">Role</th>
                    <th className="p-4 text-left text-gray-300">Status</th>
                    <th className="p-4 text-left text-gray-300">Joined</th>
                    <th className="p-4 text-left text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) =>
                    editingUser && editingUser._id === user._id ? (
                      // Edit Mode Row
                      <motion.tr
                        key={user._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-t border-white/5 bg-blue-500/10"
                      >
                        <td className="p-4" colSpan="5">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg font-bold text-white">
                                Edit User
                              </h3>
                              <div className="flex gap-2">
                                <button
                                  onClick={handleSaveEdit}
                                  className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                >
                                  <FiSave /> Save
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                                >
                                  <FiX /> Cancel
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-gray-300 text-sm mb-1">
                                  Full Name
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  value={editFormData.name}
                                  onChange={handleEditChange}
                                  className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-gray-300 text-sm mb-1">
                                  Display Name
                                </label>
                                <input
                                  type="text"
                                  name="displayName"
                                  value={editFormData.displayName}
                                  onChange={handleEditChange}
                                  className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-gray-300 text-sm mb-1">
                                  Email
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  value={editFormData.email}
                                  onChange={handleEditChange}
                                  className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white"
                                  disabled
                                />
                              </div>
                              <div>
                                <label className="block text-gray-300 text-sm mb-1">
                                  Phone
                                </label>
                                <input
                                  type="tel"
                                  name="phone"
                                  value={editFormData.phone}
                                  onChange={handleEditChange}
                                  className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-gray-300 text-sm mb-1">
                                  Role
                                </label>
                                <select
                                  name="role"
                                  value={editFormData.role}
                                  onChange={handleEditChange}
                                  className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white"
                                >
                                  {availableRoles.map((role) => (
                                    <option key={role.value} value={role.value}>
                                      {role.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-gray-300 text-sm mb-1">
                                  Status
                                </label>
                                <select
                                  name="status"
                                  value={editFormData.status}
                                  onChange={handleEditChange}
                                  className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white"
                                >
                                  <option value="active">Active</option>
                                  <option value="pending">Pending</option>
                                  <option value="inactive">Inactive</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-gray-300 text-sm mb-1">
                                  Occupation
                                </label>
                                <input
                                  type="text"
                                  name="occupation"
                                  value={editFormData.occupation}
                                  onChange={handleEditChange}
                                  className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-gray-300 text-sm mb-1">
                                  Education
                                </label>
                                <input
                                  type="text"
                                  name="education"
                                  value={editFormData.education}
                                  onChange={handleEditChange}
                                  className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white"
                                />
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-gray-300 text-sm mb-1">
                                  Bio
                                </label>
                                <textarea
                                  name="bio"
                                  value={editFormData.bio}
                                  onChange={handleEditChange}
                                  rows="3"
                                  className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-gray-300 text-sm mb-1">
                                  Address
                                </label>
                                <input
                                  type="text"
                                  name="address"
                                  value={editFormData.address}
                                  onChange={handleEditChange}
                                  className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-gray-300 text-sm mb-1">
                                  City
                                </label>
                                <input
                                  type="text"
                                  name="city"
                                  value={editFormData.city}
                                  onChange={handleEditChange}
                                  className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-gray-300 text-sm mb-1">
                                  Post Code
                                </label>
                                <input
                                  type="text"
                                  name="postCode"
                                  value={editFormData.postCode}
                                  onChange={handleEditChange}
                                  className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    ) : (
                      // Normal View Row
                      <motion.tr
                        key={user._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{
                          backgroundColor: "rgba(255,255,255,0.05)",
                        }}
                        className="border-t border-white/5"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full ${
                                user.photoURL
                                  ? ""
                                  : "bg-gradient-to-br from-blue-500 to-purple-600"
                              } flex items-center justify-center text-white font-bold`}
                            >
                              {user.photoURL ? (
                                <img
                                  src={user.photoURL}
                                  alt={user.name}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                user.name?.[0] || "U"
                              )}
                            </div>
                            <div>
                              <p className="text-white font-medium">
                                {user.name || "No Name"}
                              </p>
                              <p className="text-gray-400 text-sm">
                                {user.email || "No Email"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-sm flex items-center ${getRoleColor(
                                user.role
                              )}`}
                            >
                              {getRoleIcon(user.role)}
                              {user.role === "prostudent" || user.role === "pro_student" || user.role === "ProStudent"
                                ? "Pro Student"
                                : user.role || "user"}
                            </span>
                            {/* Quick Role Change Dropdown */}
                            <div className="relative group">
                              <button className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded">
                                <FiChevronDown className="w-4 h-4" />
                              </button>
                              <div className="absolute left-0 top-full mt-1 w-48 bg-gray-800 border border-white/10 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                <div className="py-1">
                                  {availableRoles.map((role) => (
                                    <button
                                      key={role.value}
                                      onClick={() => handleQuickRoleChange(user._id, role.value)}
                                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white flex items-center gap-2"
                                    >
                                      <div className={`w-2 h-2 rounded-full ${role.color.split(' ')[0]}`}></div>
                                      Change to {role.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <select
                            value={user.status || "active"}
                            onChange={(e) =>
                              handleUpdateStatus(user.uid, e.target.value)
                            }
                            className={`px-3 py-1 rounded-full text-sm border-0 ${
                              user.status === "active"
                                ? "bg-green-500/20 text-green-400"
                                : user.status === "pending"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </td>
                        <td className="p-4 text-gray-300">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleViewUser(user)}
                              className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <FiEye />
                            </button>
                            <button
                              onClick={() => handleEditUser(user)}
                              className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
                              title="Edit User"
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              onClick={() => {
                                setUserToDelete(user);
                                setShowDeleteModal(true);
                              }}
                              className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                              title="Delete User"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    )
                  )}
                </tbody>
              </table>

              {filteredUsers.length === 0 && (
                <div className="p-8 text-center">
                  <FiUsers className="text-4xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No users found</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Role Distribution */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Role Distribution
            </h2>
            <div className="space-y-4">
              {Object.entries(roleDistribution).map(([role, count]) => (
                <div key={role} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        role === "admin"
                          ? "bg-blue-500"
                          : role === "prostudent"
                          ? "bg-purple-500"
                          : role === "student"
                          ? "bg-green-500"
                          : role === "editor"
                          ? "bg-emerald-500"
                          : "bg-gray-500"
                      }`}
                    />
                    <span className="text-gray-300 capitalize">
                      {role === "prostudent" ? "Pro Student" : role}
                    </span>
                  </div>
                  <div className="text-white font-bold">{count}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recent Users</h2>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {user.name?.[0] || "U"}
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {user.name || "No Name"}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {user.role === "prostudent" || user.role === "pro_student" || user.role === "ProStudent"
                          ? "Pro Student"
                          : user.role || "user"}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      user.status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : user.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {user.status || "active"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <FiDatabase className="text-2xl text-blue-400 mx-auto mb-2" />
                <p className="text-white font-bold">{stats.totalUsers}</p>
                <p className="text-gray-400 text-sm">Total</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <FiCheckCircle className="text-2xl text-green-400 mx-auto mb-2" />
                <p className="text-white font-bold">{stats.activeUsers}</p>
                <p className="text-gray-400 text-sm">Active</p>
              </div>
            </div>
          </div>

          {/* Quick Role Actions */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <p className="text-gray-300 text-sm mb-3">
                Hover over user roles to quickly change them
              </p>
              <div className="grid grid-cols-2 gap-2">
                {availableRoles.map((role) => (
                  <div
                    key={role.value}
                    className={`px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-2 ${role.color}`}
                  >
                    <div className="w-2 h-2 rounded-full"></div>
                    {role.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-white/10 rounded-xl max-w-md w-full p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">User Details</h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-full ${
                    selectedUser.photoURL
                      ? ""
                      : "bg-gradient-to-br from-blue-500 to-purple-600"
                  } flex items-center justify-center text-white font-bold text-2xl`}
                >
                  {selectedUser.photoURL ? (
                    <img
                      src={selectedUser.photoURL}
                      alt={selectedUser.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    selectedUser.name?.[0] || "U"
                  )}
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    {selectedUser.name || "No Name"}
                  </h4>
                  <p className="text-gray-400">
                    {selectedUser.email || "No Email"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Role</p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm flex items-center ${getRoleColor(
                        selectedUser.role
                      )}`}
                    >
                      {getRoleIcon(selectedUser.role)}
                      {selectedUser.role === "prostudent" || selectedUser.role === "pro_student" || selectedUser.role === "ProStudent"
                        ? "Pro Student"
                        : selectedUser.role || "user"}
                    </span>
                    <button
                      onClick={() => {
                        setShowUserModal(false);
                        handleEditUser(selectedUser);
                      }}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Change
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      selectedUser.status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : selectedUser.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {selectedUser.status || "active"}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="text-white font-medium">
                    {selectedUser.phone || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Joined</p>
                  <p className="text-white font-medium">
                    {selectedUser.createdAt
                      ? new Date(selectedUser.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              {selectedUser.bio && (
                <div>
                  <p className="text-gray-400 text-sm">Bio</p>
                  <p className="text-white font-medium">{selectedUser.bio}</p>
                </div>
              )}

              {selectedUser.occupation && (
                <div>
                  <p className="text-gray-400 text-sm">Occupation</p>
                  <p className="text-white font-medium">
                    {selectedUser.occupation}
                  </p>
                </div>
              )}

              {selectedUser.address && (
                <div>
                  <p className="text-gray-400 text-sm">Address</p>
                  <p className="text-white font-medium">
                    {selectedUser.address}, {selectedUser.city}{" "}
                    {selectedUser.postCode}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-white/10">
                <p className="text-gray-400 text-sm mb-2">Last Active</p>
                <p className="text-white font-medium">
                  {selectedUser.lastActive
                    ? new Date(selectedUser.lastActive).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-white/10 rounded-xl max-w-md w-full p-6"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="text-red-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Delete User</h3>
              <p className="text-gray-400">
                Are you sure you want to delete{" "}
                <span className="text-white font-medium">
                  {userToDelete.name || userToDelete.email}
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Delete User
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;