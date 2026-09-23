import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { navigation, profile } from "@/data/portfolio";

function Wordmark({ className }) {
  return (
    <a
      href="#accueil"
      className={cn(
        "font-heading text-sm font-semibold tracking-[0.2em] uppercase transition-opacity hover:opacity-70",
        className
      )}
    >
      {profile.name}
    </a>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Wordmark />

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Button variant="ghost" size="sm" render={<a href={item.href} />}>
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button
            size="sm"
            className="hidden md:inline-flex"
            render={<a href="#contact" />}
          >
            Me contacter
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon-sm" className="md:hidden" aria-label="Ouvrir le menu" />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="tracking-[0.2em] uppercase">{profile.name}</SheetTitle>
              </SheetHeader>
              <nav aria-label="Navigation mobile" className="px-4">
                <ul className="flex flex-col gap-1">
                  {navigation.map((item) => (
                    <li key={item.href}>
                      <SheetClose
                        render={
                          <a
                            href={item.href}
                            className="block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                          />
                        }
                      >
                        {item.label}
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
