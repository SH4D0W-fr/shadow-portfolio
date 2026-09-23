import { useCallback, useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GreetingIntro } from "@/components/greeting-intro";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Stack } from "@/components/sections/stack";
import { Contact } from "@/components/sections/contact";

function App() {
  // L'intro joue à chaque chargement de la page.
  const [intro, setIntro] = useState(true);
  const finishIntro = useCallback(() => setIntro(false), []);

  return (
    <TooltipProvider>
      {intro ? <GreetingIntro onFinish={finishIntro} /> : null}

      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-lg focus:bg-foreground focus:px-3 focus:py-2 focus:text-sm focus:text-background"
      >
        Aller au contenu
      </a>

      <SiteHeader />

      <main id="contenu">
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Contact />
      </main>

      <SiteFooter />
    </TooltipProvider>
  );
}

export default App;
