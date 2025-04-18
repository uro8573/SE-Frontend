import Image from "next/image";
export default function TopHotelSection() {
    return (
        <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Explore Our Best List 5-Stars Hotel</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Silverpine Retreat", desc: "A peaceful mountain escape surrounded by whispering pines and fresh alpine air.", tags: ["Mountain", "Nature", "Wellness"], img: "/images/hotel4.jpg" },
            { title: "The Velvet Lantern", desc: "An elegant, vintage-style hotel with warm lighting and timeless charm.", tags: ["Boutique", "Historic", "Romantic"], img: "/images/hotel5.jpg" },
            { title: "Sundara Bay Resort", desc: "A sun-soaked beachfront haven with crystal waters and endless horizon views.", tags: ["Beachfront", "Luxury", "Tropical"], img: "/images/hotel6.jpg" },
            { title: "Urban Nest Hotel", desc: "A sleek, modern space in the heart of the city — perfect for business and weekend stays alike.", tags: ["City", "Modern", "Business Friendly"], img: "/images/hotel7.jpg" },
            { title: "The Havencrest", desc: "A charming countryside inn blending rustic textures with cozy elegance.", tags: ["Countryside", "Rustic", "Cozy"], img: "/images/hotel1.jpg" },
            { title: "Celestia Horizon", desc: "A sky-high sanctuary with panoramic views, blending celestial design with refined luxury.", tags: ["Luxury", "Skyline", "Modern Retreat"], img: "/images/hotel8.jpg" }
          ].map((hotel, i) => (
            <div key={i} className="rounded-lg shadow hover:shadow-lg overflow-hidden">
              <Image src={hotel.img} alt={hotel.title} width={400} height={250} className="w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{hotel.title}</h3>
                <p className="text-sm mb-3">{hotel.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {hotel.tags.map((tag, j) => (
                    <span key={j} className="text-xs bg-gray-200 px-2 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
}