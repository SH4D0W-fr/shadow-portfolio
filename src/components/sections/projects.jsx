import { ArrowUpRightIcon } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/section";
import { Github } from "@/components/icons";
import { projects } from "@/data/portfolio";

function ProjectCard({ project }) {
  return (
    <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:ring-foreground/20">
      <CardHeader>
        <CardTitle className="text-lg">
          <h3>{project.title}</h3>
        </CardTitle>
        <CardDescription>{project.description}</CardDescription>
        <CardAction>
          <Badge variant="ghost" className="text-muted-foreground">
            {project.year}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="mt-auto flex flex-col gap-4">
        <ul className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="secondary">{tag}</Badge>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {project.links.demo ? (
            <Button
              variant="outline"
              size="sm"
              render={
                <a href={project.links.demo} target="_blank" rel="noreferrer noopener" />
              }
            >
              Voir le projet
              <ArrowUpRightIcon data-icon="inline-end" />
            </Button>
          ) : null}
          {project.links.repo ? (
            <Button
              variant="ghost"
              size="sm"
              render={
                <a href={project.links.repo} target="_blank" rel="noreferrer noopener" />
              }
            >
              <Github data-icon="inline-start" className="size-3.5" />
              Code
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export function Projects() {
  return (
    <Section id="projets">
      <SectionHeader
        eyebrow="Projets"
        title="Une sélection de réalisations"
        description="Quelques projets représentatifs de ce que je construis au quotidien."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 80} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
