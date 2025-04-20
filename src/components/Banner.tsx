"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Banner() {
    const router = useRouter();

    return (
        <section
            className="relative h-[100vh] bg-cover bg-center"
            style={{ backgroundImage: "url(/res/img/home/bannerHome.jpg)" }}
        >
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white px-4 text-center gap-[36px]">
                <h1 className="text-h1-heading">
                    Find The Room<br />
                    That Feels Just Right
                </h1>
                <div className="bg-white rounded-[16px] p-[16px] flex flex-row gap-[16px]">
                    {/* Where */}
                    <div className="flex flex-col gap-[10px] justify-center items-start">
                        <label className="text-h5-heading text-primary-dark">
                            Where
                        </label>
                        <input
                            type="text"
                            placeholder="Search Location"
                            className="text-p3-paragraphy-small text-ct-dark-grey placeholder-ct-dark-grey bg-transparent w-[160px] focus:outline-none"
                        />
                    </div>

                    <div className="w-4 h-auto bg-red-500 mx-2 rounded-full " />
                    <div className="w-4 h-auto bg-green-500 mx-2 rounded-full" />

                    {/* Check In */}
                    <div className="flex flex-col gap-[10px] justify-center items-start">
                        <label className="text-h5-heading text-primary-dark">
                            Check In
                        </label>
                        <input
                            type="text"
                            placeholder="Select check-in"
                            className="text-p3-paragraphy-small text-ct-dark-grey placeholder-ct-dark-grey bg-transparent w-[160px] focus:outline-none"
                        />
                    </div>

                    <div className="w-4 h-auto bg-green-500 mx-2 rounded-full" />

                    {/* Check Out */}
                    <div className="flex flex-col gap-[10px] justify-center items-start">
                        <label className="text-h5-heading text-primary-dark">
                            Check Out
                        </label>
                        <input
                            type="text"
                            placeholder="Select check-out"
                            className="text-p3-paragraphy-small text-ct-dark-grey placeholder-ct-dark-grey bg-transparent w-[160px] focus:outline-none"
                        />
                    </div>

                    <div className="w-4 h-auto bg-ct-light-grey mx-2 rounded-full" />

                    {/* Guest */}
                    <div className="flex flex-col gap-[10px] justify-center items-start">
                        <label className="text-h5-heading text-primary-dark">
                            Guest
                        </label>
                        <input
                            type="text"
                            placeholder="Number of guests"
                            className="text-p3-paragraphy-small text-ct-light-grey placeholder-ct-dark-grey bg-transparent w-[160px] focus:outline-none"
                        />
                    </div>

                    <div className="w-4 h-auto bg-ct-light-grey mx-2 rounded-full" />

                    {/* Search Button */}
                    <div className="flex items-center justify-center px-3 w-full">
                        <button className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 px-4 rounded-xl">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
