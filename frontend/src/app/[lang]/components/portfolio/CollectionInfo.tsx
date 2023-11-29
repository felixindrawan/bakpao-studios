import { Collection } from "@/app/[lang]/portfolio/page";

type CollectionInfoProps = Partial<
  Pick<Collection["attributes"], "title" | "description">
>;

export default function CollectionInfo({
  title,
  description,
}: CollectionInfoProps) {
  return (
    <div>
      <h4 className="text-xl font-semibold">{title}</h4>
      {description && <h4 className="text-xl font-light">{description}</h4>}
      {/* TODO: Add Tags, and add share button!!*/}
    </div>
  );
}
