import { BlockContainer } from "@/blocks/BlockContainer"
import { ImageBox } from "@/components/image-box"
import { Projects, Project } from "@payload-types"

export const ProjectsComponent: React.FC<Projects> = (props) => {
  const { title, projects } = props

  return (
    <BlockContainer {...props} fullWidth bgColor="bg-primary">
      <div className="py-24 lg:py-32">
        <h3 className="mb-16 text-white">{title}</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {(projects || []).map((project, index) => {
            if (typeof project === "number") {
              return null
            }
            return (
              <div key={index}>
                <div className=" relative h-[400px] rounded-[16px] overflow-hidden">
                  {(project as Project).image && (
                    <ImageBox
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      media={(project as Project).image}
                    />
                  )}
                </div>
                <h5 className="mt-8 text-white">{project.title}</h5>
                <p className="mt-4 text-white max-w-lg opacity-60">{project.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </BlockContainer>
  )
}
