import { BringToFront, Code2Icon, ServerIcon, WrenchIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/section";
import { stack } from "@/data/portfolio";

const icons = { code: Code2Icon, server: ServerIcon, wrench: WrenchIcon, bringtofront: BringToFront };

export function Stack() {
  return (
    <Section id="stack">
      <SectionHeader
        eyebrow="Stack"
        title="Les outils que j'utilise"
        description="Des technologies éprouvées, choisies pour la lisibilité du code et la vitesse d'itération."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {stack.map((group, i) => {
          const Icon = icons[group.icon];
          return (
            <Reveal key={group.title} delay={i * 80} className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {Icon ? <Icon className="size-4 text-muted-foreground" /> : null}
                    {group.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Badge variant="outline" className="text-muted-foreground">
                          {item}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
