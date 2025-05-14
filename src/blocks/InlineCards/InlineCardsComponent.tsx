import { DynamicIcon } from "@/components/dynamic-icon"
import { InlineCards } from "@payload-types"

export const InlineCardsComponent: React.FC<InlineCards> = (props) => {
  const { items } = props

  return (
    <div className="not-prose my-8 space-y-3">
      {(items || []).map((item, index) => (
        <div
          key={index}
          className="bg-primary-300 text-foreground rounded-xl flex gap-4 items-center p-4"
        >
          <div className="bg-primary-500 p-2 rounded-full">
            <DynamicIcon iconName={item.icon} size={32} className="shrink-0 text-white" />
          </div>
          <div>
            <p className="font-semibold text-lg">{item.title}</p>
            <p className="text-base">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
