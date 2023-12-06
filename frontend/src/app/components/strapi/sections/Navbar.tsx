"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import StrapiMedia, {
  StrapiMediaProps,
} from "@/app/components/strapi/native/StrapiMedia";
import { useTheme } from "next-themes";
import { Theme } from "@/app/components/ThemeProvider";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

function NavLink({ url, text }: NavLink) {
  // Path returns `/[lang]/[path]`
  const path = usePathname()?.split("/")?.[2];
  const isHomeLink = url === "/" && !path;

  return (
    <li className="flex">
      <Link
        href={url}
        // TW class added below for underline on hover effect
        // source: https://stackoverflow.com/a/73210353
        className={`hover:font- mx-4 flex items-center  ${
          (`/${path}` === url || isHomeLink) && "border-b-2 border-violet-400 "
        }}
        relative before:absolute before:bottom-0 before:left-0 before:block before:h-[2px] 
              before:w-full before:origin-top-left before:scale-x-0
              before:bg-violet-400 before:transition before:duration-300
              before:ease-in-out before:content-[''] before:hover:scale-x-100
        `}
      >
        {text}
      </Link>
    </li>
  );
}

export default function Navbar({
  links,
  logoImage,
  logoImageDark,
  logoText,
}: {
  links: Array<NavLink>;
  logoImage: StrapiMediaProps["file"] | null;
  logoImageDark: StrapiMediaProps["file"] | null;
  logoText: string | null;
}) {
  const { theme } = useTheme();
  return (
    <div className="mb-6 dark:bg-black dark:text-gray-100">
      <div className="container mx-auto  px-6">
        <Link
          href="/"
          aria-label="Back to homepage"
          className="flex justify-center p-2"
        >
          {logoImage && logoImageDark && (
            <StrapiMedia
              data={{ file: theme === Theme.DARK ? logoImageDark : logoImage }}
              className="sm:max-w-sm"
            />
          )}
        </Link>
        {logoText && (
          <h2 className="text-center text-2xl font-light">{logoText}</h2>
        )}
      </div>
      <div className="flex flex-shrink-0 justify-center  p-6">
        <ul className="flex items-stretch space-x-3">
          {links.map((item: NavLink) => (
            <NavLink key={item.id} {...item} />
          ))}
        </ul>
      </div>
    </div>
  );
}
