type TwoColumnBannerProps = {
  textColumn: React.ReactNode;
  imageColumn: React.ReactNode;
  reverse?: boolean;
};

export default function TwoColumnBanner({
  textColumn,
  imageColumn,
  reverse = false,
}: TwoColumnBannerProps) {
  return (
    <div
      className={` flex h-[500px] flex-1 ${
        reverse ? "flex-col" : "flex-col-reverse"
      } overflow-hidden rounded-2xl bg-violet-200 lg:flex-row`}
    >
      {/* Text container */}
      <div className="flex flex-1">{textColumn}</div>
      {/* Image Container */}
      <div className="flex flex-1">{imageColumn}</div>
    </div>
  );
}
