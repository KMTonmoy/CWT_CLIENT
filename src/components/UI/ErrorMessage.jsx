import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-3">
      <AlertCircle className="text-red-400" />
      <p className="text-red-300">{message}</p>
    </div>
  );
};

export default ErrorMessage;