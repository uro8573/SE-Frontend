export default async function updateAdminConfig({token, noti_period}:{token: string, noti_period: number}) {
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/config`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            noti_period
        })
    });

    return await response.json();

}