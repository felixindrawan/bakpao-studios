import { getStrapiMedia } from "../utils/api-helpers";
import Image, { ImageProps } from "next/image";

export interface MediaProps {
  file: {
    data: {
      id: string;
      attributes: {
        url: string;
        name: string;
        alternativeText: string;
        width: number;
        height: number;
      };
    };
  };
}

export default function Media({
  data,
  ...otherProps
}: Omit<ImageProps, "src" | "alt"> & { data: MediaProps }) {
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
