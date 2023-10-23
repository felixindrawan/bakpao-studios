import Media, { MediaProps } from "@/app/[lang]/components/Media";

interface Feature {
  title: string;
  description?: string;
  media: MediaProps["file"];
  showLink?: boolean;
  newTab?: boolean;
  url?: string;
  text?: string;
}

interface GalleryProps {
  name: string;
  products: Feature[];
}

export default function Gallery({ data }: { data: GalleryProps }) {
  const { name, products } = data;
  return (
    // source: https://tailwindflex.com/simon-scheffer/masonry-grid
    <div
      id={name}
      className="columns-2 gap-4 md:columns-3 lg:columns-4  [&>img:not(:first-child)]:mt-4"
    >
      {products.map(({ media }, index) => (
        <Media
          key={index}
          data={{ file: media }}
          className="w-full rounded-lg border border-sky-500"
        />
      ))}
    </div>
  );
}
