import RichText from "@/app/[lang]/components/RichText";
import ImageSlider from "@/app/[lang]/components/ImageSlider";
import Quote from "@/app/[lang]/components/Quote";
import Media from "@/app/[lang]/components/Media";
import VideoEmbed from "@/app/[lang]/components/VideoEmbed";
import Gallery from "@/app/[lang]/components/strapi/sections/Gallery";
import Spacer from "@/app/[lang]/components/strapi/sections/Spacer";

export function globalRenderer(section: any, index: number) {
  switch (section.__component) {
    // Sections
    case "sections.gallery":
      return <Gallery key={index} data={section} />;
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
      return <Media key={index} data={section} />;
    case "shared.video-embed":
      return <VideoEmbed key={index} data={section} />;
    default:
      return null;
  }
}
