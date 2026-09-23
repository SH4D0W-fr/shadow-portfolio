import { useState } from "react";
import {
  CheckIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  CopyIcon,
  LoaderCircleIcon,
  MailIcon,
  SendIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/section";
import { profile, web3formsKey } from "@/data/portfolio";

const ENDPOINT = "https://api.web3forms.com/submit";

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

/** Retour visuel sous le bouton d'envoi. */
function FormStatus({ status }) {
  if (status === "idle") return null;

  const messages = {
    sending: { icon: LoaderCircleIcon, text: "Envoi en cours…", className: "" },
    success: {
      icon: CircleCheckIcon,
      text: "Message envoyé, merci ! Je répondrai le plus vite possible !",
      className: "text-foreground",
    },
    error: {
      icon: CircleAlertIcon,
      text: "L'envoi a échoué. Réessayez ou écrivez-moi directement.",
      className: "text-destructive",
    },
  };

  const { icon: Icon, text, className } = messages[status];

  return (
    <p className={`flex items-center gap-1.5 text-sm text-muted-foreground ${className}`}>
      <Icon className={`size-4 ${status === "sending" ? "animate-spin" : ""}`} />
      {text}
    </p>
  );
}

export function Contact() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Capturé avant l'await : React vide `currentTarget` dès la fin du handler.
    const form = event.currentTarget;
    const data = new FormData(form);
    data.append("access_key", web3formsKey);
    data.append("subject", `Portfolio — nouveau message de ${data.get("name")}`);

    setStatus("sending");

    try {
      const response = await fetch(ENDPOINT, { method: "POST", body: data });
      const result = await response.json();

      if (!result.success) throw new Error(result.message);

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const sending = status === "sending";

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

                {/* Piège à robots : Web3Forms rejette l'envoi si ce champ est rempli. */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <div className="flex flex-wrap items-center gap-3">
                  <Button type="submit" size="lg" disabled={sending}>
                    {sending ? "Envoi…" : "Envoyer"}
                    {sending ? (
                      <LoaderCircleIcon data-icon="inline-end" className="animate-spin" />
                    ) : (
                      <SendIcon data-icon="inline-end" />
                    )}
                  </Button>
                  <div aria-live="polite">
                    <FormStatus status={status} />
                  </div>
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
                  {profile.location} - en remote.
                </p>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
