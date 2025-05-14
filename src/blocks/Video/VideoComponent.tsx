import { BlockContainer } from "@/blocks/BlockContainer"
import type { Video, MuxVideo } from "@payload-types"
import MuxPlayer from "@mux/mux-player-react"

export const VideoComponent: React.FC<Video> = (props: Video) => {
  const { video } = props
  const videoTyped = video as MuxVideo

  const aspectRatio = videoTyped.aspectRatio!
  const [widthRatio, heightRatio] = aspectRatio.split("/").map((v) => parseInt(v, 10))
  const isPortrait = widthRatio / heightRatio < 1

  return (
    <BlockContainer {...props} bgColor="gray">
      <MuxPlayer
        playbackId={videoTyped.playbackOptions![0].playbackId!}
        src={videoTyped.playbackOptions![0].playbackUrl!}
        poster={videoTyped.playbackOptions![0].posterUrl!}
        className={`w-full h-auto mx-auto rounded-lg ${isPortrait ? "max-w-sm" : ""}`}
      />
    </BlockContainer>
  )
}
