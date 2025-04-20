// import Image from "next/image";

// export default function CustomerReviewSection() {
//     return (
//         <section className="py-16 px-6 max-w-7xl mx-auto">
//             <h2 className="text-3xl font-bold mb-8 text-center">
//                 Let’s Hear How Their Experiences Use Our Platform
//             </h2>
//             <div className="flex overflow-x-auto space-x-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 pb-2">
//                 {[
//                     {
//                         user: "@nomad",
//                         hotel: "Blue Fern Lodge",
//                         review: "Loved the calm, peaceful atmosphere and cozy surroundings. Woke up to birdsong and fresh air — exactly what I needed!",
//                         img: "/images/review1.jpg",
//                     },
//                     {
//                         user: "@vintagevibes",
//                         hotel: "The Velvet Lantern",
//                         review: "This place feels like stepping into a romantic novel. The vintage decor is gorgeous, and the staff made our anniversary weekend extra special.",
//                         img: "/images/review2.jpg",
//                     },
//                     {
//                         user: "@cityhopper22",
//                         hotel: "Urban Nest Hotel",
//                         review: "Super convenient location! Room was sleek and clean, perfect for working during the day and exploring the city at night.",
//                         img: "/images/review3.jpg",
//                     },
//                     {
//                         user: "@skyline_dreamer",
//                         hotel: "Celestia Horizon",
//                         review: "Those views are unreal — we watched the sunset from our balcony and felt like we were floating. Total luxury, worth every penny.",
//                         img: "/images/review4.jpg",
//                     },
//                     {
//                         user: "@beachbum",
//                         hotel: "Sundara Bay Resort",
//                         review: "This place is paradise! Crystal-clear water, and cocktails by the beach — didn’t want to leave. Already planning my next trip back.",
//                         img: "/images/review5.jpg",
//                     },
//                 ].map((review, i) => (
//                     <div
//                         key={i}
//                         className="min-w-[280px] max-w-sm flex-shrink-0 rounded-lg shadow-md overflow-hidden bg-white"
//                     >
//                         <div className="p-4">
//                             <p className="text-sm text-gray-600">
//                                 {review.hotel}
//                             </p>
//                             <h4 className="font-semibold">{review.user}</h4>
//                             <p className="text-sm mt-2">{review.review}</p>
//                         </div>
//                         <Image
//                             src={review.img}
//                             alt={review.user}
//                             width={300}
//                             height={180}
//                             className="w-full h-[180px] object-cover"
//                         />
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// }



import Image from "next/image";
import HotelTag from "./HotelTag";

export default function CustomerReviewSection() {
    const reviews = [
        {
            user: "@nomad",
            userImg: "/images/review1.jpg",
            hotel: "Blue Fern Lodge",
            review: "Loved the calm, peaceful atmosphere and cozy surroundings. Woke up to birdsong and fresh air — exactly what I needed!",
            title: "hotel Image",
            hotelImg: "/images/review1.jpg",
        },
        {
            user: "@vintagevibes",
            userImg: "/images/review1.jpg",
            hotel: "The Velvet Lantern",
            review: "This place feels like stepping into a romantic novel. The vintage decor is gorgeous, and the staff made our anniversary weekend extra special.",
            title: "hotel Image",
            hotelImg: "/images/review2.jpg",
        },
        {
            user: "@cityhopper22",
            userImg: "/images/review1.jpg",
            hotel: "Urban Nest Hotel",
            review: "Super convenient location! Room was sleek and clean, perfect for working during the day and exploring the city at night.",
            title: "hotel Image",
            hotelImg: "/images/review3.jpg",
        },
        {
            user: "@skyline_dreamer",
            userImg: "/images/review1.jpg",
            hotel: "Celestia Horizon",
            review: "Those views are unreal — we watched the sunset from our balcony and felt like we were floating. Total luxury, worth every penny.",
            title: "hotel Image",
            hotelImg: "/images/review4.jpg",
        },
        {
            user: "@beachbum",
            userImg: "/images/review1.jpg",
            hotel: "Sundara Bay Resort",
            hotelImg: "/images/review5.jpg",
            title: "hotel Image",
            review: "This place is paradise! Crystal-clear water, and cocktails by the beach — didn’t want to leave. Already planning my next trip back.",
        },
    ];

    const reviewCards = reviews.map((review, i) => (
        <div
            key={i}
            className="w-full flex flex-col justify-start items-start gap-4"
        >
            <div className="flex flex-row gap-4 justify-start items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full">

                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-h4-heading text-primary-dark">{review.user}</h4>
                    <p className="text-p3-paragraphy-small text-primary-dark">
                        {review.hotel}
                    </p>
                </div>
            </div>

            <p className="text-p3-paragraphy-small text-primary-dark">
                {review.review}
            </p>

            <div className="relative w-full bg-gray-100 rounded-2xl aspect-square overflow-hidden">
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
        <section className="bg-black/10 w-full px-4 md:px-8 text-black flex flex-col items-center justify-center gap-12">
                <h5 className="text-h5-heading text-ct-dark-grey">
                    Customer Reviews
                </h5>

                <h3 className="text-h3-heading text-primary-dark text-center">
                    Let’s Hear How Their Experiences<br />
                    Use Our Platform
                </h3>

                {/* Card Container */}
                <div className="bg-black/10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviewCards}
                </div>
        </section>
    );
}
