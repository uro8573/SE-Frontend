export default async function getNotifications(token: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/notifications`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) {
        throw new Error("Failed to fetch notifications");
    }

    return res.json();
}