import { BlockContainer } from "@/blocks/BlockContainer"
import { DynamicIcon } from "@/components/dynamic-icon"
import { Type4 } from "@/components/type4"
import { Cards } from "@payload-types"

export const CardsComponent: React.FC<Cards> = (props) => {
  const { items, title } = props

  return (
    <BlockContainer {...props}>
      <div className="max-w-xl mb-12">
        <h3>{title}</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {(items || []).map((item, index) => (
          <div key={index} className="bg-highlight p-4 lg:p-8 rounded-lg">
            {item.icon && (
              <DynamicIcon iconName={item.icon} size={42} className="text-primary-500" />
            )}
            <h4 className="my-8">{item.title}</h4>
            <p className="mb-8 text-lg">{item.text}</p>
            {item.link.type !== "none" && <Type4 variant="light" link={item.link} />}
          </div>
        ))}
      </div>
    </BlockContainer>
  )
}
