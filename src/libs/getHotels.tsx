import { HotelJson } from "../../interfaces";

export default async function getHotels() {

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/hotels`);
    const response = await fetch(`https://tungtee888-backend.vercel.app/api/v1/hotels`);
    
    if(!response.ok) throw new Error("Failed to fetch hotels");

    return await response.json();
}