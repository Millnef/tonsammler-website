import type { ReactNode } from "react";

type SectionHeadingProps = {
  children: ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-extralight tracking-tight">
      {children}
    </h2>
  );
}
