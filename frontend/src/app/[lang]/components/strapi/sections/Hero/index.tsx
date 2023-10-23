import Media, { MediaProps } from "@/app/[lang]/components/Media";
import Link from "next/link";

interface ButtonProps {
  newTab: boolean;
  text: string;
  type?: "primary" | "secondary";
  url: string;
}

interface HeroProps {
  title: string;
  description: string;
  picture: MediaProps;
  buttons: ButtonProps[];
}

export default function Hero({ data }: { data: HeroProps }) {
  const { title, description, picture, buttons } = data;
  console.log(data);
  return (
    <div className="relative h-screen w-full">
      <Media
        data={{ file: picture }}
        className="absolute inset-0 h-full w-full object-cover  brightness-50 filter"
      ></Media>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white">{title}</h1>
        <p className="mt-4 text-xl text-white">{description}</p>
        {buttons?.map(({ text, url, newTab }, index) => (
          <Link
            className="text-md mt-4 inline-block rounded  border px-12 py-3 font-medium  hover:bg-violet-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
            href={url}
            key={index}
            target={newTab ? "_blank" : "_self"}
          >
            {text}
          </Link>
        ))}
      </div>
    </div>
  );
}
