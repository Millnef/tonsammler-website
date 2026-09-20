import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";

const STATS = [
  { value: "3", label: "Jahre aktiv" },
  { value: "2", label: "Jahre Mitgründer – IMPEDANZ Kollektiv" },
  { value: "60+", label: "Gigs gespielt" },
  { value: "8", label: "Veranstaltungen" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 w-full scroll-mt-24 overflow-hidden px-6 py-32 sm:scroll-mt-0 sm:px-10 sm:py-75"
    >
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 bottom-0 hidden w-[70%] sm:block"
        style={{
          maskImage:
            "radial-gradient(ellipse 62% 24% at 78% 80%, black 15%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 62% 24% at 78% 80%, black 15%, transparent 85%)",
        }}
      >
        <Image
          src="/images/about-photo.jpg"
          alt="TONSAMMLER live, CDJ im Vordergrund"
          fill
          sizes="50vw"
          className="object-contain object-right-bottom"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute right-0 top-[360px] h-[75vh] w-3/4 sm:hidden"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 55% at 100% 50%, black 15%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 100% 50%, black 15%, transparent 85%)",
        }}
      >
        <Image
          src="/images/about-photo.jpg"
          alt="TONSAMMLER live, CDJ im Vordergrund"
          fill
          sizes="75vw"
          className="object-cover object-right"
        />
      </div>

      <div className="relative z-10">
        <SectionHeading>ABOUT</SectionHeading>

        <p className="mt-8 max-w-2xl text-base font-light leading-relaxed text-foreground/70 sm:text-lg">
          Aufgewachsen zwischen München und Augsburg zieht sich elektronische
          Musik seit 10 Jahren unverändert durchs Leben — lange bevor
          daraus ein eigener Sound wurde. Heute steht der Name für Techno mit
          minimalistischen Strukturen, gebaut auf Repetition. Jeder Track und
          jedes Set ist der Versuch, Menschen zu bewegen, physisch wie
          emotional — „collecting feelings through sound" ist dabei mehr
          Haltung als Slogan.
        </p>

        <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-foreground/70 sm:text-lg">
          Als Mitgründer des IMPEDANZ Kollektivs gilt die gleiche
          Aufmerksamkeit, Menschen den Raum, den Musik öffnen kann, zu zeigen.
        </p>

        <div className="mt-16 flex flex-wrap gap-x-16 gap-y-8">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-medium sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-2 max-w-[12rem] text-xs font-medium uppercase tracking-[0.15em] text-foreground/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
