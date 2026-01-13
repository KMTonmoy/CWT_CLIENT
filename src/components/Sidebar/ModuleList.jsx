import { ChevronRight, FolderOpen } from "lucide-react";

const ModuleList = ({ modules, loading, expandedModule, onModuleExpand }) => {
  if (loading) {
    return (
      <div className="ml-4 pl-4 border-l border-gray-700/50">
        <div className="flex justify-center py-2">
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (modules.length === 0) {
    return (
      <div className="ml-4 pl-4 border-l border-gray-700/50">
        <div className="text-xs text-gray-500 py-2 text-center">No modules</div>
      </div>
    );
  }

  return (
    <div className="ml-4 pl-4 border-l border-gray-700/50 space-y-1">
      {modules.map((module) => (
        <button
          key={module._id}
          onClick={() => onModuleExpand(module)}
          className={`w-full p-2 text-left hover:bg-[#1E293B]/30 transition-colors rounded flex items-center justify-between ${
            expandedModule === module._id
              ? "bg-[#07A8ED]/10 border border-[#07A8ED]/20"
              : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">{module.title}</span>
          </div>
          <ChevronRight
            className={`w-3 h-3 text-gray-500 ${
              expandedModule === module._id ? "rotate-90 text-[#07A8ED]" : ""
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default ModuleList;