import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, formatDate } from "@/app/[lang]/utils/api-helpers";

interface Article {
  id: 4;
  attributes: {
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
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
}

export default function PostList({
  data: articles,
  children,
}: {
  data: Article[];
  children?: React.ReactNode;
}) {
  return (
    <section className="container mx-auto space-y-6 p-6 sm:space-y-12">
      <div className="grid grid-cols-1 justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
          const imageUrl = getStrapiMedia(
            article.attributes.cover.data?.attributes.url,
          );

          const category = article.attributes.category.data?.attributes;
          const authorsBio = article.attributes.authorsBio.data?.attributes;

          const avatarUrl = getStrapiMedia(
            authorsBio?.avatar.data.attributes.url,
          );

          return (
            <Link
              href={`/blog/${category?.slug}/${article.attributes.slug}`}
              key={article.id}
              className="group mx-auto max-w-sm overflow-hidden rounded-2xl shadow-lg hover:no-underline focus:no-underline dark:bg-gray-900 lg:w-[300px] xl:min-w-[375px]"
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
              <div className="relative space-y-2 p-6">
                {avatarUrl && (
                  <Image
                    alt="avatar"
                    width="80"
                    height="80"
                    src={avatarUrl}
                    className="absolute -top-8 right-4 h-16 w-16 rounded-full object-cover"
                  />
                )}

                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                  {article.attributes.title}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-xs dark:text-gray-400">
                    {formatDate(article.attributes.publishedAt)}
                  </span>
                  {authorsBio && (
                    <span className="text-xs dark:text-gray-400">
                      {authorsBio.name}
                    </span>
                  )}
                </div>
                <p className="py-4">{article.attributes.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
      {children && children}
    </section>
  );
}
