import Image from "next/image";
export default function TopHotelSection() {
    return (
        <section className="py-16 px-6 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Top Hotels of 2024</h2>
                <p className="mb-8">Our Most Amazing Visited Hotel on 2024</p>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { title: "The Havencrest", desc: "A serene escape nestled above the city skyline, offering luxury with a view.", tags: ["Luxury", "City View", "Modern"], img: "/images/hotel1.jpg" },
                    { title: "Lunara Inn", desc: "A dreamy boutique stay inspired by moonlit nights and peaceful atmospheres.", tags: ["Boutique", "Romantic", "Quiet"], img: "/images/hotel2.jpg" },
                    { title: "Blue Fern Lodge", desc: "A cozy nature-inspired retreat surrounded by greenery and calm vibes.", tags: ["Nature", "Lodge", "Relaxing"], img: "/images/hotel3.jpg" }
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