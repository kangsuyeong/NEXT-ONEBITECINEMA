import type { MovieData } from "@/types";
import Link from "next/link";
import style from "./movie-Item.module.css";

export default function MovieItem({
  id,
  title,
  subTitle,
  description,
  releaseDate,
  company,
  genres,
  runtime,
  posterImgUrl,
}: MovieData) {
  return (
    <Link href={`/movie/${id}`}>
      <img src={posterImgUrl} className={style.movie_img} />
    </Link>
  );
}
