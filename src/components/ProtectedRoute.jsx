"use client";

import { useRoleCheck } from "@/hooks/useRoleCheck";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ 
  children, 
  requiredRole = "prostudent",
  redirectPath = "/"
}) {
  const { isAuthorized, loading } = useRoleCheck(requiredRole, redirectPath);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B1221] to-[#0A1A2F]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#07A8ED] mx-auto mb-4" />
          <p className="text-white">Checking access permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;  
  }

  return <>{children}</>;
}