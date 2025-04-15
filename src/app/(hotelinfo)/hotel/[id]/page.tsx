'use client'
import Image from 'next/image';
import { Button, Rating } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';
import getHotel from '@/libs/getHotel';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify'
import addRating from '@/libs/addRating';
import { HotelItem } from '../../../../../interfaces';


export default function itemPage({params}:{params: {id: string}}) {

    const { data:session } = useSession();

    const [item, setItem] = useState<HotelItem|null>(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const fetchitem = async () => {
            try {
                const response = await getHotel(params.id);

                if(!response) throw new Error("Failed to fetch data.");

                setItem(response);
                
            } catch(err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchitem();

    }, []);

    if(loading || !item) return ( <div></div> )

    const alert = async () => {
        if(!session) {
            toast.error("You must authorized first!!");
            return;
        }
        if(rating < 1 || rating > 5) {
            toast.warn("Rating value must between 1 and 5.");
            return;
        }
        const response = await addRating(params.id, rating, session?.user.token);
        if(response.success == true) {
            toast.success("Rating Successfully!");
        } else toast.error("Error occured while rating this hotel.");
    }


    return (
        <main className="p-5">
            <div className="flex flex-row my-5">
                <Image src={`/img/hotel2.png`}
                 alt="Venue Picture"
                 width={0}
                 height={0}
                 sizes="100vw"
                 className="rounded-lg w-full bg-black"/>
            </div>
            <div className="flex justify-between">
                <div className="w-1/3"></div>
                <div className="w-1/3 items-center flex flex-col">
                    <div className="text-3xl text-black font-bold">
                        {item.data.name}
                    </div>
                    <Rating
                        className={`p-[10px]`}
                        value={item.data.userRatingCount>0 ? item.data.ratingSum / item.data.userRatingCount : 0}
                        precision={0.5}
                        readOnly
                    />
                    <div className="text-xl text-black">{item.data.userRatingCount>0 ? (item.data.ratingSum / item.data.userRatingCount).toFixed(2) : 0} / 5.00 Ratings</div>
                    <div className="text-l text-black">{item.data.userRatingCount} User{item.data.userRatingCount>1 ? 's' : ''}</div>
                </div>
                <div className="w-1/3 justify-items-end">
                    <div className="text-4xl text-[#F3E158] font-bold">${item.data.dailyRate}/Day</div>
                    <Link href={`/booking?id=${params.id}`}>
                        <div className="mt-[5%] text-[14px] bg-black text-white px-[24px] py-[14px] rounded-lg hover:shadow-xl hover:bg-white hover:text-black duration-300">
                                Book This Hotel
                        </div>
                    </Link>
                </div>
            </div>
            <div className="text-md mx-5 text-left text-black">
                    <div className="text-2xl font-bold text-black">Hotel Description</div>
                    <div className="mb-[2%]">{item.data.name}</div>
                    <div>Address: {item.data.address}</div>
                    <div>District: {item.data.district}</div>
                    <div>Province: {item.data.province}</div>
                    <div>Postal Code: {item.data.postalcode}</div>
                    <div>Telephone: {item.data.tel}</div>
                    <div>Daily Rate: {item.data.dailyRate}$</div>
                    {
                        session ?
                        <div className="mt-[5%] flex flex-col gap-2">
                            <Rating
                            className={`text-right`}
                            value={rating}
                            onChange={(e, newValue) => {
                                e.stopPropagation();
                                setRating(Math.max(1, newValue || 1));
                            }}
                            />
                            <button 
                            className="mt-[3px] w-[200px] text-center text-[14px] bg-black text-white px-[24px] py-[14px] rounded-lg hover:shadow-xl hover:bg-white hover:text-black duration-300 hover:cursor-pointer" 
                            onClick={ () => alert() }>
                                Rate This Hotel
                            </button>
                        </div>
                        : ""
                    }
                    <ToastContainer/>
            </div>
        </main>
    )
}