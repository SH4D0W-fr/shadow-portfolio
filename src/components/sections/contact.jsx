import { useState } from "react";
import { CheckIcon, CopyIcon, MailIcon, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/section";
import { profile } from "@/data/portfolio";

/** Copie l'adresse e-mail et confirme brièvement. */
function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* presse-papiers indisponible : le lien mailto reste utilisable */
    }
  };

  return (
    <Button variant="ghost" size="icon-sm" onClick={copy} aria-label="Copier l'adresse e-mail">
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);

  /**
   * Ébauche : aucun back-end n'est branché pour l'instant.
   * Remplacer par un appel à votre service (Formspree, Resend, API maison…).
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <Section id="contact">
      <SectionHeader
        eyebrow="Contact"
        title="Parlons de votre projet"
        description="Une idée, une mission, une simple question ? Le message arrive directement dans ma boîte."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-[1fr_20rem]">
        <Reveal>
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input id="name" name="name" placeholder="Votre nom" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="vous@exemple.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Décrivez votre projet en quelques lignes…"
                    required
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Button type="submit" size="lg">
                    Envoyer
                    <SendIcon data-icon="inline-end" />
                  </Button>
                  <p aria-live="polite" className="text-sm text-muted-foreground">
                    {sent ? "Merci ! Le formulaire n'est pas encore relié à un service d'envoi." : null}
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={120}>
          <Card className="h-full">
            <CardContent className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-medium">Par e-mail</p>
                <div className="mt-1 flex items-center gap-1">
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    <MailIcon className="size-4" />
                    {profile.email}
                  </a>
                  <CopyEmailButton />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">Délai de réponse</p>
                <p className="mt-1 text-sm text-muted-foreground">Sous 48 heures ouvrées.</p>
              </div>

              <div>
                <p className="text-sm font-medium">Localisation</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {profile.location} — missions à distance.
                </p>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
