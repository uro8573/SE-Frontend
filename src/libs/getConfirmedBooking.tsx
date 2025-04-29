export default async function getConfirmedBooking(bookingId: string, token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/bookings/confirm/${bookingId}/${token}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to confirm booking");
    }

    return await response.json();
}
