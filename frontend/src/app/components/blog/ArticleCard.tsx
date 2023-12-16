import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/app/components/blog/PostList";
import { ArticleInfo } from "./FeaturedArticle";

export function ArticleCard({ article }: { article: Article }) {
  const imageUrl = getStrapiMedia(
    article.attributes.cover.data?.attributes.url,
  );

  const category = article.attributes.category?.data?.attributes;

  return (
    <Link
      href={`/blog/${category?.slug}/${article.attributes.slug}`}
      key={article.id}
      className="group flex flex-col overflow-hidden rounded-2xl shadow-lg hover:no-underline focus:no-underline dark:bg-gray-900 "
    >
      {imageUrl && (
        <Image
          alt="presentation"
          width="240"
          height="240"
          className="h-44 w-full object-cover "
          src={imageUrl}
        />
      )}
      <ArticleInfo article={article} />
    </Link>
  );
}
