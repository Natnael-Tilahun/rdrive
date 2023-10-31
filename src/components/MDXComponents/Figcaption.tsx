import { Image } from "@nextui-org/react";

type Props = {
  src: string;
  caption?: string;
  alt?: string;
  width?: string;
  height?: string;
};

export default function figcaption({ src, caption, alt, width, height  }: Props) {
  if (caption !== undefined) {
    return (
      <figure>
        <Image src={src} alt={alt} width={width} height={height} />
        <figcaption>{caption}</figcaption>
      </figure>
    );
  } else {
    return <Image src={src} alt={alt} width={width} height={height} />;
  }
}
