import Link from "next/link"

import Contact from "./Contact"

export default function FooterHome() {
    return (
        <div className="w-full bg-black/10 px-4 sm:px-10 md:px-20 lg:px-32 xl:px-40 2xl:px-[200px] text-black">
            <div className="w-full bg-black/10 flex flex-row justify-between">
                <h2 className="text-hs-heading ">
                    Find a Stay that<br/>
                    feels like Home
                </h2>
                <div className="flex flex-col gap-[16px] items-end">
                    <p className="text-p1-paragraphy-large">Tungtee888@gmail.com</p>
                    <p className="text-p1-paragraphy-large">080-269-9284</p>
                    <div className="flex flex-row gap-[16px]">
                        <Contact txt="Gmail" href=""/>
                        <Contact txt="Instagram" href=""/>
                        <Contact txt="Discord" href=""/>
                    </div>
                </div>
            </div>

            <div className="w-full h-[5px] bg-gray-300 my-4" />

            <div className="w-full bg-black/10 h-[100px]">

            </div>
        </div>
    )
}