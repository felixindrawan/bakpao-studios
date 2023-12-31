"use client";
import { usePathname } from "next/navigation";
import { Theme, ThemeSwitcher } from "@/app/components/ThemeProvider";

import Link from "next/link";
import Logo from "./Logo";
import { CgWebsite } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";
import {
  AiFillTwitterCircle,
  AiFillYoutube,
  AiFillInstagram,
} from "react-icons/ai";
import { useTheme } from "next-themes";

interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

interface CategoryLink {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}

function FooterLink({ url, text }: FooterLink) {
  const path = usePathname();
  return (
    <li className="flex">
      <Link
        href={url}
        className={`hover:dark:text-violet-400 ${
          path === url && "dark:border-violet-400 dark:text-violet-400"
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}

function CategoryLink({ attributes }: CategoryLink) {
  return (
    <li className="flex">
      <Link href={`/${attributes.slug}`} className="hover:dark:text-violet-400">
        {attributes.name}
      </Link>
    </li>
  );
}

function RenderSocialIcon({ social }: { social: string | undefined }) {
  switch (social) {
    case "WEBSITE":
      return <CgWebsite />;
    case "TWITTER":
      return <AiFillTwitterCircle />;
    case "YOUTUBE":
      return <AiFillYoutube />;
    case "DISCORD":
      return <FaDiscord />;
    case "INSTAGRAM":
      return <AiFillInstagram />;
    default:
      return null;
  }
}

export default function Footer({
  logoUrl,
  logoUrlDark,
  logoText,
  menuLinks,
  categoryLinks,
  legalLinks,
  socialLinks,
}: {
  logoUrl: string | null;
  logoUrlDark: string | null;
  logoText: string | null;
  menuLinks: Array<FooterLink>;
  categoryLinks: Array<CategoryLink>;
  legalLinks: Array<FooterLink>;
  socialLinks: Array<FooterLink>;
}) {
  const { theme } = useTheme();

  return (
    <footer className="dark:text-gray-20 mt-[20vh] py-6 dark:bg-black">
      <div className="flex justify-center space-x-4 pt-4 lg:col-end-13 lg:pt-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full dark:bg-violet-400 dark:text-gray-900 dark:hover:bg-violet-500">
          <ThemeSwitcher />
        </div>
        {socialLinks.map((link: FooterLink) => {
          return (
            <a
              key={link.id}
              rel="noopener noreferrer"
              href={link.url}
              title={link.text}
              target={link.newTab ? "_blank" : "_self"}
              className="flex h-10 w-10 items-center justify-center rounded-full dark:bg-violet-400 dark:text-gray-900 dark:hover:bg-violet-500"
            >
              <RenderSocialIcon social={link.social} />
            </a>
          );
        })}
      </div>
      <div className="mt-4 border-t-2 border-black pt-4 text-center dark:border-gray-900 ">
        ©{new Date().getFullYear()} All rights reserved
      </div>
    </footer>
  );

  return (
    <footer className="dark:text-gray-20 mt-[20vh] py-6 dark:bg-black">
      <div className=" container mx-auto space-y-6 divide-y divide-gray-400 divide-opacity-50 px-6 md:space-y-12">
        <div className="grid grid-cols-12">
          <div className="col-span-full pb-6 md:col-span-6 md:pb-0">
            <Logo src={theme === Theme.LIGHT ? logoUrl : logoUrlDark}>
              {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
            </Logo>
          </div>

          <div className="col-span-6 text-center md:col-span-3 md:text-left">
            <p className="pb-1 text-lg font-medium">Categories</p>
            <ul>
              {categoryLinks.map((link: CategoryLink) => (
                <CategoryLink key={link.id} {...link} />
              ))}
            </ul>
          </div>

          <div className="col-span-6 text-center md:col-span-3 md:text-left">
            <p className="pb-1 text-lg font-medium">Menu</p>
            <ul>
              {menuLinks.map((link: FooterLink) => (
                <FooterLink key={link.id} {...link} />
              ))}
            </ul>
          </div>
        </div>
        <div className="grid justify-center pt-6 lg:justify-between">
          <div className="flex">
            <span className="mr-2">
              ©{new Date().getFullYear()} All rights reserved
            </span>
            <ul className="flex">
              {legalLinks.map((link: FooterLink) => (
                <Link
                  href={link.url}
                  className="mr-2 text-gray-400 hover:text-gray-300"
                  key={link.id}
                >
                  {link.text}
                </Link>
              ))}
            </ul>
          </div>
          <div className="flex justify-center space-x-4 pt-4 lg:col-end-13 lg:pt-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full dark:bg-violet-400 dark:text-gray-900 dark:hover:bg-violet-500">
              <ThemeSwitcher />
            </div>
            {socialLinks.map((link: FooterLink) => {
              return (
                <a
                  key={link.id}
                  rel="noopener noreferrer"
                  href={link.url}
                  title={link.text}
                  target={link.newTab ? "_blank" : "_self"}
                  className="flex h-10 w-10 items-center justify-center rounded-full dark:bg-violet-400 dark:text-gray-900 dark:hover:bg-violet-500"
                >
                  <RenderSocialIcon social={link.social} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
