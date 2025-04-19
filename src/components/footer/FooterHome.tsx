import Link from "next/link"

import Contact from "./Contact"

export default function FooterHome() {
    return (
        <div className="w-full px-8 pb-24 text-black flex flex-col items-center gap-[3rem]">
            <div className="w-full max-w-screen-2xl flex flex-row justify-between">
                <h2 className="text-hs-heading ">
                    Find a Stay that<br />
                    feels like Home
                </h2>
                <div className="flex flex-col gap-[16px] items-end">
                    <p className="text-p1-paragraphy-large">Tungtee888@gmail.com</p>
                    <p className="text-p1-paragraphy-large">080-269-9284</p>
                    <div className="flex flex-row gap-[16px]">
                        <Contact message="Gmail" iconUrl="/res/svg/Social-Icons-gmail.svg" />
                        <Contact message="Instagram" iconUrl="/res/svg/Social-Icons-instagram.svg" />
                        <Contact message="Discord" iconUrl="/res/svg/Social-Icons-discord.svg" />
                    </div>
                </div>
            </div>

            <div className="w-full max-w-screen-2xl h-[5px] bg-gray-300 my-4" />

            <div className="w-full max-w-screen-2xl flex flex-row justify-between gap-[6rem]">
                <div className="flex flex-row gap-[6rem]">
                    <div className="flex flex-col gap-[1rem]">
                        <h4 className="text-h4-heading">Page</h4>
                        <p className="text-p3-paragraphy-small">Home</p>
                        <p className="text-p3-paragraphy-small">Search</p>
                        <p className="text-p3-paragraphy-small">Manage</p>
                        <p className="text-p3-paragraphy-small">About us</p>
                    </div>

                    <div className="flex flex-col gap-[1rem]">
                        <h4 className="text-h4-heading">Features</h4>
                        <p className="text-p3-paragraphy-small">Find Hotels</p>
                        <p className="text-p3-paragraphy-small">Book Reservation</p>
                        <p className="text-p3-paragraphy-small">View Reservation</p>
                        <p className="text-p3-paragraphy-small">Reviews</p>
                    </div>

                    <div className="flex flex-col gap-[1rem]">
                        <h4 className="text-h4-heading">Cookies</h4>
                        <p className="text-p3-paragraphy-small">Data Collect</p>
                        <p className="text-p3-paragraphy-small">Term</p>
                        <p className="text-p3-paragraphy-small">Privacy</p>
                    </div>
                </div>
                <div className="flex flex-col gap-[1rem] bg-transparent-bg p-[1rem] rounded-[1rem]">
                    <div className="flex flex-row gap-[3rem]">
                        <h4 className="text-h4-heading">
                            Don’t want to miss<br/>
                            this opportunity?
                        </h4>
                        <p className="text-p3-paragraphy-small">
                            Act now to secure exclusive<br/>
                            access before it’s gone.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}