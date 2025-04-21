import { ReactNode, useEffect, useState } from "react";
import style from "./SearchableLayout.module.css";
import { useRouter } from "next/router";

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const q = router.query.q as string;
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  return (
    <div>
      <div className={style.searchable_container}>
        <input
          value={search}
          onChange={onChangeSearch}
          placeholder="검색어를 입력하세요 ..."
          onKeyDown={onKeyDown}
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
