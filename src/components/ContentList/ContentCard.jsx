import { Eye, Clock } from "lucide-react";
import { getContentIcon, getContentColor } from "../../utils/contentUtils";

const ContentCard = ({ content, isSelected, onClick, viewMode }) => {
  if (viewMode === "grid") {
    return (
      <button
        onClick={onClick}
        className={`p-3 rounded-lg border text-left transition-all ${
          isSelected
            ? "border-[#07A8ED] bg-gradient-to-r from-[#07A8ED]/20 to-[#3B82F6]/20"
            : "border-gray-800 hover:border-gray-700 hover:bg-gray-900/50"
        }`}
      >
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded ${getContentColor(content.type)}`}>
            {getContentIcon(content.type)}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-white text-sm truncate">
              {content.title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
              <span>{content.duration || 0} min</span>
              <span>•</span>
              <Eye className="w-3 h-3" />
              <span>{content.views || 0}</span>
            </div>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`w-full p-3 rounded-lg border text-left transition-all ${
        isSelected
          ? "border-[#07A8ED] bg-gradient-to-r from-[#07A8ED]/20 to-[#3B82F6]/20"
          : "border-gray-800 hover:border-gray-700 hover:bg-gray-900/50"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded ${getContentColor(content.type)}`}>
          {getContentIcon(content.type)}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-white text-sm truncate">
            {content.title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
            <Clock className="w-3 h-3" />
            <span>{content.duration || 0} min</span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ContentCard;