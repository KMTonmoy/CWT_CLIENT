import { ChevronDown } from "lucide-react";

const MilestoneList = ({ milestones, expandedMilestone, onMilestoneClick, children }) => {
  return (
    <div className="space-y-2">
      {milestones.map((milestone) => (
        <div key={milestone._id} className="space-y-1">
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

          {expandedMilestone === milestone._id && children}
        </div>
      ))}
    </div>
  );
};

export default MilestoneList;