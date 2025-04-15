import Card from "./Card"
import Link from "next/link"

import getHotels from "@/libs/getHotels";
import { Hotel } from "../../interfaces";

export default async function HotelCatalog() {

    const hotels = await getHotels();

    return (
        <div>
            <div className="m-5 flex flex-row flex-wrap items-center justify-around gap-5">
                {
                    hotels.data.map((item:Hotel) => 
                        <Link key={item.name} href={`/hotel/${item.id}`} className="w-1/4">
                            <Card 
                            hotelName={item.name} 
                            imgSrc={`/img/hotel.png`} 
                            rating={item.userRatingCount>0 ? parseFloat((item.ratingSum / item.userRatingCount).toFixed(2)) : 0}
                            dailyRate={item.dailyRate}/>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}