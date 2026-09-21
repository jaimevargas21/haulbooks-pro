import Image from "next/image";

export function BrandMark({
  src,
  height = "2.25rem",
  priority = false,
}: {
  src: string;
  height?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt="HaulBooks Pro"
      width={176}
      height={72}
      priority={priority}
      style={{ width: "auto", height }}
    />
  );
}
