import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/section";
import { profile, stats } from "@/data/portfolio";

export function About() {
  const initials = profile.name.slice(0, 2).toUpperCase();

  return (
    <Section id="a-propos">
      <SectionHeader
        eyebrow="À propos"
        title="De l'idée à la solution"
        description="Un rapide aperçu de ma façon de travailler."
      />

      <div className="mt-12 grid gap-10 md:grid-cols-[1fr_auto_18rem]">
        <Reveal className="space-y-4 text-base text-pretty text-muted-foreground">
          {profile.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>

        <Separator orientation="vertical" className="hidden md:block" />

        <Reveal delay={120} className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              {profile.avatar ? <AvatarImage src={profile.avatar} alt={profile.name} /> : null}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium text-foreground">{profile.name}</p>
              <p className="text-muted-foreground">{profile.role}</p>
            </div>
          </div>

          <dl className="grid grid-cols-3 gap-4 md:grid-cols-1">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="font-heading block text-2xl font-medium tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
