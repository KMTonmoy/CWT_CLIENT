import {
  FileVideo,
  FileAudio,
  FileImage,
  FilePdf,
  FileText,
  Type,
  FileChartColumn,
} from "lucide-react";

export const getContentIcon = (type) => {
  switch (type?.toLowerCase()) {
    case "video":
    case "mp4":
    case "mov":
    case "avi":
    case "mkv":
    case "webm":
      return <FileVideo className="w-5 h-5" />;
    case "audio":
    case "mp3":
    case "wav":
    case "m4a":
    case "ogg":
      return <FileAudio className="w-5 h-5" />;
    case "image":
    case "jpeg":
    case "jpg":
    case "png":
    case "gif":
    case "webp":
    case "svg":
      return <FileImage className="w-5 h-5" />;
    case "pdf":
      return <FileChartColumn  className="w-5 h-5" />;
    case "document":
    case "doc":
    case "docx":
    case "txt":
    case "rtf":
      return <FileText className="w-5 h-5" />;
    default:
      return <Type className="w-5 h-5" />;
  }
};

export const getContentColor = (type) => {
  switch (type?.toLowerCase()) {
    case "video":
    case "mp4":
    case "mov":
    case "avi":
    case "mkv":
    case "webm":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "audio":
    case "mp3":
    case "wav":
    case "m4a":
    case "ogg":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "pdf":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "image":
    case "jpeg":
    case "jpg":
    case "png":
    case "gif":
    case "webp":
    case "svg":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "document":
    case "doc":
    case "docx":
    case "txt":
    case "rtf":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};