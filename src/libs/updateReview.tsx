export default async function updateReview(id: string, token: string, editedComment: string, editedRating: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reviews/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            comment: editedComment,
            rating: editedRating
        })
    });

    return await response.json();
}
