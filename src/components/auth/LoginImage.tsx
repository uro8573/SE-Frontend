import Image from "next/image"

export default function LoginImage({ImgSrc, ImgAlt}:{ImgSrc:string, ImgAlt:string}) {
    return (
        <div className="hidden w-1/2 bg-[#f5f5f3] md:block">
            <div className="relative h-full w-full">
            <Image
                src={ImgSrc}
                alt={ImgAlt}
                fill
                className="object-cover"
                priority
            />
            </div>
        </div>
    )
}