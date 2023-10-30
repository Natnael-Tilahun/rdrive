import { Image } from "@nextui-org/react";

type Props = {
  src: string;
  caption?: string;
  alt?: string;
};

export default function figcaption({ src, caption, alt }: Props) {
  if (caption !== undefined) {
    return (
      <figure>
        <Image src={src} alt={alt} />
        <figcaption>{caption}</figcaption>
      </figure>
    );
  } else {
    return <Image src={src} alt={alt} />;
  }
}
