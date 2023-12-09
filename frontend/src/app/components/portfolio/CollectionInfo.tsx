import { Collection } from "@/app/[lang]/portfolio/page";

type CollectionInfoProps = Partial<
  Pick<Collection["attributes"], "title" | "description">
> & {
  toggleSideNav: () => void;
};

export default function CollectionInfo({
  title,
  description,
  toggleSideNav,
}: CollectionInfoProps) {
  return (
    <>
      <div className="flex items-center">
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="mr-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden "
          onClick={toggleSideNav}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
        <h4 className="text-xl font-semibold">{title}</h4>
      </div>
      {description && <h4 className="text-xl font-light">{description}</h4>}
      {/* TODO: Add Tags, and add share button!!*/}
    </>
  );
}
