import { BlockContainer } from "@/blocks/BlockContainer"
import Badge from "@/components/badge"
import { Process } from "@payload-types"

export const ProcessComponent: React.FC<Process> = (props) => {
  const { items, title, subtitle, text } = props

  return (
    <BlockContainer {...props}>
      {subtitle && (
        <div className="mb-8">
          <Badge showIcon={false} text={subtitle} />
        </div>
      )}
      <div className="mb-12 lg:flex justify-between items-top">
        <h3 className="max-w-lg">{title}</h3>
        <p className="mt-8 lg:mt-0 lg:w-1/2 lg:ml-auto">{text}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {(items || []).map((item, index) => (
          <div key={index} className="bg-highlight p-4 lg:p-8 rounded-lg">
            <div className="inline-block bg-success rounded-full px-3 py-1.5 font-mono font-medium uppercase">{`Stap ${index + 1}`}</div>
            <h4 className="my-4">{item.title}</h4>
            <p className="max-w-md text-lg">{item.text}</p>
          </div>
        ))}
      </div>
    </BlockContainer>
  )
}
