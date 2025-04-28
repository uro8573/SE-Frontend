export default async function userLogIn(userEmail: string, userPassword: string) {

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`;
    console.log('Fetching User Profile from:', url);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword,
        })
    });

    if(!response.ok) throw new Error("Failed to fetch user");

    return await response.json();

}