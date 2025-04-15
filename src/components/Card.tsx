import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from '@mui/material';

export default function Card({hotelName, imgSrc, rating, dailyRate}:{hotelName:string, imgSrc:string, rating: number, dailyRate: string}) {

    return (
        <InteractiveCard>
            <div className={`w-full h-[70%] relative rounded-t-lg`}>
                <Image src={imgSrc}
                alt={hotelName}
                fill={true}
                style={{objectFit: 'cover'}}
                className='object-cover rounded-t-lg'
                />
            </div>
            <div className={`w-full h-[5%] p-[10px] text-black`}>
                {hotelName}
            </div>
            <div className={`w-full h-[10%] p-[10px] text-[#D3C44E]`}>
                {dailyRate}$
            </div>
            <Rating
                className={`p-[10px]`}
                value={rating || 0}
                precision={0.01}
                readOnly
            />
        </InteractiveCard>
    )
}