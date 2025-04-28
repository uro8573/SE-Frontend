export default async function getAdminConfig({token}:{token: string}) {
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/config`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    return await response.json();

}