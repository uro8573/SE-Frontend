export default async function getReviews(token: string) {

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reviews`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    
    if(!response.ok) throw new Error("Failed to fetch reviews");

    return await response.json();
}