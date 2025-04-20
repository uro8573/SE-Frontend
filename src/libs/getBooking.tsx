export default async function getBooking(id: string, token: string) {

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/bookings/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    
    if(!response.ok) throw new Error("Failed to fetch bookings");

    return await response.json();
}