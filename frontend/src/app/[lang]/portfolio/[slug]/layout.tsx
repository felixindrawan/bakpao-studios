"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "@/app/[lang]/utils/fetch-api";

import Loader from "@/app/[lang]/components/Loader";
import CollectionSelect from "@/app/[lang]/components/portfolio/CollectionSelect";
import CollectionInfo from "@/app/[lang]/components/portfolio/CollectionInfo";
import { Collection } from "../page";

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export default function LayoutRoute({
  params,
  children,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
    collection: string;
  };
}) {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<Collection[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [currentCollection, setCurrentCollection] = useState<{
    title: string;
    description: string;
  }>({ title: "", description: "" });

  const fetchAllCollections = useCallback(
    async (start: number, limit: number) => {
      setLoading(true);
      try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        const path = `/collections`;
        const urlParamsObject = {
          sort: { createdAt: "desc" },
          populate: {
            fields: ["title", "slug"],
          },
          pagination: {
            start: start,
            limit: limit,
          },
        };
        const options = { headers: { Authorization: `Bearer ${token}` } };
        const responseData = await fetchAPI(path, urlParamsObject, options);
        const currentCollectionData = await fetchAPI(
          path,
          {
            filters: { slug: params.slug },
            populate: {
              fields: ["title", "description"],
            },
          },
          options,
        );

        if (start === 0) {
          setData(responseData.data);
          setCurrentCollection(currentCollectionData.data[0]?.attributes);
        } else {
          setData((prevData: any[]) => [...prevData, ...responseData.data]);
        }

        setMeta(responseData.meta);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [params.slug],
  );

  function loadMoreCollections(): void {
    const nextCollections = meta!.pagination.start + meta!.pagination.limit;
    fetchAllCollections(
      nextCollections,
      Number(process.env.NEXT_PUBLIC_PAGE_LIMIT),
    );
  }

  useEffect(() => {
    fetchAllCollections(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchAllCollections]);

  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto space-y-5 sm:px-6 lg:max-w-7xl lg:px-8 ">
      <CollectionInfo
        title={currentCollection?.title}
        description={currentCollection?.description}
      />
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Left Navbar */}
        <aside className=" col-span-3 hidden min-h-[50vh] lg:block ">
          <CollectionSelect collections={data} currentCollection={params.slug}>
            {/* Load more button */}
            {meta!.pagination.start + meta!.pagination.limit <
              meta!.pagination.total && (
              <a
                className="text-md cursor-pointer font-light hover:underline"
                onClick={loadMoreCollections}
              >
                Load more collections...
              </a>
            )}
          </CollectionSelect>
        </aside>
        <div className="lg:col-span-9">
          {/* Main Portfolio */}
          {children}
        </div>
      </div>
    </div>
  );
}
