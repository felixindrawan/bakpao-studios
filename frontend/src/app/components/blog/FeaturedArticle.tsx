import { formatDate, getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { Article } from "@/app/components/blog/PostList";
import Image from "next/image";
import Link from "next/link";

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
        className={`mb-8 line-clamp-3 flex-1 overflow-hidden  text-2xl font-semibold group-hover:underline group-focus:underline dark:text-${textColor}`}
      >
        {article.attributes.title}
      </h3>
      {/* TO DO : Insert Tags (Do we need tags?)*/}
      <Link
        href={`/blog/${category?.slug}/${article.attributes.slug}`}
        className="hover:underline focus:underline"
      >
        <p className={`dark:text-${textColor} flex font-semibold `}>
          READ BLOG{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </p>
      </Link>
    </div>
  );
}

export default function FeaturedArticle({ article }: { article: Article }) {
  const imageUrl = getStrapiMedia(
    article.attributes.cover.data?.attributes.url,
  );

  return (
    <div className="full-container container-padding flex min-h-[300px] flex-col-reverse bg-violet-200 lg:min-h-[500px] lg:flex-row ">
      {/* Text container */}
      <div className="flex flex-1 ">
        <div className="flex flex-col justify-center pb-6 align-middle lg:m-auto">
          <h1 className="p-6 text-4xl font-semibold dark:text-black">
            Featured <span className="font-bold text-violet-700">Blog</span>
          </h1>
          <ArticleInfo article={article} textColor="black" />
        </div>
      </div>
      {/* Image Container */}
      {/* Minus the container padding */}
      <div className="full-container flex flex-1 lg:px-48 ">
        {imageUrl && (
          <Image
            alt="Featured Blog thumbnail"
            fill
            className=" !static"
            src={imageUrl}
          />
        )}
      </div>
    </div>
  );
}
