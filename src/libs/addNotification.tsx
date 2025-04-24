export default async function addNotification(token: string, user_id: string , text: string ,type:string, typeAction:string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/notifications`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            user: user_id,
            text: text,
            isRead: false,
            type: type,
            typeAction: typeAction
        })
    });

    return await response.json();
}