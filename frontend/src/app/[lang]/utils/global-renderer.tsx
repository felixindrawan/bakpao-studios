import RichText from "@/app/[lang]/components/strapi/shared/RichText";
import ImageSlider from "@/app/[lang]/components/strapi/shared/ImageSlider";
import Quote from "@/app/[lang]/components/strapi/shared/Quote";
import StrapiMedia from "@/app/[lang]/components/strapi/native/StrapiMedia";
import VideoEmbed from "@/app/[lang]/components/strapi/shared/VideoEmbed";
import Gallery from "@/app/[lang]/components/strapi/sections/Gallery";
import Spacer from "@/app/[lang]/components/strapi/sections/Spacer";
import ContactUsForm from "@/app/[lang]/components/strapi/sections/ContactUsForm";

export function globalRenderer(section: any, index: number) {
  switch (section.__component) {
    // Sections
    case "sections.gallery":
      return <Gallery key={index} data={section} />;
    case "sections.contact-us-form":
      return <ContactUsForm key={index} data={section} />;
    case "sections.spacer":
      return <Spacer key={index} data={section} />;
    // Shared
    case "shared.rich-text":
      return <RichText key={index} data={section} />;
    case "shared.slider":
      return <ImageSlider key={index} data={section} />;
    case "shared.quote":
      return <Quote key={index} data={section} />;
    case "shared.media":
      return <StrapiMedia key={index} data={section} />;
    case "shared.video-embed":
      return <VideoEmbed key={index} data={section} />;
    default:
      return null;
  }
}

export type StrapiComponent = {
  id: number;
  attributes: {
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  };
};
