import { BlockContainer } from "@/blocks/BlockContainer"
import { CmsLink } from "@/components/CmsLink"
import { DynamicIcon } from "@/components/dynamic-icon"
import { Cards } from "@payload-types"

export const CardsComponent: React.FC<Cards> = (props) => {
  const { items, bgColor } = props

  return (
    <BlockContainer bgColor={bgColor} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {(items || []).map((item, index) => (
          <CmsLink
            type="reference"
            reference={item.reference}
            key={index}
            className="bg-white group p-4 lg:p-8 rounded-[16px] hover:-translate-y-1 transition"
          >
            <div>
              {item.icon && (
                <div className="inline-flex rounded-full mb-8 p-4 bg-secondary">
                  <DynamicIcon
                    iconName={item.icon}
                    size={32}
                    className="transition group-hover:rotate-12"
                  />
                </div>
              )}
              <h4 className="mb-8">{item.title}</h4>
              <p>{item.text}</p>
            </div>
          </CmsLink>
        ))}
      </div>
    </BlockContainer>
  )
}
