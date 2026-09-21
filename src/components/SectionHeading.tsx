import { forwardRef, type ReactNode } from "react";

type SectionHeadingProps = {
  children: ReactNode;
};

const SectionHeading = forwardRef<HTMLHeadingElement, SectionHeadingProps>(
  function SectionHeading({ children }, ref) {
    return (
      <h2
        ref={ref}
        className="text-[clamp(2.5rem,6vw,4.5rem)] font-extralight tracking-tight"
      >
        {children}
      </h2>
    );
  }
);

export default SectionHeading;
