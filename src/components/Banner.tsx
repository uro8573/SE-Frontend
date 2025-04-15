'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation'

export default function Banner() {

    const router = useRouter();

    return (
        <div className="block m-[0] w-[90vw] h-[80vh] relative">
            <Image 
            src={`/img/banner.png`}
            alt="Banner"
            fill={true}
            style={{objectFit:"cover"}}
            className="rounded-xl"/>
            <div className="relative flex flex-col gap-5 h-full content-center items-center z-20 top-[100px] text-center">
                <div>
                    <span className="text-[#F3E158] text-6xl font-bold">UFA</span>
                    <span className="text-[#D3C44E] text-6xl font-bold">888</span>
                </div>
                <div className='text-2xl'>Get the hotel which you want</div>
                <button className="text-[16px] bg-black text-white px-[24px] py-[14px] rounded-lg hover:shadow-xl hover:bg-white hover:text-black duration-300" 
                onClick={(e) => {
                    e.stopPropagation();
                    router.push('/hotel');
                }}>
                    See All Hotels
                </button>
            </div>
        </div>
    )
}