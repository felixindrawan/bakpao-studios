import { ALL_COLLECTIONS, Collection } from "@/app/[lang]/portfolio/page";
import { useEffect, useRef } from "react";

type CollectionSelectProps = {
  collections: Collection[];
  currentCollection: string;
  sideNavOpen: boolean;
  toggleSideNav: () => void;
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
  sideNavOpen,
  toggleSideNav,
  children,
}: CollectionSelectProps) {
  const NavLinks = () => (
    <>
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
    </>
  );

  return (
    <>
      {sideNavOpen && (
        <nav
          id="default-sidebar"
          className="fixed left-0 top-0 z-40 block h-screen w-64 lg:hidden"
          aria-label="Sidebar"
        >
          <div className="flex h-full flex-col gap-y-3 overflow-y-auto bg-gray-50  px-3 py-4 dark:bg-gray-800">
            <button onClick={toggleSideNav}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <NavLinks />
          </div>
        </nav>
      )}
      <nav
        aria-label="Sidebar"
        className="sticky top-4  col-span-3 hidden min-h-[50vh] flex-col gap-y-3 lg:flex"
      >
        <NavLinks />
      </nav>
    </>
  );
}
