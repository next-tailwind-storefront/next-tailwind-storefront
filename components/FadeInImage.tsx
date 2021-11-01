import { useState } from "react";
import Image, { ImageProps } from "next/image";

export default function FadeInImage({
  className,
  alt,
  src,
  ...props
}: ImageProps) {
  const [opacityClassName, setOpacityClassName] = useState("opacity-0");
  return (
    <Image
      alt={alt}
      src={src}
      className={`transition-opacity duration-1000 ${opacityClassName} ${className}`}
      onLoadingComplete={() => setOpacityClassName("opacity-100")}
      {...props}
    />
  );
}
