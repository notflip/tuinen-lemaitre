import type { Block } from "payload"

export const Projects: Block = {
  slug: "projects",
  interfaceName: "Projects",
  fields: [
    {
      type: "text",
      name: "title",
      required: true,
    },
    {
      type: "relationship",
      name: "projects",
      label: "Gekozen projecten",
      relationTo: "projects",
      hasMany: true,
    },
  ],
}

export default Projects
