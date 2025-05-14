import { getCachedGlobal } from "@/utils/getGlobals"
import { CmsLink } from "./CmsLink"
import Link from "next/link"
import NewsletterForm from "./newsletter-form"
import SocialMediaIcon from "./social-media-icon"
import { Media } from "@payload-types"
import { ImageBox } from "@/components/ImageBox"

export async function Footer() {
  const siteSettings = await getCachedGlobal("settings")()
  const footer = await getCachedGlobal("footer")()

  return (
    <footer className="pt-[6rem] pb-[3rem]">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-12 2xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-3">
            <ImageBox
              disableBlurhash
              media={siteSettings.logo}
              className="w-[120px] mb-6"
              sizes="120px"
            />
            <p className="text-blue-950 max-w-sm mb-6">
              Een team van de juiste experts, die hun jarenlange kennis
              van web, marketing en copywriting samenbrengen.
            </p>
            <p className="whitespace-pre">{siteSettings.company_info}</p>
          </div>

          {(footer.columns || []).map((column, index) => (
            <div key={index}>
              <h2 className="p text-foreground font-bold mb-3">
                {column.title}
              </h2>
              <ul className="space-y-3">
                {(column.links || []).map(({ link }, index) => (
                  <li key={index}>
                    <CmsLink
                      {...link}
                      type="reference"
                      className="hover:underline"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:text-right">
            <h2 className="p text-foreground font-bold mb-3">Contact</h2>
            <ul className="space-y-3">
              {siteSettings.website_emails?.length > 0 && (
                <li>
                  <Link href={`mailto:${siteSettings.website_emails[0].email}`}>
                    {siteSettings.website_emails[0].email}
                  </Link>
                </li>
              )}
              {siteSettings.website_phone && (
                <li>
                  <Link
                    href={`tel:${siteSettings.website_phone.replace(/[^+\d]/g, "")}`}
                  >
                    {siteSettings.website_phone}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-blue-50 text-blue-950">
          <div className="flex flex-col md:flex-row items-center justify-between pt-8">
            <div className="flex items-center gap-8 text-sm">
              <div className="text-sm">
                &copy; {new Date().getFullYear()} {siteSettings.website_title}
              </div>
              {footer.privacyPolicyLink && (
                <CmsLink
                  label="Privacy Policy"
                  type="reference"
                  reference={footer.privacyPolicyLink}
                />
              )}
              {footer.cookiePolicyLink && (
                <CmsLink
                  label="Cookie Policy"
                  type="reference"
                  reference={footer.cookiePolicyLink}
                />
              )}
              {footer.termsAndConditionsLink && (
                <CmsLink
                  label="Terms and conditions"
                  type="reference"
                  reference={footer.termsAndConditionsLink}
                />
              )}
            </div>

            <div className="flex space-x-4">
              {(siteSettings.social_links || []).map((link, index) => (
                <div className="bg-beige-50 p-4 rounded-full" key={index}>
                  <SocialMediaIcon url={link.url} size={24} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
