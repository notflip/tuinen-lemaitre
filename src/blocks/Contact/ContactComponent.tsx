import { Contact, Form as FormType } from "@payload-types"
import { BlockContainer } from "@/blocks/BlockContainer"
import { getCachedGlobal } from "@/utils/getGlobals"
import Link from "next/link"
import { TbMail, TbSocial } from "react-icons/tb"
import { Form } from "@/components/form/form"
import { ContactForm } from "@/components/contact-form"

export const ContactComponent: React.FC<Contact> = async (props) => {
  const { title, text, form } = props
  const siteSettings = await getCachedGlobal("settings")()

  const { social_links, website_emails } = siteSettings

  return (
    <BlockContainer {...props}>
      <div className="lg:flex lg:gap-16 lg:justify-between">
        <div className="w-full lg:w-1/2">
          <h2>{title}</h2>
          {text && <p className="mt-8 max-w-md">{text}</p>}

          {(website_emails || []).length > 0 && (
            <div className="mt-12 bg-highlight flex items-center gap-4 rounded-2xl p-6">
              <div>
                <div className="rounded-full bg-beige-500 p-3 text-white">
                  <TbMail size={32} />
                </div>
              </div>
              <div>
                <p className="h5 leading-tight">E-mail</p>
                <Link
                  className="h5 text-foreground underline"
                  href={`mailto:${siteSettings.website_emails[0].email}`}
                >
                  {siteSettings.website_emails[0].email}
                </Link>
              </div>
            </div>
          )}

          {(social_links || []).length > 0 && (
            <div className="mt-3 bg-highlight flex items-center gap-4 rounded-2xl p-6">
              <div>
                <div className="rounded-full bg-beige-500 p-3 text-white">
                  <TbSocial size={32} />
                </div>
              </div>
              <div>
                <p className="h5 leading-tight">Social media</p>
                {social_links?.map(({ url }, index) => {
                  const match = url.match(/https?:\/\/(www\.)?([^\.]+)\.com/)
                  const label = match?.[2]
                    ? match[2].charAt(0).toUpperCase() + match[2].slice(1)
                    : url

                  return (
                    <span key={index}>
                      <Link className="h5 text-foreground underline" target="_blank" href={url}>
                        {label}
                      </Link>
                      {index < social_links.length - 1 && ", "}
                    </span>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 lg:mt-0 w-full lg:w-1/2">
          <div className="space-y-6 bg-muted p-8 rounded-2xl">
            <h4>Neem contact op</h4>
            <Form form={form as FormType} />
          </div>
        </div>
      </div>
    </BlockContainer>
  )
}
