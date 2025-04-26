import type { MovieData } from "@/types";

export default async function fetchOneMovie(
  id: number
): Promise<MovieData | null> {
  const url = `https://onebite-cinema-server-ochre.vercel.app//movie/${id}`;

  try {
    const respone = await fetch(url);
    if (!respone.ok) {
      throw new Error();
    }
    return await respone.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
