import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneMovie from "@/lib/fetch-one-movie";
import fetchMovies from "@/lib/fetch-movies";
import Head from "next/head";
import { useRouter } from "next/router";

export const getStaticPaths = async () => {
  const movies = await fetchMovies();
  const paths = movies.map((movie) => ({
    params: {
      id: movie.id.toString(),
    },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const params = context.params!.id;
  const movie = await fetchOneMovie(Number(params));

  if (!movie) {
    return {
      noFound: true,
    };
  }

  return {
    props: { movie },
  };
};

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입시네마</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입시네마" />
          <meta
            property="og:description"
            content="한입 북스에 등록된 도서들을 만나보세요"
          />
        </Head>
        <div>로딩중입니다.</div>
      </>
    );
  }

  if (!movie) return "문제가 발생했습니다. 다시 시도하세요.";
  const {
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
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={posterImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
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
    </>
  );
}
