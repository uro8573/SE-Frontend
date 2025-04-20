"use client";

import { useRef } from "react";
import Image from "next/image";
import HotelTag from "./HotelTag";

export default function CustomerReviewSection() {
    const reviews = [
        {
            user: "@nomad",
            userImg: "/images/review1.jpg",
            hotel: "Blue Fern Lodge",
            review:
                "Loved the calm, peaceful atmosphere and cozy surroundings. Woke up to birdsong and fresh air — exactly what I needed!",
            title: "hotel Image",
            hotelImg: "/images/review1.jpg",
        },
        {
            user: "@vintagevibes",
            userImg: "/images/review1.jpg",
            hotel: "The Velvet Lantern",
            review:
                "This place feels like stepping into a romantic novel. The vintage decor is gorgeous, and the staff made our anniversary weekend extra special.",
            title: "hotel Image",
            hotelImg: "/images/review2.jpg",
        },
        {
            user: "@cityhopper22",
            userImg: "/images/review1.jpg",
            hotel: "Urban Nest Hotel",
            review:
                "Super convenient location! Room was sleek and clean, perfect for working during the day and exploring the city at night.",
            title: "hotel Image",
            hotelImg: "/images/review3.jpg",
        },
        {
            user: "@skyline_dreamer",
            userImg: "/images/review1.jpg",
            hotel: "Celestia Horizon",
            review:
                "Those views are unreal — we watched the sunset from our balcony and felt like we were floating. Total luxury, worth every penny.",
            title: "hotel Image",
            hotelImg: "/images/review4.jpg",
        },
        {
            user: "@beachbum",
            userImg: "/images/review1.jpg",
            hotel: "Sundara Bay Resort",
            review:
                "This place is paradise! Crystal-clear water, and cocktails by the beach — didn’t want to leave. Already planning my next trip back.",
            title: "hotel Image",
            hotelImg: "/images/review5.jpg",
        },
    ];

    const reviewCards = reviews.map((review, i) => (
        <div
            key={i}
            className="bg-black/10 min-w-[450px] snap-start p-6 flex flex-col justify-start items-start gap-6 rounded-2xl"
        >
            <div className="flex flex-row gap-4 justify-start items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full">
                    {/* รูปโปรไฟล์ผู้ใช้ถ้ามี */}
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="text-h4-heading text-primary-dark">{review.user}</h4>
                    <p className="text-p3-paragraphy-small text-primary-dark">
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
        <section className="bg-black/10 w-full text-black flex flex-col items-center justify-center gap-12">
            <h5 className="text-h5-heading text-ct-dark-grey">
                Customer Reviews
            </h5>

            <h3 className="text-h3-heading text-primary-dark text-center">
                Let’s Hear How Their Experiences
                <br />
                Use Our Platform
            </h3>

            {/* Card Container */}
            <div className="w-full flex flex-row gap-6 overflow-hidden">
                <div className="bg-black/10 flex flex-row gap-6 animate-loop-scroll">
                    {reviewCards}
                </div>
                <div className="bg-black/10 flex flex-row gap-6 animate-loop-scroll" aria-hidden="true">
                    {reviewCards}
                </div>
            </div>
        </section>
    );
}
