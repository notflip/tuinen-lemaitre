import { getPayload } from "payload"
import config from "@payload-config"
import { nonDeletablePages } from "@/config"

// We can expand the nonDeletablePages later to become an object that includes (addToFooter),
// So we can later quickly scaffold the main en footer navigations.
// const footerLinks = ['blog', 'privacy-policy']

async function run() {
  try {
    const payload = await getPayload({ config })

    // Loop through the protectedPages array
    for (const slug of nonDeletablePages) {
      // Check if the page with the current slug already exists
      const existingPage = await payload.find({
        collection: "pages",
        where: { slug: { equals: slug } },
      })

      if (existingPage.docs.length > 0) {
        console.log(`Page with slug "${slug}" already exists. Skipping seed.`)
        continue
      }

      // Create the page if it doesn't exist
      await payload.create({
        collection: "pages",
        context: {
          disableRevalidate: true,
        },
        data: {
          title: slug.charAt(0).toUpperCase() + slug.slice(1), // Capitalize the slug for the title
          slug,
          _status: "published",
          seo: {
            title: slug.charAt(0).toUpperCase() + slug.slice(1), // Capitalize the slug for the SEO title
            description: `This is the ${slug} page`,
          },
        },
      })

      // Add page to footer, if required
      // if (footerLinks.includes(slug)) {
      //   await payload.updateGlobal({
      //     slug: 'navigation_footer_links',
      //     context: {
      //       disableRevalidate: true,
      //     },
      //     data: {
      //       items: [
      //         {
      //           label: slug.charAt(0).toUpperCase() + slug.slice(1),
      //           reference: {
      //             relationTo: 'pages',
      //             value: {
      //               id: result.id,
      //               slug: slug
      //             }
      //           }
      //         }
      //       ]
      //     }
      //   })
      // }

      console.log(`Seeded page with slug "${slug}".`)
    }
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

  process.exit(0)
}

await run()
