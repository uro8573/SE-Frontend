import Image from "next/image";

import HotelTag from "./HotelTag";

export default function TopHotelSection() {
    return (
        <section className="w-full px-4 md:px-8 text-black flex flex-col items-center justify-start gap-12">
            <div className="w-full max-w-screen-2xl flex flex-col justify-between item-start gap-8">
                <h5 className="text-h5-heading text-ct-dark-grey">
                    Top Hotels of 2024
                </h5>

                <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <h3 className="text-h3-heading text-primary-dark">
                        Our Most Amazing<br />
                        Visited Hotel on 2024
                    </h3>
                    <p className="text-h5-heading text-ct-dark-grey">
                        Take a look our best choice for the hotels of the year,<br />
                        we pick the hotels from our amazing customers.
                    </p>
                </div>

                {/* Card Container */}
                <div className="w-full flex justify-between items-start gap-6">
                    {/* Hotel Card */}
                    <div className="w-full sm:w-[48%] lg:w-[30%] flex flex-col justify-start items-start gap-4 min-w-0">
                        <div className="relative w-full bg-gray-100 rounded-2xl aspect-square overflow-hidden">
                            <Image
                                src="/res/img/home/topFirstHotel.jpg"
                                alt="The Havencrest"
                                fill
                                className="object-cover rounded-2xl"
                            />
                        </div>
                        <h4 className="text-h4-heading text-primary-dark">The Havencrest</h4>
                        <p className="text-p3-paragraphy-small text-primary-dark">
                            A serene escape nestled above the city skyline, offering luxury with a view.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <HotelTag message="Luxury"/>
                            <HotelTag message="City View"/>
                            <HotelTag message="Modern"/>
                        </div>
                    </div>

                    <div className="w-full sm:w-[48%] lg:w-[38%] flex flex-col justify-start items-start gap-4 min-w-0">
                        <div className="relative w-full bg-gray-100 rounded-2xl aspect-square">
                            <Image
                                src="/res/img/home/topSecondHotel.jpg"
                                alt="Lunara Inn"
                                fill
                                className="object-cover rounded-2xl"
                            />
                        </div>
                        <h4 className="text-h4-heading text-primary-dark">Lunara Inn</h4>
                        <p className="text-p3-paragraphy-small text-primary-dark">
                            A dreamy boutique stay inspired by moonlit nights and peaceful atmospheres.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <HotelTag message="Boutique"/>
                            <HotelTag message="Romantic"/>
                            <HotelTag message="Quiet"/>
                        </div>
                    </div>

                    <div className="w-full sm:w-[48%] lg:w-[30%] flex flex-col justify-start items-start gap-4 min-w-0">
                        <div className="relative w-full bg-gray-100 rounded-2xl aspect-square">
                            <Image
                                src="/res/img/home/topThridHotel.jpg"
                                alt="Blue Fern Lodge"
                                fill
                                className="object-cover rounded-2xl"
                            />
                        </div>
                        <h4 className="text-h4-heading text-primary-dark">Blue Fern Lodge</h4>
                        <p className="text-p3-paragraphy-small text-primary-dark">
                            A cozy nature-inspired retreat surrounded by greenery and calm vibes.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <HotelTag message="Nature"/>
                            <HotelTag message="Lodge"/>
                            <HotelTag message="Relaxing"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
