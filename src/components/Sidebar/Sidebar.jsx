import { ChevronDown, ChevronRight, FolderOpen, Loader2 } from "lucide-react";

const Sidebar = ({
  milestones,
  modules,
  loading,
  moduleLoading,
  expandedMilestone,
  expandedModule,
  onMilestoneClick,
  onModuleExpand,
}) => {
  return (
    <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl border border-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-[#07A8ED]/10 via-transparent to-[#1E3A8A]/10">
        <h3 className="text-lg font-bold text-white">Course Curriculum</h3>
      </div>

      <div className="p-3 max-h-[calc(100vh-200px)] overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-[#07A8ED]" />
          </div>
        ) : milestones.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No milestones available</div>
        ) : (
          <div className="space-y-2">
            {milestones.map((milestone) => (
              <div key={milestone._id} className="space-y-1">
                {/* Milestone Button */}
                <button
                  onClick={() => onMilestoneClick(milestone._id)}
                  className="w-full p-3 text-left hover:bg-[#1E293B]/50 transition-colors rounded-lg flex items-center justify-between bg-[#1E293B]/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#07A8ED] to-[#1E3A8A] rounded-lg flex items-center justify-center font-bold text-sm">
                      {milestone.order || 1}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-white">{milestone.title}</div>
                      <div className="text-xs text-gray-400">
                        {milestone.modulesCount || 0} modules
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`text-gray-400 transition-transform ${
                      expandedMilestone === milestone._id
                        ? "rotate-180 text-[#07A8ED]"
                        : ""
                    }`}
                  />
                </button>

                {/* Modules under milestone */}
                {expandedMilestone === milestone._id && (
                  <div className="ml-4 pl-4 border-l border-gray-700/50 space-y-1">
                    {moduleLoading ? (
                      <div className="flex justify-center py-2">
                        <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                      </div>
                    ) : modules.length === 0 ? (
                      <div className="text-xs text-gray-500 py-2 text-center">
                        No modules
                      </div>
                    ) : (
                      modules.map((module) => (
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
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;