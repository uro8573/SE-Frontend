"use client";

import Image from "next/image";

export default function CustomerReviewSection() {
    const reviews = [
        {
            user: "@nomad",
            userImg: "/res/img/home/User_Profile.png",
            hotel: "Blue Fern Lodge",
            review:
                "Loved the calm, peaceful atmosphere and cozy surroundings. Woke up to birdsong and fresh air — exactly what I needed!",
            title: "hotel Image",
            hotelImg: "/res/img/home/Blue_Fern_Lodge.jpg",
        },
        {
            user: "@vintagevibes",
            userImg: "/res/img/home/User_Profile.png",
            hotel: "The Velvet Lantern",
            review:
                "This place feels like stepping into a romantic novel. The vintage decor is gorgeous, and the staff made our anniversary weekend extra special.",
            title: "hotel Image",
            hotelImg: "/res/img/home/The_Velvet_Lantern.jpg",
        },
        {
            user: "@cityhopper22",
            userImg: "/res/img/home/User_Profile.png",
            hotel: "Urban Nest Hotel",
            review:
                "Super convenient location! Room was sleek and clean, perfect for working during the day and exploring the city at night.",
            title: "hotel Image",
            hotelImg: "/res/img/home/Urban_Nest_Hotel.jpg",
        },
        {
            user: "@skyline_dreamer",
            userImg: "/res/img/home/User_Profile.png",
            hotel: "Celestia Horizon",
            review:
                "Those views are unreal — we watched the sunset from our balcony and felt like we were floating. Total luxury, worth every penny.",
            title: "hotel Image",
            hotelImg: "/res/img/home/Celestia_Horizon.jpg",
        },
        {
            user: "@beachbum",
            userImg: "/res/img/home/User_Profile.png",
            hotel: "Sundara Bay Resort",
            review:
                "This place is paradise! Crystal-clear water, and cocktails by the beach — didn’t want to leave. Already planning my next trip back.",
            title: "hotel Image",
            hotelImg: "/res/img/home/Sundara_Bay_Resort.jpg",
        },
    ];

    const reviewCards = reviews.map((review, i) => (
        <div
            key={i}
            className="bg-transparent-bg min-w-[450px] max-w-[450px] snap-start p-6 flex flex-col justify-start items-start gap-6 rounded-2xl"
        >
            <div className="flex flex-row gap-4 justify-start items-center">
                <div className="relative w-16 h-16 bg-gray-100 rounded-full aspect-square overflow-hidden">
                    <Image
                        src={review.userImg}
                        alt={review.user}
                        fill
                        priority={i === 0}
                        className="object-cover rounded-2xl"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="text-h4-heading text-primary-dark">{review.user}</h4>
                    <p className="text-p3-paragraphy-small text-ct-light-dark">
                        {review.hotel}
                    </p>
                </div>
            </div>

            <p className="h-24 text-p3-paragraphy-small text-primary-dark">
                {review.review}
            </p>

            <div className="relative w-full h-[319px] bg-gray-100 rounded-2xl overflow-hidden">
                <Image
                    src={review.hotelImg}
                    alt={review.title}
                    fill
                    priority={i === 0}
                    className="object-cover rounded-2xl"
                />
            </div>
        </div>
    ));

    return (
        <section className="w-full text-black flex flex-col items-center justify-center gap-12">
            <h5 className="text-h5-heading text-ct-dark-grey">
                Customer Reviews
            </h5>

            <h3 className="text-h3-heading text-primary-dark text-center">
                Let’s Hear How Their Experiences
                <br />
                Use Our Platform
            </h3>

            {/* Card Container */}
            <div className="w-full flex flex-row overflow-hidden gap-6">
                <div className="flex flex-row gap-6 animate-loop-scroll">
                    {reviewCards}
                </div>
                <div className="flex flex-row gap-6 animate-loop-scroll" aria-hidden="true">
                    {reviewCards}
                </div>
            </div>
        </section>
    );
}
