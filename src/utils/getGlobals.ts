import { unstable_cache } from "next/cache"
import { getGlobal } from "@/lib/payload"
import type { Config } from "@payload-types"

export const getCachedGlobal = <S extends keyof Config["globals"]>(
  slug: S,
  depth = 3,
) =>
  unstable_cache(() => getGlobal(slug, depth), [slug], {
    tags: [`global_${slug}`],
  }) as () => Promise<Config["globals"][S]>
