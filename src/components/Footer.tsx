import Link from "next/link"

export default function Footer() {
    return (
        <div className="mt-[20%] h-[264px] w-full border-t-2 border-[#E6E6E6]">
            <div className="mt-[2%] flex justify-between">
                <div className="ml-[6%]">
                    <span className="text-[#F3E158] text-[28px] font-bold">UFA</span>
                    <span className="text-[#D3C44E] text-[28px] font-bold">888</span>
                </div>
                <div className="flex flex-col gap-5 text-black mr-[8%]">
                    <Link href="/">Home</Link>
                    <Link href="/hotel">Hotels</Link>
                    <Link href="/booking">Booking</Link>
                    <Link href="/contact">Contact Us</Link>
                </div>
            </div>
        </div>
    )
}