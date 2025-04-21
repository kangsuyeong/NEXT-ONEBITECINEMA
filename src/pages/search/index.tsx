import SearchableLayout from "@/components/SearchableLayout";
import { ReactNode } from "react";
import movies from "@/mock/movies.json";
import MovieItem from "@/components/movie-Item";

import style from "./index.module.css";

export default function Page() {
  return (
    <div className={style.container}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
