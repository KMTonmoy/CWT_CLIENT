 
import AuthProvider from "@/AuthProvider/AuthProvider";
import "../../app/globals.css";
import AdminSidebar from "@/components/Dashboard/Sidebar/AdminSidebar";
  

export default function RootLayout({ children }) {
  return (
    <div>
      <AuthProvider>
        <div className="flex ">
          <AdminSidebar />
          <main className="flex justify-center w-full">{children}</main>
        </div>
      </AuthProvider>
    </div>
  );
}