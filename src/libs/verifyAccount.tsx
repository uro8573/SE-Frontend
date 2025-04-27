export default async function verifyAccount(token: string, code: string) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            verificationCode: code
        })
    });

    return await response.json();
}