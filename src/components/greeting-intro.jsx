import { useEffect, useState } from "react";
import { cn } from "cn";

const greetings = [
  "Welcome", "Bienvenue", "Bienvenido", "Willkommen", "Benvenuto",
  "Bem-vindo", "Welkom", "Välkommen", "Velkommen", "Tervetuloa",
  "Witamy", "Vítejte", "Üdvözöljük", "Bine ați venit", "Добро пожаловать",
  "Ласкаво просимо", "Καλώς ορίσατε", "Hoş geldiniz", "مرحبا", "ברוך הבא",
  "स्वागत है", "欢迎", "ようこそ", "환영합니다", "Chào mừng",
  "ยินดีต้อนรับ", "Selamat datang", "Karibu",
];

/** Durée d'affichage de chaque salutation, en millisecondes. */
const DELAY = 150;

/** Durée du fondu de sortie, alignée sur `.animate-intro-out`. */
const OUTRO = 500;

/**
 * Écran d'accueil : fait défiler les salutations, puis s'efface.
 * Se laisse passer d'un clic ou d'une touche.
 */
export function GreetingIntro({ onFinish }) {
  const [index, setIndex] = useState(0);
  const leaving = index >= greetings.length;

  useEffect(() => {
    if (leaving) {
      const id = setTimeout(onFinish, OUTRO);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setIndex((i) => i + 1), DELAY);
    return () => clearTimeout(id);
  }, [index, leaving, onFinish]);

  useEffect(() => {
    const skip = () => setIndex(greetings.length);
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-100 flex items-center justify-center bg-background",
        leaving && "animate-intro-out"
      )}
      role="status"
      aria-live="polite"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-glow opacity-60" />
      <span
        key={index}
        dir="auto"
        className="animate-greeting font-heading text-4xl font-medium tracking-tight text-foreground md:text-6xl"
      >
        {greetings[Math.min(index, greetings.length - 1)]}
      </span>
      <span className="absolute bottom-10 text-xs text-muted-foreground">
        Appuyez sur une touche pour passer
      </span>
    </div>
  );
}
