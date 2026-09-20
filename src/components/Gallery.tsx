import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";

const ITEMS = [
  {
    src: "/images/gallery/gallery-event-1.jpg",
    alt: "TONSAMMLER live am Pioneer-Setup",
    objectPosition: "object-top",
  },
  {
    src: "/images/gallery/gallery-event-2.jpg",
    alt: "TONSAMMLER am Mixer, Rückansicht",
    objectPosition: "object-center",
  },
  {
    src: "/images/gallery/gallery-event-3.jpg",
    alt: "TONSAMMLER live, rotes Licht",
    objectPosition: "object-center",
  },
  {
    src: "/images/gallery/gallery-event-4.jpg",
    alt: "TONSAMMLER backstage",
    objectPosition: "object-center",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="w-full scroll-mt-24 px-6 py-32 sm:scroll-mt-0 sm:px-10 sm:py-50"
    >
      <SectionHeading>GALERY</SectionHeading>

      <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 sm:mt-16 sm:grid-cols-2 sm:gap-x-6">
        {ITEMS.map((item) => (
          <div key={item.src}>
            <div className="relative aspect-[3/4] overflow-hidden border border-white/10 bg-white/[0.03]">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className={`object-cover ${item.objectPosition}`}
              />
            </div>

            <div className="mt-4 flex items-start justify-between gap-4">
              <h3 className="text-xl font-medium text-foreground/40 sm:text-2xl">
                Titel folgt
              </h3>
              <span aria-hidden="true" className="text-foreground/30">
                ↗
              </span>
            </div>

            <div className="mt-2 flex items-start justify-between gap-4">
              <p className="max-w-[70%] text-sm font-light text-foreground/40">
                Beschreibung folgt.
              </p>
              <span className="shrink-0 text-right text-xs font-medium uppercase tracking-[0.15em] text-foreground/30">
                Datum folgt
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
