import { BlockContainer } from "@/blocks/BlockContainer"
import Badge from "@/components/badge"
import { DynamicIcon } from "@/components/dynamic-icon"
import { FeatureRows } from "@payload-types"

export const FeatureRowsComponent: React.FC<FeatureRows> = (props) => {
  const { badge, title, items, bgColor } = props

  return (
    <BlockContainer bgColor={bgColor} {...props}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 md:sticky top-8 self-start">
          <Badge text={badge} />
          <h3 className="mt-8">{title}</h3>
        </div>
        <div className="md:col-start-7 md:col-span-full">
          <div className="flex flex-col gap-8">
            {(items || []).map((item, index) => (
              <div key={index} className="bg-white p-4 lg:p-8 rounded-[16px]">
                {item.icon && (
                  <div className="inline-flex rounded-full mb-8 p-4 bg-primary">
                    <DynamicIcon
                      iconName={item.icon}
                      size={32}
                      className="text-white"
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
