'use client';
import "../../app/globals.css";
import AdminSidebar from "@/components/Dashboard/Sidebar/AdminSidebar";
import { useUserData } from "@/hooks/useUserData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  const { userData, loading } = useUserData();
  const router = useRouter();
  const [showAccessModal, setShowAccessModal] = useState(false);

  // Check if user is admin
  useEffect(() => {
    if (!loading && userData) {
      const adminRoles = ["admin", "superadmin", "administrator", "super_admin", "Admin", "SuperAdmin"];
      const isAdmin = adminRoles.includes(userData.role);
      
      if (!isAdmin) {
        setShowAccessModal(true);
      }
    }
  }, [userData, loading]);

  const handleSwitchAccount = () => {
    router.push("/login");
  };

  const handleGoHome = () => {
    router.push("/");
  };

   

  // If still loading, show loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // If not admin, show black screen with modal
  if (showAccessModal) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-md w-full p-6">
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
            Admin Access Required
          </h2>
          
          {/* Message */}
          <p className="text-gray-300 text-center mb-6 text-sm">
            {userData 
              ? `Your role (${userData.role || 'user'}) does not have admin privileges.`
              : "You need to login as an administrator."
            }
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleSwitchAccount}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
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
            Contact admin if you need access
          </p>
        </div>
      </div>
    );
  }

  // If authorized, show admin dashboard
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-gray-900/50 overflow-auto">
        {children}
      </main>
    </div>
  );
}