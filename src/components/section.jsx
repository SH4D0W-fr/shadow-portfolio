import { cn } from "cn";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";

/** Coquille commune à toutes les sections : ancre, largeur max et rythme vertical. */
export function Section({ id, className, children, ...props }) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-20 border-t border-border/60 py-20 md:py-28", className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

/** En-tête de section : étiquette, titre et accroche. */
export function SectionHeader({ eyebrow, title, description, className }) {
  return (
    <Reveal className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <Badge variant="outline" className="mb-4 text-muted-foreground">
          {eyebrow}
        </Badge>
      ) : null}
      <h2 className="font-heading text-3xl font-medium tracking-tight text-balance md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base text-pretty text-muted-foreground">{description}</p>
      ) : null}
    </Reveal>
  );
}
