import type { Block } from "payload"

export const Video: Block = {
  slug: "video",
  interfaceName: "Video",
  fields: [
    {
      name: "video",
      label: "Video",
      type: "relationship",
      relationTo: "mux-video",
    },
  ],
}

export default Video
