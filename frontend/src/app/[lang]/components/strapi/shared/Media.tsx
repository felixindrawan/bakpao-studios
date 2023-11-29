import { ImageProps } from "next/image";
import StrapiMedia, {
  StrapiMediaProps,
} from "@/app/[lang]/components/strapi/native/StrapiMedia";

export type MediaProps = {
  image: StrapiMediaProps["file"];
  name: string;
  productURL?: string;
};

/**
 * This `Media` is used to render product specific media
 * i.e. Media with a product link attached
 */
export default function Media({
  image,
  name,
  productURL,
  ...otherProps
}: Omit<ImageProps, "src" | "alt"> & MediaProps) {
  return <StrapiMedia data={{ file: image }} {...otherProps} />;
}
