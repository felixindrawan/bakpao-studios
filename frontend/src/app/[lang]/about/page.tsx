"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "@/app/[lang]/utils/fetch-api";

import Loader from "@/app/components/Loader";
import { globalRenderer } from "@/app/[lang]/utils/global-renderer";

async function getAboutPageData(): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/about`;
  const urlParamsObject = {
    populate: "deep",
    relation: true,
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
} // TODO: Check how generateMetadata works!!

export default function AboutRoute() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const responseData = await getAboutPageData();
      setData(responseData.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-5">
      <h1 className="mx-auto max-w-xl text-lg font-bold ">
        {data?.attributes?.title}
      </h1>
      <h3 className="mx-auto max-w-xl text-lg ">
        {data?.attributes?.description}
      </h3>
      {data?.attributes?.blocks.map((section: any, index: number) =>
        globalRenderer(section, index),
      )}
    </div>
  );
}
