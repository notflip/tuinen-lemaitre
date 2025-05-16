import { getCachedGlobal } from "@/utils/getGlobals"
import { Setting } from "@payload-types"
import StickyNavbar from "@/components/nav/sticky-nav"

type Props = {
  settings: Setting
}
export const Nav = async ({ settings }: Props) => {
  const navigationMain = await getCachedGlobal("navigation_main", 1)()

  return (
    <section>
      <div className="flex items-center justify-between">
        <StickyNavbar items={navigationMain.items} link={navigationMain.link} settings={settings} />
      </div>
    </section>
  )
}
