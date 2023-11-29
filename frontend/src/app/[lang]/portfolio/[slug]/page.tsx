import { useState } from "react";
import { Collection } from "../page";
import CollectionList from "../../components/portfolio/CollectionList";
import { fetchAPI } from "../../utils/fetch-api";

async function getCollectionBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/collections`;
  const urlParamsObject = {
    filters: { slug },
    populate: "deep",
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

export default async function PortfolioCollectionsRoute({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const data = await getCollectionBySlug(slug);
  if (data.data.length === 0) return <h2>Collection not found</h2>;

  return <CollectionList collections={data.data} />;
}
