"use client";
import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiHome,
  FiUsers,
  FiBook,
  FiSettings,
  FiBarChart2,
  FiDollarSign,
  FiMessageSquare,
  FiCalendar,
  FiFileText,
  FiShield,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiDatabase,
  FiBell,
  FiGlobe,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useUserData } from "@/hooks/useUserData";
import { motion, AnimatePresence } from "framer-motion";

const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const sidebarRef = useRef(null);
  const { userData } = useUserData();

  const menuItems = [
    {
      title: "Dashboard",
      icon: <FiHome size={20} />,
      path: "/admin",
      color: "text-blue-400",
    },
    {
      title: "Users",
      icon: <FiUsers size={20} />,
      path: "/admin/users",
      color: "text-green-400",
      submenu: [
        { title: "All Users", path: "/admin/users" },
        { title: "Add User", path: "/admin/users/add" },
        { title: "Roles", path: "/admin/users/roles" },
      ],
      key: "users",
    },
    {
      title: "Courses",
      icon: <FiBook size={20} />,
      path: "/admin/courses",
      color: "text-purple-400",
      submenu: [
        { title: "All Courses", path: "/admin/courses" },
        { title: "Add Course", path: "/admin/courses/add" },
        { title: "Categories", path: "/admin/courses/categories" },
      ],
      key: "courses",
    },
    {
      title: "Analytics",
      icon: <FiBarChart2 size={20} />,
      path: "/admin/analytics",
      color: "text-yellow-400",
    },
    {
      title: "Payments",
      icon: <FiDollarSign size={20} />,
      path: "/admin/payments",
      color: "text-green-400",
      submenu: [
        { title: "Transactions", path: "/admin/payments" },
        { title: "Invoices", path: "/admin/payments/invoices" },
        { title: "Refunds", path: "/admin/payments/refunds" },
      ],
      key: "payments",
    },
    {
      title: "Content",
      icon: <FiFileText size={20} />,
      path: "/admin/content",
      color: "text-pink-400",
      submenu: [
        { title: "Blog Posts", path: "/admin/content/blog" },
        { title: "Pages", path: "/admin/content/pages" },
        { title: "Media", path: "/admin/content/media" },
      ],
      key: "content",
    },
    {
      title: "Messages",
      icon: <FiMessageSquare size={20} />,
      path: "/admin/messages",
      color: "text-cyan-400",
      badge: "5",
    },
    {
      title: "Settings",
      icon: <FiSettings size={20} />,
      path: "/admin/settings",
      color: "text-gray-400",
      submenu: [
        { title: "General", path: "/admin/settings/general" },
        { title: "Security", path: "/admin/settings/security" },
        { title: "Notifications", path: "/admin/settings/notifications" },
      ],
      key: "settings",
    },
    {
      title: "System",
      icon: <FiDatabase size={20} />,
      path: "/admin/system",
      color: "text-red-400",
      submenu: [
        { title: "Database", path: "/admin/system/database" },
        { title: "Logs", path: "/admin/system/logs" },
        { title: "Backup", path: "/admin/system/backup" },
      ],
      key: "system",
    },
  ];

  const isActive = useCallback((path) => {
    if (path === "/admin") return pathname === "/admin";
    return pathname?.startsWith(path);
  }, [pathname]);

  const toggleSubmenu = useCallback((key) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const handleLogout = () => {
    router.push("/login");
  };

  useLayoutEffect(() => {
    const initialOpenState = {};
    let hasChanges = false;
    
    menuItems.forEach((item) => {
      if (item.submenu && item.key) {
        const shouldBeOpen = isActive(item.path);
        if (shouldBeOpen) {
          initialOpenState[item.key] = true;
          hasChanges = true;
        }
      }
    });

    if (hasChanges) {
      setOpenSubmenus(initialOpenState);
    }
  }, [isActive]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      
      e.preventDefault();
      const newWidth = Math.max(80, Math.min(500, e.clientX));
      
      setSidebarWidth(newWidth);
      setCollapsed(newWidth <= 200);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.classList.remove("select-none");
    };

    if (isResizing) {
      document.body.classList.add("select-none");
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.body.classList.remove("select-none");
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  useEffect(() => {
    if (collapsed) {
      setOpenSubmenus({});
    }
  }, [collapsed]);

  const isSubmenuOpen = (item) => {
    if (!item.submenu || !item.key) return false;
    return openSubmenus[item.key] || isActive(item.path);
  };

  const sidebarVariants = {
    expanded: { width: sidebarWidth },
    collapsed: { width: 80 }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  const submenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" }
  };

  return (
    <>
      <motion.div
        ref={sidebarRef}
        className="h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-950 border-r border-gray-800 fixed left-0 top-0 z-50 overflow-hidden"
        style={{ width: collapsed ? 80 : sidebarWidth }}
        animate={collapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div
          className={`absolute right-0 top-0 bottom-0 w-2 cursor-col-resize transition-colors z-10 ${
            isResizing ? "bg-blue-500/50" : "hover:bg-blue-500/30"
          }`}
          onMouseDown={(e) => {
            e.preventDefault();
            setIsResizing(true);
          }}
        />

        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <motion.div 
                className="flex items-center space-x-3 min-w-0"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div className="min-w-0">
                  <h2 className="text-white font-bold text-lg truncate">Admin Panel</h2>
                  <p className="text-xs text-gray-400 truncate">CWT Management</p>
                </div>
              </motion.div>
            )}
            {collapsed && (
              <motion.div 
                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-white font-bold text-lg">A</span>
              </motion.div>
            )}
            <motion.button
              onClick={() => {
                setCollapsed(!collapsed);
                if (!collapsed) setOpenSubmenus({});
              }}
              className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors flex-shrink-0"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {collapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
            </motion.button>
          </div>
        </div>

        {!collapsed && userData && (
          <motion.div 
            className="p-4 border-b border-gray-800"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative flex-shrink-0">
                {userData?.photoURL ? (
                  <img
                    src={userData.photoURL}
                    alt={userData.name}
                    className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {userData.name?.[0] || "A"}
                    </span>
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                  <RiVerifiedBadgeFill size={10} className="text-white" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-medium truncate">
                  {userData.name || "Admin"}
                </h3>
                <p className="text-xs text-gray-400 truncate">
                  {userData.role === "admin" ? "Super Admin" : "Administrator"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-gray-800 rounded-lg">
                <p className="text-xs text-gray-400 truncate">Role</p>
                <p className="text-sm text-white font-medium truncate capitalize">
                  {userData.role || "admin"}
                </p>
              </div>
              <div className="text-center p-2 bg-gray-800 rounded-lg">
                <p className="text-xs text-gray-400">Status</p>
                <p className="text-sm text-green-400 font-medium">Active</p>
              </div>
              <div className="text-center p-2 bg-gray-800 rounded-lg">
                <p className="text-xs text-gray-400">Tasks</p>
                <p className="text-sm text-yellow-400 font-medium">12</p>
              </div>
            </div>
          </motion.div>
        )}

        {collapsed && userData && (
          <motion.div 
            className="py-4 border-b border-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex justify-center">
              {userData?.photoURL ? (
                <img
                  src={userData.photoURL}
                  alt={userData.name}
                  className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold">
                    {userData.name?.[0] || "A"}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
          <nav className="space-y-1 px-2">
            {menuItems.map((item, index) => {
              const hasSubmenu = item.submenu && item.key;
              const isSubmenuItemOpen = isSubmenuOpen(item);
              
              return (
                <div key={index} className="mb-1">
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Link
                      href={hasSubmenu ? "#" : item.path}
                      onClick={(e) => {
                        if (hasSubmenu) {
                          e.preventDefault();
                          if (!collapsed) toggleSubmenu(item.key);
                        }
                      }}
                      className={`
                        flex items-center ${collapsed ? "justify-center" : ""} 
                        px-3 py-2.5 rounded-lg transition-all duration-200 group
                        ${
                          isActive(item.path) && !hasSubmenu
                            ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-l-2 border-blue-500"
                            : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                        }
                      `}
                    >
                      <div className={`${item.color} ${collapsed ? "" : "mr-3"}`}>
                        {item.icon}
                      </div>
                      {!collapsed && (
                        <>
                          <span className="flex-1 font-medium truncate">
                            {item.title}
                          </span>
                          <div className="flex items-center space-x-2">
                            {item.badge && (
                              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                {item.badge}
                              </span>
                            )}
                            {hasSubmenu && (
                              <motion.span 
                                className="text-gray-500"
                                animate={{ rotate: isSubmenuItemOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <FiChevronDown size={16} />
                              </motion.span>
                            )}
                          </div>
                        </>
                      )}
                    </Link>
                  </motion.div>
                  
                  <AnimatePresence>
                    {!collapsed && hasSubmenu && isSubmenuItemOpen && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={submenuVariants}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-8 mt-1 space-y-1">
                          {item.submenu.map((subItem, subIndex) => (
                            <motion.div
                              key={subIndex}
                              whileHover={{ x: 8 }}
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                              <Link
                                href={subItem.path}
                                className={`
                                  flex items-center px-3 py-2 text-sm rounded-lg transition-colors truncate
                                  ${
                                    isActive(subItem.path)
                                      ? "text-blue-400 bg-blue-500/10"
                                      : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/50"
                                  }
                                `}
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-current mr-2 flex-shrink-0"></div>
                                <span className="truncate">{subItem.title}</span>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
        </div>

        {!collapsed && (
          <motion.div 
            className="p-4 border-t border-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider truncate">
              Quick Actions
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <motion.button 
                className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors text-xs truncate"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiBell className="inline mr-1" size={12} />
                Alerts
              </motion.button>
              <motion.button 
                className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors text-xs truncate"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGlobe className="inline mr-1" size={12} />
                Live
              </motion.button>
            </div>
          </motion.div>
        )}

        <div className="p-4 border-t border-gray-800">
          <motion.button
            onClick={handleLogout}
            className={`flex items-center ${collapsed ? "justify-center" : ""} w-full px-3 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors truncate`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiLogOut size={20} className={collapsed ? "" : "mr-3"} />
            {!collapsed && <span className="font-medium">Logout</span>}
          </motion.button>
        </div>
      </motion.div>

      <style jsx global>{`
        body {
          margin-left: ${collapsed ? 80 : sidebarWidth}px;
          transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default AdminSidebar;