export default async function getHotel(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/hotels/${id}`);

    if(!response.ok) throw new Error("Failed to fetch single hotel");

    return await response.json();
}