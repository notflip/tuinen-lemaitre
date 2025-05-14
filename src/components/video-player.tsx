"use client"

import React from "react"
import MuxPlayer from "@mux/mux-player-react"

interface VideoPlayerProps {
  video: {
    playbackOptions?:
      | {
          playbackId?: string | null
          playbackUrl?: string | null
          posterUrl?: string | null
        }[]
      | null
    aspectRatio?: string | null
  } | null
}

function isVerticalAspectRatio(aspectRatio?: string | null): boolean {
  if (!aspectRatio) return false;
  const [w, h] = aspectRatio.split("/").map(Number);
  return w < h;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  if (!video || !video.playbackOptions || video.playbackOptions.length === 0) {
    return null;
  }

  const wrapperClass = isVerticalAspectRatio(video.aspectRatio) ? "max-w-md" : "";

  return (
    <div className={wrapperClass}>
      <MuxPlayer
        playbackId={video.playbackOptions[0].playbackId!}
        src={video.playbackOptions[0].playbackUrl!}
        poster={video.playbackOptions[0].posterUrl!}
        className={`aspect-${video.aspectRatio}`}
        player-init-time={null}
      />
    </div>
  );
};

export default VideoPlayer
