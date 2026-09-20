import SectionHeading from "@/components/SectionHeading";

const PLACEHOLDERS = [1, 2, 3, 4];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="w-full scroll-mt-24 px-6 py-32 sm:scroll-mt-0 sm:px-10 sm:py-100"
    >
      <SectionHeading>GALERIE</SectionHeading>

      <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 sm:mt-16 sm:grid-cols-2 sm:gap-x-6">
        {PLACEHOLDERS.map((item) => (
          <div key={item}>
            <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-white/[0.03]" />

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
