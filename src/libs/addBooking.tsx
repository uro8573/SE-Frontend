export default async function addBooking(id: string, token: string, guest:number, room:string, checkInDate: string, checkOutDate: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/hotels/${id}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "guest": guest,
            "room": room,
            "checkInDate": checkInDate,
            "checkOutDate": checkOutDate
        })
    });

    return await response.json();
}