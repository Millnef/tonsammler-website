import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";

const IMAGES = [
  { src: "/images/booking-art.webp", alt: "Resin-Art-Piece" },
  { src: "/images/about-photo.jpg", alt: "TONSAMMLER live im roten Licht" },
  { src: "/images/gallery/gallery-ice.jpg", alt: "Eiskristall-Textur" },
  { src: "/images/gallery/gallery-paper.jpg", alt: "Zerknitterte Papier-Textur" },
  { src: "/images/gallery/gallery-sky.jpg", alt: "Wolkenhimmel bei Sonnenuntergang" },
  { src: "/images/gallery/gallery-portrait.jpg", alt: "Portrait von TONSAMMLER" },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="w-full scroll-mt-24 px-6 py-32 sm:scroll-mt-0 sm:px-10 sm:py-75"
    >
      <SectionHeading>GALERIE</SectionHeading>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-16 sm:grid-cols-3 sm:gap-6">
        {IMAGES.map((image) => (
          <div
            key={image.src}
            className="relative aspect-square overflow-hidden border border-white/10"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
