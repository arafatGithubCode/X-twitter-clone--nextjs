/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";

type Article = {
  url: string;
  title: string;
  name: [string];
  urlToImage: string;
};

export default function News() {
  const [news, setNews] = useState<[]>([]);
  const [articleNum, setArticleNum] = useState<number>(4);

  useEffect(() => {
    fetch("https://saurav.tech/NewsAPI/top-headlines/category/business/us.json")
      .then((res) => res.json())
      .then((data) => setNews(data.articles));
  }, []);

  return (
    <div className="bg-gray-100 text-gray-700 mt-2 rounded-xl space-y-2">
      <h4 className="font-bold text-lg px-4">What&apos;happening</h4>
      {news.slice(0, articleNum).map((article: Article) => {
        return (
          <a key={article.url} target="_blank" href="#">
            <div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 hoverEffect">
              <div className="space-y-0.5">
                <h6 className="text-sm font-bold">{article.title}</h6>
                <p className="text-xs text-gray-600 font-semibold">
                  {article.name}
                </p>
              </div>
              <img
                className="rounded-xl"
                src={article.urlToImage}
                width={70}
                height={70}
                alt=""
              />
            </div>
          </a>
        );
      })}
      <button
        onClick={() => setArticleNum(articleNum + 3)}
        className="font-semibold text-blue-400 hover:text-blue-600 hoverEffect px-4 py-2 text-xs"
      >
        Load More
      </button>
    </div>
  );
}
