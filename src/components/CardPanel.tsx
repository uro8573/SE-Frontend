'use client'
import Card from '@/components/Card'
import getHotels from '@/libs/getHotels';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { HotelJson } from '../../interfaces';

export default function CardPanel() {

    const [items, setItems] = useState<HotelJson|null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await getHotels();

                if(!response) throw new Error("Failed to fetch data.");

                setItems(response);
                
            } catch(err) {
                console.error(err);
            }
        }

        fetchItems();

    }, []);

    if(!items) return (<div></div>)

    return (
        <div className="mt-[9%]">
            <div className="text-3xl text-black font-bold mb-[30px]">
                Hotel
            </div>
            <div className="flex justify-around mt-[20px]">
                {
                    items.data ?
                    items.data.slice(0, 3).map((item) => 
                        <Link key={item.name} href={`/hotel/${item.id}`} className="w-1/4">
                            <Card 
                            hotelName={item.name} 
                            imgSrc={`/img/hotel.png`} 
                            rating={item.userRatingCount>0 ? parseFloat((item.ratingSum / item.userRatingCount).toFixed(2)) : 0}
                            dailyRate={item.dailyRate}/>
                        </Link>
                    )
                    : "Loading"
                }
            </div>
        </div>
    )
}