import { BlockContainer } from "@/blocks/BlockContainer"
import Badge from "@/components/badge"
import { DynamicIcon } from "@/components/dynamic-icon"
import { FeatureGrid } from "@payload-types"

export const FeatureGridComponent: React.FC<FeatureGrid> = (props) => {
  const { badge, title, items, bgColor } = props

  return (
    <BlockContainer bgColor={bgColor} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3 lg:sticky top-8 self-start">
          <Badge text={badge} />
          <h3 className="mt-8">{title}</h3>
        </div>
        <div className="lg:col-start-5 lg:col-span-full">
          <div className="grid grid-cols-2 gap-8">
            {(items || []).map((item, index) => (
              <div key={index} className="bg-white p-4 lg:p-8 rounded-[16px]">
                {item.icon && (
                  <div className="inline-flex rounded-full mb-8 p-4 bg-secondary">
                    <DynamicIcon
                      iconName={item.icon}
                      size={24}
                    />
                  </div>
                )}
                <h4 className="mb-8">{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BlockContainer>
  )
}
