"use client";
import { useRouter } from "next/navigation";

export default function Banner() {
    const router = useRouter();

    return (
        <section
            className="relative h-screen bg-cover bg-center"
            style={{ backgroundImage: "url(/res/img/home/banner.jpg)" }}
        >
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white px-4 text-center gap-9">
                <h1 className="text-h1-heading">
                    Find The Room<br />
                    That Feels Just Right
                </h1>

                <div className="bg-ct-white rounded-2xl p-4 flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 lg:gap-x-4 justify-between items-center w-full max-w-5xl">
                    {/* Where */}
                    <div className="flex flex-col gap-2.5 justify-center items-start w-full lg:w-[160px]">
                        <label className="text-h5-heading text-primary-dark">Where</label>
                        <input
                            type="text"
                            placeholder="Search Location"
                            className="text-p3-paragraphy-small text-ct-dark-grey placeholder-ct-dark-grey bg-transparent w-full focus:outline-none"
                        />
                    </div>

                    {/* Divider */}
                    <div className="hidden lg:block w-[4px] h-[56px] bg-ct-light-grey rounded-full" />

                    {/* Check In */}
                    <div className="flex flex-col gap-2.5 justify-center items-start w-full lg:w-[160px]">
                        <label className="text-h5-heading text-primary-dark">Check In</label>
                        <input
                            type="text"
                            placeholder="Select check-in"
                            className="text-p3-paragraphy-small text-ct-dark-grey placeholder-ct-dark-grey bg-transparent w-full focus:outline-none"
                        />
                    </div>

                    {/* Divider */}
                    <div className="hidden lg:block w-[4px] h-[56px] bg-ct-light-grey rounded-full" />

                    {/* Check Out */}
                    <div className="flex flex-col gap-2.5 justify-center items-start w-full lg:w-[160px]">
                        <label className="text-h5-heading text-primary-dark">Check Out</label>
                        <input
                            type="text"
                            placeholder="Select check-out"
                            className="text-p3-paragraphy-small text-ct-dark-grey placeholder-ct-dark-grey bg-transparent w-full focus:outline-none"
                        />
                    </div>

                    {/* Divider */}
                    <div className="hidden lg:block w-[4px] h-[56px] bg-ct-light-grey rounded-full" />

                    {/* Guest */}
                    <div className="flex flex-col gap-2.5 justify-center items-start w-full lg:w-[160px]">
                        <label className="text-h5-heading text-primary-dark">Guest</label>
                        <input
                            type="text"
                            placeholder="Number of guests"
                            className="text-p3-paragraphy-small text-ct-dark-grey placeholder-ct-dark-grey bg-transparent w-full focus:outline-none"
                        />
                    </div>

                    {/* Search Button */}
                    <div className="w-full lg:w-[160px] flex items-center justify-center">
                        <button className="w-full bg-primary-orange text-ui-label-semi-bold text-primary-dark py-4 px-6 rounded-[16px]">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
