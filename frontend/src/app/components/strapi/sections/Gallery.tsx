import Media, { MediaProps } from "@/app/components/strapi/shared/Media";

type GalleryProps = {
  data: {
    name?: string;
    media: MediaProps[];
    padding?: boolean;
  };
  columns?: number;
};

export default function Gallery({ data, columns = 4 }: GalleryProps) {
  const { name, media, padding } = data;

  return (
    // Masonry gallery
    // source: https://tailwindflex.com/simon-scheffer/masonry-grid
    <div
      id={name}
      className={`columns-2 gap-4 md:columns-3 lg:columns-${columns}  [&>img:not(:first-child)]:mt-4`}
      style={{ padding: padding ? "0 1rem " : 0 }}
    >
      {(media || []).map(({ image, name }, index) => (
        <Media key={index} name={name} image={image} className="w-full" />
      ))}
    </div>
  );
}
