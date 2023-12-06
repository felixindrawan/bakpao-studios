import { formatDate, getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { globalRenderer } from "@/app/[lang]/utils/global-renderer";
import Image from "next/image";

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    cover: {
      data: {
        attributes: {
          url: string;
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
    blocks: any[];
    publishedAt: string;
  };
}

export default function Post({ data }: { data: Article }) {
  const { title, description, publishedAt, cover, authorsBio } =
    data.attributes;
  const author = authorsBio.data?.attributes;
  const imageUrl = getStrapiMedia(cover.data?.attributes.url);
  const authorImgUrl = getStrapiMedia(
    authorsBio.data?.attributes.avatar.data.attributes.url,
  );
  return (
    <article className="space-y-8 dark:bg-black dark:text-gray-50">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="article cover image"
          width={400}
          height={400}
          className="h-96 w-full rounded-lg object-cover"
        />
      )}
      <div className="space-y-6">
        <h1 className="text-5xl font-bold leading-tight ">{title}</h1>
        <div className="flex w-full flex-col items-start justify-between dark:text-gray-400 md:flex-row md:items-center">
          <div className="flex items-center md:space-x-2">
            {authorImgUrl && (
              <Image
                src={authorImgUrl}
                alt="article cover image"
                width={400}
                height={400}
                className="h-14 w-14 rounded-full border dark:border-gray-700 dark:bg-gray-500"
              />
            )}
            <p className="text-md dark:text-violet-400">
              {author && author.name} • {formatDate(publishedAt)}
            </p>
          </div>
        </div>
      </div>
      <div className="dark:text-gray-100">
        <p>{description}</p>

        {data.attributes.blocks.map((section: any, index: number) =>
          globalRenderer(section, index),
        )}
      </div>
    </article>
  );
}
