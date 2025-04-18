import Image from "next/image";

export default function CustomerReviewSection() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Let’s Hear How Their Experiences Use Our Platform
      </h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 pb-2">
        {[
          {
            user: "@nomad",
            hotel: "Blue Fern Lodge",
            review:
              "Loved the calm, peaceful atmosphere and cozy surroundings. Woke up to birdsong and fresh air — exactly what I needed!",
            img: "/images/review1.jpg",
          },
          {
            user: "@vintagevibes",
            hotel: "The Velvet Lantern",
            review:
              "This place feels like stepping into a romantic novel. The vintage decor is gorgeous, and the staff made our anniversary weekend extra special.",
            img: "/images/review2.jpg",
          },
          {
            user: "@cityhopper22",
            hotel: "Urban Nest Hotel",
            review:
              "Super convenient location! Room was sleek and clean, perfect for working during the day and exploring the city at night.",
            img: "/images/review3.jpg",
          },
          {
            user: "@skyline_dreamer",
            hotel: "Celestia Horizon",
            review:
              "Those views are unreal — we watched the sunset from our balcony and felt like we were floating. Total luxury, worth every penny.",
            img: "/images/review4.jpg",
          },
          {
            user: "@beachbum",
            hotel: "Sundara Bay Resort",
            review:
              "This place is paradise! Crystal-clear water, and cocktails by the beach — didn’t want to leave. Already planning my next trip back.",
            img: "/images/review5.jpg",
          },
        ].map((review, i) => (
          <div
            key={i}
            className="min-w-[280px] max-w-sm flex-shrink-0 rounded-lg shadow-md overflow-hidden bg-white"
          >
            <div className="p-4">
              <p className="text-sm text-gray-600">{review.hotel}</p>
              <h4 className="font-semibold">{review.user}</h4>
              <p className="text-sm mt-2">{review.review}</p>
            </div>
            <Image
              src={review.img}
              alt={review.user}
              width={300}
              height={180}
              className="w-full h-[180px] object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
