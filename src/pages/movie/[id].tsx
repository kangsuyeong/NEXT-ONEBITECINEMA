import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import style from "./[id].module.css";
import fetchOneMovie from "@/lib/fetch-one-movie";
import fetchMovies from "@/lib/fetch-movies";

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const params = context.params!.id;
//   const movie = await fetchOneMovie(Number(params));
//   return {
//     props: { movie },
//   };
// };

export const getStaticPaths = async () => {
  const movies = await fetchMovies();
  const paths = movies.map((movie) => ({
    params: {
      id: movie.id.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const params = context.params!.id;
  const movie = await fetchOneMovie(Number(params));
  return {
    props: { movie },
  };
};

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!movie) return "문제가 발생했습니다. 다시 시도하세요.";
  const {
    id,
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = movie;

  return (
    <div className={style.container}>
      <div
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
        className={style.poster_img_container}
      >
        <img src={posterImgUrl} />
      </div>

      <div className={style.title}>{title}</div>
      <div>
        {releaseDate} / {genres.join(", ")} / {runtime}분
      </div>
      <div>{company}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div>{description}</div>
    </div>
  );
}
