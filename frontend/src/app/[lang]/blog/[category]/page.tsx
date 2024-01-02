import PageHeader from "@/app/components/PageHeader";
import { fetchAPI } from "@/app/[lang]/utils/fetch-api";
import PostList from "@/app/components/blog/PostList";
import FeaturedArticle from "@/app/components/blog/FeaturedArticle";

async function fetchPostsByCategory(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
      sort: { createdAt: "desc" },
      filters: {
        category: {
          slug: filter,
        },
      },
      populate: {
        cover: { populate: "*" },
        category: {
          populate: "*",
        },
        authorsBio: {
          populate: "*",
        },
      },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);
    return responseData;
  } catch (error) {
    console.error(error);
  }
}

export default async function CategoryRoute({
  params,
}: {
  params: { category: string };
}) {
  const filter = params.category;
  const { data } = await fetchPostsByCategory(filter);

  if (data.length === 0) return <div>Not Posts In this category</div>;

  return (
    <div className="space-y-6 sm:space-y-12">
      <FeaturedArticle article={data[0]} category={filter} />
      <PostList data={data} />
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}
