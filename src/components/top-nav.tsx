import { Setting } from "@payload-types"
import { FaPhone, FaRegPaperPlane } from "react-icons/fa6"
import SocialMediaIcon from "@/components/social-media-icon"

type Props = {
  settings: Setting
}
export default function TopNav(props: Props) {
  const { settings } = props
  const { website_emails, website_phone, social_links } = settings

  return (
    <div className="bg-secondary">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-12 2xl:px-16 h-12">
        <div className="h-full flex items-center justify-between">
          <div className="flex items-center justify-between gap-6">
            {website_phone && (
              <div className="flex items-center gap-2">
                <FaPhone />
                <a
                  className="hover:underline underline-offset-4"
                  href={`tel:${website_phone.replace(/[^+\d]/g, "")}`}
                >
                  {website_phone}
                </a>
              </div>
            )}
            {website_emails?.length && (
              <div className="flex items-center gap-2">
                <FaRegPaperPlane />
                <a
                  className="hover:underline underline-offset-4"
                  href={`mailto:${website_emails[0].email}`}
                >
                  {website_emails[0].email}
                </a>
              </div>
            )}
          </div>
          <div className="flex space-x-4">
            {(social_links || []).map((link, index) => (
              <div key={index}>
                <SocialMediaIcon url={link.url} size={20} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
