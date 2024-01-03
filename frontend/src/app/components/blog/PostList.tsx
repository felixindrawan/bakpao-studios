"use client";

import { ArticleCard } from "@/app/components/blog/ArticleCard";
import { StrapiMediaProps } from "../strapi/native/StrapiMedia";
import { useCallback, useMemo, useState } from "react";

export type Article = {
  id: 4;
  attributes: {
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: StrapiMediaProps["file"];
    category: {
      data: {
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    authorsBio: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
  };
};

export default function PostList({
  data: articles,
  children,
}: {
  data: Article[];
  children?: React.ReactNode;
}) {
  const [filteredArticle, setFilteredArticles] = useState(articles);
  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          articles.map(
            (article) => article.attributes.category.data.attributes.name,
          ),
        ),
      ),
    [articles],
  );
  const handleCategoryFilter = useCallback(
    (category: string) => {
      if (category === "All") {
        setFilteredArticles(articles);
      } else {
        setFilteredArticles(
          articles.filter(
            (article) =>
              article.attributes.category.data.attributes.name === category,
          ),
        );
      }
    },
    [articles],
  );
  return (
    <section className="space-y-6 sm:space-y-12">
      <div className="space-y-2">
        <h3>Browse by Category</h3>
        <select
          className="select select-bordered w-full max-w-xs bg-opacity-0"
          onChange={(e) => handleCategoryFilter(e.target.value)}
          defaultValue={"All"}
        >
          {["All", ...categories].map((category) => (
            <option key={category} className="text-white">
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 justify-center gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticle.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      {children && children}
    </section>
  );
}
