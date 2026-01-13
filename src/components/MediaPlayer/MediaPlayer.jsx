import { useState, useRef, useEffect, useCallback } from "react";
import {
  Download,
  Maximize2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Frame ,
} from "lucide-react";
import { getContentIcon, getContentColor } from "@/utils/contentUtils";

const MediaPlayer = ({ selectedContent, selectedModule }) => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const playerContainerRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isSeeking, setIsSeeking] = useState(false);
  const [buffered, setBuffered] = useState(0);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
        return;

      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "m":
          e.preventDefault();
          toggleMute();
          break;
        case "arrowleft":
        case "j":
          e.preventDefault();
          skipBackward();
          break;
        case "arrowright":
        case "l":
          e.preventDefault();
          skipForward();
          break;
        case "arrowup":
          e.preventDefault();
          increaseVolume();
          break;
        case "arrowdown":
          e.preventDefault();
          decreaseVolume();
          break;
        case "f":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          e.preventDefault();
          const percentage = parseInt(e.key) / 10;
          skipToPercentage(percentage);
          break;
        case ">":
        case ".":
          e.preventDefault();
          increasePlaybackRate();
          break;
        case "<":
        case ",":
          e.preventDefault();
          decreasePlaybackRate();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedContent, isPlaying, volume]);

  // Auto-hide controls
  useEffect(() => {
    if (!selectedContent || !isPlaying) return;

    const hideControls = () => setShowControls(false);
    const showControlsOnMouseMove = () => {
      setShowControls(true);
      clearTimeout(progressIntervalRef.current);
      progressIntervalRef.current = setTimeout(hideControls, 3000);
    };

    progressIntervalRef.current = setTimeout(hideControls, 3000);

    window.addEventListener("mousemove", showControlsOnMouseMove);
    return () => {
      clearTimeout(progressIntervalRef.current);
      window.removeEventListener("mousemove", showControlsOnMouseMove);
    };
  }, [selectedContent, isPlaying]);

  // Fullscreen handler
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Auto-play when content changes
  useEffect(() => {
    if (
      selectedContent &&
      (selectedContent.type === "video" || selectedContent.type === "audio")
    ) {
      const playMedia = () => {
        if (selectedContent.type === "video" && videoRef.current) {
          videoRef.current.play().catch(console.log);
        } else if (selectedContent.type === "audio" && audioRef.current) {
          audioRef.current.play().catch(console.log);
        }
      };
      setTimeout(playMedia, 300);
    }
  }, [selectedContent]);

  // Buffering progress
  useEffect(() => {
    const updateBuffered = () => {
      const media =
        selectedContent?.type === "video" ? videoRef.current : audioRef.current;
      if (media && media.buffered.length > 0) {
        const bufferedEnd = media.buffered.end(media.buffered.length - 1);
        setBuffered((bufferedEnd / duration) * 100 || 0);
      }
    };

    const media =
      selectedContent?.type === "video" ? videoRef.current : audioRef.current;
    if (media) {
      media.addEventListener("progress", updateBuffered);
      return () => media.removeEventListener("progress", updateBuffered);
    }
  }, [selectedContent, duration]);

  const togglePlay = useCallback(() => {
    if (selectedContent?.type === "video" && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else if (selectedContent?.type === "audio" && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [selectedContent, isPlaying]);

  const toggleMute = useCallback(() => {
    if (selectedContent?.type === "video" && videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    } else if (selectedContent?.type === "audio" && audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [selectedContent, isMuted]);

  const skipBackward = useCallback(() => {
    const skipAmount = 10; // seconds
    if (selectedContent?.type === "video" && videoRef.current) {
      videoRef.current.currentTime = Math.max(
        0,
        videoRef.current.currentTime - skipAmount
      );
    } else if (selectedContent?.type === "audio" && audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        audioRef.current.currentTime - skipAmount
      );
    }
  }, [selectedContent]);

  const skipForward = useCallback(() => {
    const skipAmount = 10; // seconds
    if (selectedContent?.type === "video" && videoRef.current) {
      videoRef.current.currentTime = Math.min(
        duration,
        videoRef.current.currentTime + skipAmount
      );
    } else if (selectedContent?.type === "audio" && audioRef.current) {
      audioRef.current.currentTime = Math.min(
        duration,
        audioRef.current.currentTime + skipAmount
      );
    }
  }, [selectedContent, duration]);

  const skipToPercentage = useCallback(
    (percentage) => {
      const newTime = duration * percentage;
      if (selectedContent?.type === "video" && videoRef.current) {
        videoRef.current.currentTime = newTime;
      } else if (selectedContent?.type === "audio" && audioRef.current) {
        audioRef.current.currentTime = newTime;
      }
    },
    [selectedContent, duration]
  );

  const increaseVolume = useCallback(() => {
    const newVolume = Math.min(1, volume + 0.1);
    setVolume(newVolume);
    if (selectedContent?.type === "video" && videoRef.current) {
      videoRef.current.volume = newVolume;
    } else if (selectedContent?.type === "audio" && audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, [selectedContent, volume]);

  const decreaseVolume = useCallback(() => {
    const newVolume = Math.max(0, volume - 0.1);
    setVolume(newVolume);
    if (selectedContent?.type === "video" && videoRef.current) {
      videoRef.current.volume = newVolume;
    } else if (selectedContent?.type === "audio" && audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, [selectedContent, volume]);

  const handleVolumeChange = useCallback(
    (e) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      if (selectedContent?.type === "video" && videoRef.current) {
        videoRef.current.volume = newVolume;
      } else if (selectedContent?.type === "audio" && audioRef.current) {
        audioRef.current.volume = newVolume;
      }
    },
    [selectedContent]
  );

  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const handleSeek = useCallback(
    (e) => {
      const progressBar = progressBarRef.current;
      if (!progressBar) return;

      const rect = progressBar.getBoundingClientRect();
      const percentage = (e.clientX - rect.left) / rect.width;
      const newTime = Math.max(0, Math.min(duration, duration * percentage));

      setCurrentTime(newTime);

      if (isSeeking) {
        if (selectedContent?.type === "video" && videoRef.current) {
          videoRef.current.currentTime = newTime;
        } else if (selectedContent?.type === "audio" && audioRef.current) {
          audioRef.current.currentTime = newTime;
        }
      }
    },
    [selectedContent, duration, isSeeking]
  );

  const handleSeekEnd = () => {
    setIsSeeking(false);
  };

  const increasePlaybackRate = () => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = Math.min(rates.length - 1, currentIndex + 1);
    setPlaybackRate(rates[nextIndex]);

    if (selectedContent?.type === "video" && videoRef.current) {
      videoRef.current.playbackRate = rates[nextIndex];
    } else if (selectedContent?.type === "audio" && audioRef.current) {
      audioRef.current.playbackRate = rates[nextIndex];
    }
  };

  const decreasePlaybackRate = () => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const prevIndex = Math.max(0, currentIndex - 1);
    setPlaybackRate(rates[prevIndex]);

    if (selectedContent?.type === "video" && videoRef.current) {
      videoRef.current.playbackRate = rates[prevIndex];
    } else if (selectedContent?.type === "audio" && audioRef.current) {
      audioRef.current.playbackRate = rates[prevIndex];
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && playerContainerRef.current) {
      playerContainerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const togglePIP = async () => {
    if (
      selectedContent?.type === "video" &&
      videoRef.current &&
      document.pictureInPictureEnabled
    ) {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else {
          await videoRef.current.requestPictureInPicture();
        }
      } catch (error) {
        console.error("Picture-in-Picture error:", error);
      }
    }
  };

  const downloadFile = () => {
    if (selectedContent?.url) {
      const link = document.createElement("a");
      link.href = selectedContent.url;
      link.download = selectedContent.title || "download";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const renderMediaPlayer = () => {
    if (!selectedContent) return null;

    const isVideo = selectedContent.type === "video";
    const isAudio = selectedContent.type === "audio";
    const isImage = selectedContent.type === "image";
    const isPDF = selectedContent.type === "pdf";

    if (isVideo) {
      return (
        <>
          <video
            ref={videoRef}
            src={selectedContent.url}
            className="w-full h-full"
            onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.target.duration)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            controls={false}
            muted={isMuted}
            playsInline
            onClick={togglePlay}
          />
          {showControls && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={skipBackward}
                  className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                  title="Skip backward 10s (←)"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                <button
                  onClick={togglePlay}
                  className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"
                  title="Play/Pause (Space/K)"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>
                <button
                  onClick={skipForward}
                  className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                  title="Skip forward 10s (→)"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={togglePIP}
                    className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                    title="Picture in Picture"
                  >
                    <Frame className="w-5 h-5" />
                  </button>
                  <button
                    onClick={toggleMute}
                    className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                    title="Mute (M)"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-white/50 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                  />
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                    title="Fullscreen (F)"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {/* Enhanced Progress Bar */}
              <div
                ref={progressBarRef}
                className="relative w-full h-1.5 bg-white/30 rounded-full cursor-pointer group"
                onMouseDown={handleSeekStart}
                onMouseMove={handleSeek}
                onMouseUp={handleSeekEnd}
                onMouseLeave={handleSeekEnd}
              >
                {/* Buffered progress */}
                <div
                  className="absolute h-full bg-white/40 rounded-full"
                  style={{ width: `${buffered}%` }}
                />
                {/* Current progress */}
                <div
                  className="absolute h-full bg-[#07A8ED] rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
                {/* Progress handle */}
                <div
                  className="absolute top-1/2 w-4 h-4 bg-[#07A8ED] rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform -translate-y-1/2 -translate-x-1/2 shadow-lg"
                  style={{ left: `${(currentTime / duration) * 100}%` }}
                />
                {/* Time preview on hover */}
                <div className="absolute bottom-full mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {formatTime((currentTime / duration) * duration)}
                </div>
              </div>
              <div className="flex justify-between text-xs text-white mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          )}
        </>
      );
    }

    if (isAudio) {
      return (
        <div className="relative w-full bg-gradient-to-br from-emerald-900/80 to-teal-900/80 rounded-xl p-8 border border-emerald-800/50">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 text-emerald-400">🎵</div>
            <h3 className="text-2xl font-bold text-white">
              {selectedContent.title}
            </h3>
            <p className="text-emerald-300">Audio Lesson</p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={skipBackward}
                className="p-3 text-white hover:bg-white/20 rounded-full transition-colors"
                title="Skip backward 10s"
              >
                <SkipBack className="w-6 h-6" />
              </button>
              <button
                onClick={togglePlay}
                className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full hover:opacity-90 transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8" />
                )}
              </button>
              <button
                onClick={skipForward}
                className="p-3 text-white hover:bg-white/20 rounded-full transition-colors"
                title="Skip forward 10s"
              >
                <SkipForward className="w-6 h-6" />
              </button>
            </div>
          </div>
          <audio
            ref={audioRef}
            src={selectedContent.url}
            className="w-full"
            onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.target.duration)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            muted={isMuted}
          />
          {/* Audio Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-emerald-300 mb-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div
              ref={progressBarRef}
              className="relative w-full h-2 bg-emerald-900/50 rounded-full cursor-pointer group"
              onMouseDown={handleSeekStart}
              onMouseMove={handleSeek}
              onMouseUp={handleSeekEnd}
              onMouseLeave={handleSeekEnd}
            >
              <div
                className="absolute h-full bg-emerald-500 rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
              <div
                className="absolute top-1/2 w-4 h-4 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-2 text-emerald-300 hover:text-white transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 h-1 bg-emerald-900/50 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400"
                />
              </div>
              <div className="text-xs text-emerald-300">
                Speed: {playbackRate}x
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (isPDF) {
      return (
        <div className="relative w-full h-full bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(
              selectedContent.url
            )}&embedded=true`}
            className="w-full h-full min-h-[400px]"
            frameBorder="0"
            title="PDF Viewer"
          />
        </div>
      );
    }

    if (isImage) {
      return (
        <div className="relative w-full h-full bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
          <img
            src={selectedContent.url}
            alt={selectedContent.title}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/600x400/1e293b/94a3b8?text=Image+Not+Available";
            }}
          />
        </div>
      );
    }

    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/80 to-indigo-900/80 rounded-xl border border-blue-800/50">
        <div className="text-center p-8">
          <div className="text-6xl mb-4 text-blue-400">📄</div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {selectedContent.title}
          </h3>
          <p className="text-blue-300 mb-6">
            {selectedContent.description || "Document"}
          </p>
          <button
            onClick={downloadFile}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            <Download size={20} />
            Download {selectedContent.type.toUpperCase()}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl border border-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-[#07A8ED]/10 via-transparent to-[#1E3A8A]/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white truncate">
              {selectedContent?.title ||
                selectedModule?.title ||
                "Select Content"}
            </h2>
            {selectedContent && (
              <div
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mt-1 ${getContentColor(
                  selectedContent.type
                )}`}
              >
                {getContentIcon(selectedContent.type)}
                <span>{selectedContent.type?.toUpperCase()}</span>
                {playbackRate !== 1 && selectedContent.type === "video" && (
                  <span className="ml-2 bg-white/20 px-1.5 py-0.5 rounded">
                    {playbackRate}x
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {selectedContent?.url && (
              <button
                onClick={downloadFile}
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#07A8ED] to-[#3B82F6] text-white rounded-lg hover:opacity-90 transition-all text-sm"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            )}
            <button
              onClick={toggleFullscreen}
              className={`p-2 rounded-lg transition-all ${
                isFullscreen
                  ? "bg-[#07A8ED] text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div
          ref={playerContainerRef}
          className="relative aspect-video bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {selectedContent ? (
            renderMediaPlayer()
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center min-h-[400px] p-8">
              <div className="text-8xl mb-4 text-gray-700 opacity-50">🎬</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                Welcome to Classroom
              </h3>
              <p className="text-gray-500 text-center">
                1. Select a milestone
                <br />
                2. Expand a module
                <br />
                3. Click any content to view
              </p>
            </div>
          )}
        </div>

        {/* Keyboard Shortcuts Help */}
        {selectedContent && (
          <div className="mt-4 p-3 bg-gray-900/50 rounded-lg text-xs text-gray-400">
            <div className="flex flex-wrap gap-4">
              <div>
                <span className="font-medium">Space/K:</span> Play/Pause
              </div>
              <div>
                <span className="font-medium">M:</span> Mute
              </div>
              <div>
                <span className="font-medium">←/J:</span> Back 10s
              </div>
              <div>
                <span className="font-medium">→/L:</span> Forward 10s
              </div>
              <div>
                <span className="font-medium">↑/↓:</span> Volume
              </div>
              <div>
                <span className="font-medium">F:</span> Fullscreen
              </div>
              <div>
                <span className="font-medium">0-9:</span> Skip to %
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaPlayer;
