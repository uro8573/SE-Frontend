export default async function addRating(id: string, rating: number, token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/hotels/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "rating": rating
        })
    });

    if(!response.ok) throw new Error("Failed to add hotel rating");

    return await response.json();
}