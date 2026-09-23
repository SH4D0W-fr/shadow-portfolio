import { MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin } from "@/components/icons";
import { navigation, profile, socials } from "@/data/portfolio";

const icons = { github: Github, linkedin: Linkedin, mail: MailIcon };

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-12">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-sm font-semibold tracking-[0.2em] uppercase">
              {profile.name}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{profile.role}</p>
          </div>

          <ul className="flex items-center gap-1">
            {socials.map((social) => {
              const Icon = icons[social.icon];
              return (
                <li key={social.label}>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={social.label}
                    render={
                      <a
                        href={social.href}
                        {...(social.href.startsWith("http")
                          ? { target: "_blank", rel: "noreferrer noopener" }
                          : {})}
                      />
                    }
                  >
                    <Icon className="size-4" />
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}. Tous droits réservés.
          </p>
          <nav aria-label="Navigation de pied de page">
            <ul className="flex flex-wrap items-center gap-4">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-colors hover:text-foreground">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
