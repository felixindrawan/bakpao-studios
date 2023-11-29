import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { StrapiComponent } from "@/app/[lang]/utils/global-renderer";
import Image, { ImageProps } from "next/image";

export type StrapiImage = {
  data: StrapiComponent & {
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
      width: number;
      height: number;
    };
  };
};

/**
 * This `Media` is used to render Strapi's Media type component/field
 */
export type StrapiMediaProps = {
  file: StrapiImage;
};

export default function StrapiMedia({
  data,
  ...otherProps
}: Omit<ImageProps, "src" | "alt"> & { data: StrapiMediaProps }) {
  const { url, width, height, name, alternativeText } =
    data.file.data.attributes;
  const imgUrl = getStrapiMedia(url);
  return (
    <Image
      src={imgUrl || ""}
      alt={alternativeText || name || "None Provided"}
      width={width || 0}
      height={height || 0}
      {...otherProps}
    />
  );
}
