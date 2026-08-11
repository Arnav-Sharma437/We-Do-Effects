import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerClass?: string;
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
}

const spacingMap = {
  none: "py-0",
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
  xl: "py-32 md:py-48",
};

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, containerClass, children, spacing = "md", ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("w-full relative", spacingMap[spacing], className)}
        {...props}
      >
        <div className={cn("mx-auto max-w-7xl px-6 md:px-12", containerClass)}>
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = "Section";
