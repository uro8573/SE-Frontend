import { HotelItem } from "../../interfaces";

export default async function createReview(id: string, token: string, rating: number, comment: string) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/hotels/${id}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            rating: rating,
            comment: comment
        })
    });

    return await response.json();
}