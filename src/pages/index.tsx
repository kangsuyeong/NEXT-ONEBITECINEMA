import SearchableLayout from "@/components/SearchableLayout";
import { ReactNode } from "react";
import movies from "@/mock/movies.json";
import MovieItem from "@/components/movie-Item";
import style from "./index.module.css";
import fetchMovies from "@/lib/fetch-movies";
import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import fetchRandomMovies from "@/lib/fetch-random-movies";

// export const getServerSideProps = async () => {
//   const [allMovies, recoMovies] = await Promise.all([
//     fetchMovies(),
//     fetchRandomMovies(),
//   ]);

//   return {
//     props: { recoMovies, allMovies },
//   };
// };

export const getStaticProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);

  return {
    props: { recoMovies, allMovies },
  };
};

export default function Home({
  recoMovies,
  allMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.recommended_movies_container}>
          {recoMovies.slice(0, 3).map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.all_movies_container}>
          {allMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
