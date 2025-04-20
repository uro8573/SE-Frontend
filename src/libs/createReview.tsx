import { HotelItem } from "../../interfaces";

export default async function createReview(token: string, user:string ,comment: string, hotel:HotelItem  ,createAt: Date) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reviews`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "user": user,
            "comment": comment,
            "hotel": hotel,
            "createdAt": createAt
        })
    });

    if(!response.ok) throw new Error("Failed to create reviews");

    return await response.json();
}