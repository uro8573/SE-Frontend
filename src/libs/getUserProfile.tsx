export default async function getUserProfile(token:string) {

    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`, {
    //     method: "GET",
    //     headers: {
    //         authorization: `Bearer ${token}`,
    //     },
    // });

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`;
    console.log('Fetching User Profile from:', url);
    const response = await fetch(url, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    

    if(!response.ok) throw new Error(`Failed to fetch user profile. Status: ${response.status}`);

    return await response.json();

}