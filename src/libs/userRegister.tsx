export default async function userRegister(userEmail: string, userPassword: string, username: string, telephone: string) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword,
            name: username,
            tel: telephone,
            role: "user"
        })
    });

    return await response.json();

}