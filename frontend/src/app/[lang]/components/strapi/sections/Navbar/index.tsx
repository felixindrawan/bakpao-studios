// ./frontend/src/app/[lang]/components/Navbar.tsx

"use client";
import Logo from "../../../Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "../../../ThemeProvider/ThemeSwitcher";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

function NavLink({ url, text }: NavLink) {
  const path = usePathname();

  return (
    <li className="flex">
      <Link
        href={url}
        className={`mx-4 flex items-center border-b-2 dark:border-transparent ${
          path === url && "dark:border-violet-400 dark:text-violet-400"
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}

export default function Navbar({
  links,
  logoUrl,
  logoText,
}: {
  links: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
}) {
  return (
    <div className="p-4 dark:bg-black dark:text-gray-100">
      <div className="container mx-auto flex h-16 justify-between px-0 sm:px-6">
        <Logo src={logoUrl}>
          {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
        </Logo>

        <div className="hidden flex-shrink-0 items-center lg:flex">
          <ThemeSwitcher />
          <ul className="hidden items-stretch space-x-3 lg:flex">
            {links.map((item: NavLink) => (
              <NavLink key={item.id} {...item} />
            ))}
          </ul>
        </div>

        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 dark:text-gray-100"
          >
            test
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
