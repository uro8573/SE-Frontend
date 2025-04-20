export default async function getReviewWithHotelID(token: string, hotelID: number) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/hotels/${hotelID}/reviews`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    
    if(!response.ok) throw new Error("Failed to fetch reviews");

    return await response.json();
}