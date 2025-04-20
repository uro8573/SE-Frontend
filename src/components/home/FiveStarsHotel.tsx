import Image from "next/image";
import HotelTag from "./HotelTag";

export default function FiveStarsHotel() {
    const hotels = [
        {
            title: "Silverpine Retreat",
            desc: "A peaceful mountain escape surrounded by whispering pines and fresh alpine air.",
            tags: ["Mountain", "Nature", "Wellness"],
            img: "/res/img/home/fiveStarsHotel-1.jpg",
        },
        {
            title: "The Velvet Lantern",
            desc: "An elegant, vintage-style hotel with warm lighting and timeless charm.",
            tags: ["Boutique", "Historic", "Romantic"],
            img: "/res/img/home/fiveStarsHotel-2.jpg",
        },
        {
            title: "Sundara Bay Resort",
            desc: "A sun-soaked beachfront haven with crystal waters and endless horizon views.",
            tags: ["Beachfront", "Luxury", "Tropical"],
            img: "/res/img/home/fiveStarsHotel-3.jpg",
        },
        {
            title: "Urban Nest Hotel",
            desc: "A sleek, modern space in the heart of the city — perfect for business and weekend stays alike.",
            tags: ["City", "Modern", "Business Friendly"],
            img: "/res/img/home/fiveStarsHotel-4.jpg",
        },
        {
            title: "The Willow Whisper Inn",
            desc: "A charming countryside inn blending rustic textures with cozy elegance.",
            tags: ["Countryside", "Rustic", "Cozy"],
            img: "/res/img/home/fiveStarsHotel-5.jpg",
        },
        {
            title: "Celestia Horizon",
            desc: "A sky-high sanctuary with panoramic views, blending celestial design with refined luxury.",
            tags: ["Luxury", "Skyline", "Modern Retreat"],
            img: "/res/img/home/fiveStarsHotel-6.jpg",
        },
    ];

    const hotelCards = hotels.map((hotel, i) => (
        <div
            key={i}
            className="w-full flex flex-col justify-start items-start gap-4"
        >
            <div className="relative w-full bg-gray-100 rounded-2xl aspect-square overflow-hidden">
                <Image
                    src={hotel.img}
                    alt={hotel.title}
                    fill
                    priority={i === 0}
                    className="object-cover rounded-2xl"
                />
            </div>
            <h4 className="text-h4-heading text-primary-dark">{hotel.title}</h4>
            <p className="text-p3-paragraphy-small text-primary-dark">
                {hotel.desc}
            </p>
            <div className="flex flex-wrap gap-2">
                {hotel.tags.map((tag, j) => (
                    <HotelTag key={j} message={tag} />
                ))}
            </div>
        </div>
    ));

    return (
        <section className="w-full px-4 md:px-8 text-black flex flex-col items-center justify-start gap-12">
            <div className="w-full max-w-screen-2xl flex flex-col justify-between items-start gap-8">
                <h5 className="text-h5-heading text-ct-dark-grey">
                    5 Stars Hotels
                </h5>

                <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <h3 className="text-h3-heading text-primary-dark">
                        Explore Our Best List<br />
                        5-Stars Hotel
                    </h3>
                    <p className="text-h5-heading text-ct-dark-grey">
                        We understand that every visitor has different<br />
                        preference. That’s why our platform’s good.
                    </p>
                </div>

                {/* Card Container */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hotelCards}
                </div>
            </div>
        </section>
    );
}
