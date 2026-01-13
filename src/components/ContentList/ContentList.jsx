import { useState } from "react";
import { Grid, List as ListIcon, Eye, Clock, Loader2 } from "lucide-react";
import { getContentIcon, getContentColor } from "@/utils/contentUtils";

const ContentList = ({
  contents,
  loading,
  selectedContent,
  onContentSelect,
  selectedModule,
}) => {
  const [viewMode, setViewMode] = useState("grid");

  const calculateModuleDuration = () => {
    return contents.reduce((sum, content) => sum + (content.duration || 0), 0);
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl border border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-[#07A8ED]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl border border-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-[#07A8ED]/10 via-transparent to-[#1E3A8A]/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white">Module Contents</h3>
            <p className="text-xs text-gray-400">
              {contents.length} items • {calculateModuleDuration()} min
            </p>
          </div>
          <div className="flex border border-gray-700 rounded overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 ${
                viewMode === "grid"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 ${
                viewMode === "list"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-3 max-h-[calc(100vh-200px)] overflow-y-auto">
        {contents.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No contents in this module
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-2">
            {contents.map((content) => (
              <button
                key={content.id}
                onClick={() => onContentSelect(content)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  selectedContent?.id === content.id
                    ? "border-[#07A8ED] bg-gradient-to-r from-[#07A8ED]/20 to-[#3B82F6]/20"
                    : "border-gray-800 hover:border-gray-700 hover:bg-gray-900/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded ${getContentColor(content.type)}`}
                  >
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
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {contents.map((content) => (
              <button
                key={content.id}
                onClick={() => onContentSelect(content)}
                className={`w-full p-3 rounded-lg border text-left transition-all ${
                  selectedContent?.id === content.id
                    ? "border-[#07A8ED] bg-gradient-to-r from-[#07A8ED]/20 to-[#3B82F6]/20"
                    : "border-gray-800 hover:border-gray-700 hover:bg-gray-900/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded ${getContentColor(content.type)}`}
                  >
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentList;