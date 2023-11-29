import { ALL_COLLECTIONS, Collection } from "@/app/[lang]/portfolio/page";

type CollectionSelectProps = {
  collections: Collection[];
  currentCollection: string;
  children: React.ReactNode;
};

function selectedCollection(current?: string, selected?: string) {
  return current === selected
    ? "text-md font-bold text-violet-400 underline pointer-events-none "
    : "text-md font-light hover:underline cursor-pointer";
}

export default function CollectionSelect({
  collections,
  currentCollection,
  children,
}: CollectionSelectProps) {
  return (
    <nav aria-label="Sidebar" className="sticky top-4 flex flex-col gap-y-3">
      <div className="font-bold">Collections</div>
      <a
        href="/portfolio"
        className={selectedCollection(ALL_COLLECTIONS, currentCollection)}
      >
        View All
      </a>
      {(collections || [])?.map(({ attributes }, i) => {
        return (
          <a
            key={i}
            href={`/portfolio/${attributes.slug}`}
            className={selectedCollection(attributes.slug, currentCollection)}
          >
            {attributes.title}
          </a>
        );
      })}
      {children && children}
    </nav>
  );
}
