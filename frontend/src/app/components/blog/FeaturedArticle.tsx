import { formatDate } from "@/app/[lang]/utils/api-helpers";
import { Article } from "@/app/components/blog/PostList";
import Link from "next/link";
import StrapiMedia from "../strapi/native/StrapiMedia";
import TwoColumnBanner from "../strapi/sections/TwoColumnBanner";

// The text color can't be properly seen in darkmode. We need to change it specifically for dark mode, depending on which component it's used for
// Check the `FeaturedArticle` vs the `ArticleCard`.
export function ArticleInfo({
  article,
  textColor = "white",
}: {
  article: Article;
  textColor?: "black" | "white";
}) {
  const category = article.attributes.category?.data?.attributes;

  return (
    <div className="flex flex-grow flex-col p-6">
      <div className="mb-2 items-center ">
        <span className="text-s border-r-2 border-violet-700 pr-2 font-bold text-violet-700 dark:border-violet-400 dark:text-violet-400">
          {category?.name}
        </span>
        <span
          className={`text-s pl-2 dark:text-gray-400 dark:text-${textColor}`}
        >
          {formatDate(article.attributes.publishedAt)}
        </span>
      </div>
      <h3
        className={`mb-4 line-clamp-3 flex-1 overflow-hidden  text-2xl font-semibold group-hover:underline group-focus:underline dark:text-${textColor}`}
      >
        {article.attributes.title}
      </h3>
      {/* TO DO : Insert Tags (Do we need tags?)*/}
      <p
        className={`dark:text-${textColor} flex font-semibold hover:underline focus:underline group-hover:underline group-focus:underline`}
      >
        READ BLOG{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
          />
        </svg>
      </p>
    </div>
  );
}

export default function FeaturedArticle({
  article,
  category,
}: {
  article: Article;
  category?: Article["attributes"]["category"]["data"]["attributes"]["slug"];
}) {
  const coverImage = article.attributes.cover;
  return (
    <TwoColumnBanner
      textColumn={
        <div className="group my-auto flex flex-col pb-4">
          <h1 className="px-6 pt-6 text-4xl font-semibold dark:text-black">
            Featured{" "}
            {category ? (
              <>
                Article on{" "}
                <span className="font-bold text-violet-700">#{category}</span>
              </>
            ) : (
              <span className="font-bold text-violet-700">Blog</span>
            )}
          </h1>
          <Link href={`/blog/${category}/${article.attributes.slug}`}>
            <ArticleInfo article={article} textColor="black" />
          </Link>
        </div>
      }
      imageColumn={
        <StrapiMedia
          data={{ file: coverImage }}
          style={{ objectFit: "cover" }}
        />
      }
    />
  );
}
