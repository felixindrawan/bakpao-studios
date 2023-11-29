import type { Metadata } from "next";

import "@/app/[lang]/globals.css";
import { i18n } from "@/../i18n-config";

import { getStrapiMedia, getStrapiURL } from "@/app/[lang]/utils/api-helpers";
import { fetchAPI } from "@/app/[lang]/utils/fetch-api";
import Footer from "@/app/[lang]/components/Footer";
import Navbar from "@/app/[lang]/components/strapi/sections/Navbar";
import { ThemeProvider } from "@/app/[lang]/components/ThemeProvider";

const FALLBACK_SEO = {
  title: "Bakpao Studios",
  description: "Bakpao Studios by Caitlin T.",
};

async function getGlobal(): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "navbar.links",
      "navbar.navbarLogo.logoImg",
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
      "footer.categories",
    ],
  };

  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getGlobal();

  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const global = await getGlobal();
  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data) return null;

  const { navbar, footer } = global.data.attributes;

  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data.attributes.url,
  );

  const footerLogoUrl = getStrapiMedia(
    footer.footerLogo.logoImg.data.attributes.url,
  );

  return (
    <html lang={params.lang} className="scroll-smooth">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar
            links={navbar.links}
            logoImage={navbar.navbarLogo.logoImg}
            logoText={navbar.navbarLogo.logoText}
          />
          <main className="dark:bg-black dark:text-gray-100">{children}</main>
          <Footer
            logoUrl={footerLogoUrl}
            logoText={footer.footerLogo.logoText}
            menuLinks={footer.menuLinks}
            categoryLinks={footer.categories.data}
            legalLinks={footer.legalLinks}
            socialLinks={footer.socialLinks}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
