import { HotelJson } from "../../interfaces";

interface GetHotelsOptions {
  limit?: number;
  sort?: string;
}

export default async function getHotels(options: GetHotelsOptions = {}) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const queryParams = new URLSearchParams();

  if (options.limit !== undefined) {
    queryParams.append("limit", options.limit.toString());
  }

  if (options.sort !== undefined) {
    queryParams.append("sort", options.sort);
  }

  const queryString = queryParams.toString();
  const url = `https://tungtee888-backend.vercel.app/api/v1/hotels${queryString ? `?${queryString}` : ''}`;

  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/hotels`);
  const response = await fetch(url);

  if (!response.ok) throw new Error("Failed to fetch hotels");

  return await response.json() as HotelJson;
}