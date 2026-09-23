import { ArrowRightIcon, MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { Github, Linkedin } from "@/components/icons";
import { profile, socials } from "@/data/portfolio";
import heroImage from "@/assets/dev.png";

const socialIcons = { github: Github, linkedin: Linkedin };

export function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Décor : trame, halo et dégradé de fondu vers le bas */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute inset-x-0 -top-40 h-[32rem] bg-glow" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-5xl items-center gap-12 px-4 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <Reveal>
            {profile.available ? (
              <Badge variant="outline" className="gap-2 text-muted-foreground">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
                </span>
                Disponible pour de nouveaux projets
              </Badge>
            ) : null}
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-heading text-4xl font-medium tracking-tight text-balance sm:text-5xl md:text-6xl">
              <span className="text-gradient">{profile.name}</span>{" "}
              <span className="block text-muted-foreground">{profile.role}</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base text-pretty text-muted-foreground md:text-lg">
              {profile.tagline}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" render={<a href="#projets" />}>
                Voir mes projets
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
              <Button size="lg" variant="outline" render={<a href="#contact" />}>
                Me contacter
              </Button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPinIcon className="size-4" />
                {profile.location}
              </span>
              <span className="h-4 w-px bg-border" />
              <ul className="flex items-center gap-1">
                {socials
                  .filter((s) => socialIcons[s.icon])
                  .map((social) => {
                    const Icon = socialIcons[social.icon];
                    return (
                      <li key={social.label}>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={social.label}
                          render={
                            <a href={social.href} target="_blank" rel="noreferrer noopener" />
                          }
                        >
                          <Icon className="size-4" />
                        </Button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="hidden justify-self-end md:block">
          <img
            src={heroImage}
            alt=""
            aria-hidden="true"
            className="ml-auto w-full max-w-xs drop-shadow-2xl select-none"
          />
        </Reveal>
      </div>
    </section>
  );
}
