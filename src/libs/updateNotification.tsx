export default async function updateNotification(token: string, id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/notifications/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            isRead: true
        })
        
    });
    if (!response.ok) {
        const text = await response.text(); // เก็บไว้ debug
        throw new Error(`HTTP error ${response.status}: ${text}`);

    }
    return await response.json();
}