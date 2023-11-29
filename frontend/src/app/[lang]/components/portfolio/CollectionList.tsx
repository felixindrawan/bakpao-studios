import Gallery from "../strapi/sections/Gallery";
import { Collection, Product } from "../../portfolio/page";
import { useMemo } from "react";
import { MediaProps } from "../strapi/shared/Media";

export default function CollectionList({
  collections,
}: {
  collections: Collection[];
}) {
  // Combine all products into one collection
  const products = useMemo(
    () =>
      collections
        .map(({ attributes }) => {
          // returns all images of each collections in an array
          // eg, [[imageA from collection1, imageB from collection2], [imageC from collection3]]
          return attributes.products?.data
            ?.map(({ attributes }: Product) => attributes?.media?.flat())
            ?.flat();
        })
        // flattens the array to [imageA from collection1, imageB from collection2, imageC from collection3]
        ?.flat() ?? [],
    [collections],
  );
  return (
    <>
      {products?.length ? (
        <Gallery data={{ media: products as MediaProps[] }} columns={3} />
      ) : (
        <div>Coming Soon</div>
      )}
    </>
  );
}
