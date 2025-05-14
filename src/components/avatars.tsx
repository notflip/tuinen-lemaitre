import Image from "next/image"

export default async function Avatars() {
  return (
    <div className="flex">
      <div className="-ml-4">
        <Image
          width="60"
          height="60"
          src="/avatar-s.jpg"
          alt="Avatar Simon"
          className="w-[32px] h-[32px] rounded-full"
          style={{
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
      </div>
      <div className="-ml-4">
        <Image
          width="60"
          height="60"
          src="/avatar-m.jpg"
          alt="Avatar Miguel"
          className="w-[32px] h-[32px] rounded-full"
          style={{
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
      </div>
      <div className="-ml-4">
        <Image
          width="60"
          height="60"
          src="/avatar-j.jpg"
          alt="Avatar Jasmina"
          className="w-[32px] h-[32px] rounded-full"
          style={{
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
      </div>
    </div>
  )
}
