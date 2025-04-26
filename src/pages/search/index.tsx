import SearchableLayout from "@/components/SearchableLayout";
import { ReactNode, useEffect, useState } from "react";
import MovieItem from "@/components/movie-Item";

import style from "./index.module.css";
import fetchMovies from "@/lib/fetch-movies";
import { MovieData } from "@/types";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Page({}) {
  const [movies, setMovies] = useState<MovieData[]>([]);

  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchMovies(q as string);
    setMovies(data);
  };

  useEffect(() => {
    fetchSearchResult();
  }, [q]);
  return (
    <>
      <Head>
        <title>한입시네마 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입시네마 - 검색결과" />
        <meta
          property="og:description"
          content="한입 시네마에 등록된 영화들을 만나보세요"
        />
      </Head>
      <div className={style.container}>
        {movies.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
