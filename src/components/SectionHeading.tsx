import { forwardRef, type ReactNode } from "react";

type SectionHeadingProps = {
  children: ReactNode;
  /** decorative line elements, positioned relative to the heading */
  lines?: ReactNode;
};

const SectionHeading = forwardRef<HTMLHeadingElement, SectionHeadingProps>(
  function SectionHeading({ children, lines }, ref) {
    return (
      <h2
        ref={ref}
        className="relative text-[clamp(2.5rem,6vw,4.5rem)] font-extralight tracking-tight"
      >
        {children}
        {lines}
      </h2>
    );
  }
);

export default SectionHeading;
