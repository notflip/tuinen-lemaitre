import Link from "next/link"
import {
  FaEnvelope,
  FaEnvelopeOpen,
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6"
import { IconType } from "react-icons"

import { TbMail } from "react-icons/tb"

interface IconMapping {
  Icon: IconType
  domain: string
}

const iconMap: IconMapping[] = [
  { domain: "facebook.com", Icon: FaFacebook },
  { domain: "instagram.com", Icon: FaInstagram },
  { domain: "twitter.com", Icon: FaXTwitter },
  { domain: "x.com", Icon: FaXTwitter },
  { domain: "linkedin.com", Icon: FaLinkedin },
  { domain: "youtube.com", Icon: FaYoutube },
  { domain: "tiktok.com", Icon: FaTiktok },
]

const getSocialIcon = (url: string, size: number) => {
  // Check if url is an email address
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(url)
  if (isEmail) {
    return <TbMail size={size} />
  }

  const mapping = iconMap.find(({ domain }) => url.includes(domain))
  const IconComponent = mapping ? mapping.Icon : FaGlobe
  return <IconComponent size={size} />
}

interface SocialMediaIconProps {
  size?: number
  url: string
}

const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({ url, size = 20 }) => {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(url)
  const href = isEmail ? `mailto:${url}` : url
  return (
    <Link
      aria-label="Social link"
      href={href}
      {...(!isEmail && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      className="block rounded-full p-4 bg-primary-300 hover:bg-primary-500 text-foreground!"
    >
      {getSocialIcon(url, size)}
    </Link>
  )
}

export default SocialMediaIcon
