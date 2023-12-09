"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "@/app/[lang]/utils/fetch-api";

import Loader from "@/app/components/Loader";
import CollectionList from "@/app/components/portfolio/CollectionList";
import { StrapiComponent } from "@/app/[lang]/utils/global-renderer";
import { MediaProps } from "@/app/components/strapi/shared/Media";
import CollectionSelect from "@/app/components/portfolio/CollectionSelect";
import CollectionInfo from "@/app/components/portfolio/CollectionInfo";

export type Product = StrapiComponent & {
  attributes: {
    title: string;
    description: string;
    url: string;
    media: MediaProps[];
  };
};

export type Collection = StrapiComponent & {
  attributes: {
    title: string;
    slug: string;
    description: string;
    products?: { data: Product[] };
  };
};

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export const ALL_COLLECTIONS = "ALL";

export default function PortfolioRoute() {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/collections`;
      const urlParamsObject = {
        sort: { createdAt: "desc" },
        populate: "deep",
        pagination: {
          start: start,
          limit: limit,
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);

      if (start === 0) {
        setData(responseData.data);
      } else {
        setData((prevData: any[]) => [...prevData, ...responseData.data]);
      }

      setMeta(responseData.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  function loadMoreCollections(): void {
    const nextCollections = meta!.pagination.start + meta!.pagination.limit;
    fetchData(nextCollections, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }

  const toggleSideNav = useCallback(() => {
    setSideNavOpen(!sideNavOpen);
    console.log(sideNavOpen);
  }, [sideNavOpen]);

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="mx-auto space-y-5 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <CollectionInfo title="All Collections" toggleSideNav={toggleSideNav} />
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Navbar */}
          <CollectionSelect
            collections={data}
            currentCollection={ALL_COLLECTIONS}
            sideNavOpen={sideNavOpen}
            toggleSideNav={toggleSideNav}
          >
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
          <div className="lg:col-span-9">
            {/* Main Portfolio */}
            <CollectionList collections={data} />
          </div>
        </div>
      </div>
    </>
  );
}
