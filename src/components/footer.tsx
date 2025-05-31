import { getCachedGlobal } from "@/utils/getGlobals"
import { CmsLink } from "./cms-link"
import Link from "next/link"
import SocialMediaIcon from "./social-media-icon"
import { ImageBox } from "@/components/image-box"

export async function Footer() {
  const siteSettings = await getCachedGlobal("settings")()
  const footer = await getCachedGlobal("footer")()

  return (
    <footer className="pt-24 pb-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-12 2xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="lg:col-span-2">
            <ImageBox
              disableBlurhash
              media={siteSettings.logo}
              className="w-[160px] mb-12"
              sizes="160px"
            />
            <p className="whitespace-pre">{siteSettings.company_info}</p>
          </div>

          {(footer.columns || []).map((column, index) => (
            <div key={index}>
              <p className="font-semibold text-foreground mb-3">{column.title}</p>
              <ul className="space-y-3">
                {(column.links || []).map(({ link }, index) => (
                  <li key={index} className="text-lg">
                    <CmsLink {...link} type="reference" className="hover:underline" />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:text-right lg:col-end-5">
            <p className="text-foreground font-semibold mb-3">Contact</p>
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
                  <Link href={`tel:${siteSettings.website_phone.replace(/[^+\d]/g, "")}`}>
                    {siteSettings.website_phone}
                  </Link>
                </li>
              )}
            </ul>
            <div className="mt-8 flex space-x-2 justify-end">
              {(siteSettings.social_links || []).map((link, index) => (
                <div key={index}>
                  <SocialMediaIcon url={link.url} size={24} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-blue-50 text-blue-950">
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-16">
            <div className="text-base">
              &copy; {new Date().getFullYear()} {siteSettings.website_title}
            </div>
            {footer.privacyPolicyLink && (
              <CmsLink
                label="Privacy Policy"
                type="reference"
                reference={footer.privacyPolicyLink}
                className="text-base"
              />
            )}
            {footer.cookiePolicyLink && (
              <CmsLink
                label="Cookie Policy"
                type="reference"
                reference={footer.cookiePolicyLink}
                className="text-base"
              />
            )}
            {footer.termsAndConditionsLink && (
              <CmsLink
                label="Terms and conditions"
                type="reference"
                reference={footer.termsAndConditionsLink}
                className="text-base"
              />
            )}
            <div className="ml-auto">Website by <a target="_blank" className="text-base underline underline-offset-4" href="https://studiomonty.be">Studiomonty.be</a></div>
          </div>
        </div>
      </div>
    </footer>
  )
}
