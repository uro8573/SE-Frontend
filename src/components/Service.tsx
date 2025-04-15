import Image from "next/image"

export default function Service({title, imgSrc}:{title: string, imgSrc: string}) {
    return (
        <div className="w-[30%]">
            <div className={`w-full h-[312px] relative rounded-t-lg`}>
                <Image
                    src={imgSrc}
                    alt={title}
                    fill={true}
                    style={{objectFit: "fill"}}
                    className='object-cover rounded-lg'
                />
            </div>
            <span className="text-xl relative text-black">{title}</span>
        </div>
    )
}