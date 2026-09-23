export const profile = {
  name: "SHADOW",
  role: "Développeur FiveM & Python",
  location: "France",
  available: true,
  tagline:
    "Parce que \"développer\" ne signifie pas que \"coder\".",
  bio: [
    "Développeur passionné par la qualité, je construis des produits où le détail compte.",
    "Des scripts FiveM aux applications complètes, j'estime que chaque projet mérite d'être mené à bout de manière professionnelle.",
  ],
  email: "contact@shadow-dev.fr",
  avatar: "",
};

export const stats = [
  { value: "3+", label: "années d'expérience" },
  { value: "20+", label: "projets livrés" },
  { value: "6", label: "clients accompagnés" },
];

export const navigation = [
  { label: "À propos", href: "#a-propos" },
  { label: "Projets", href: "#projets" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export const stack = [
  {
    title: "Interfaces",
    icon: "bringtofront",
    items: ["React", "Vite", "Next.js", "Tailwind CSS", "shadcn/ui", "HTML/CSS natif"],
  },
  {
    title: "Programmation",
    icon: "code",
    items: ["Python", "Lua", "SQL", "Javascript", "C#"],
  },
  {
    title: "Outils",
    icon: "wrench",
    items: ["Git", "Docker", "Cisco Packet Tracer", "GitHub Actions"],
  },
];

export const projects = [
  {
    title: "UNO",
    description:
      "Un UNO codé en Python avec une interface Electron.",
    tags: ["Python", "Electron.js", "React"],
    year: "2026",
    featured: true,
    links: { demo: "", repo: "https://github.com/SH4D0W-fr/uno-python" },
  },
  {
    title: "Background Remover",
    description:
      "Site internet permettant de retirer et de détourer des images dans le but de retirer leurs fonds.",
    tags: ["HTML/CSS", "Python", "Docker", "API"],
    year: "2026",
    featured: true,
    links: { demo: "https://removebg.lushstudio.dev", repo: "" },
  },
  {
    title: "lush-core",
    description:
      "Un core FiveM complet qui regroupe un ensemble de fonctionnalité avec un système de configuration dynamique directement en jeu.",
    tags: ["Lua", "React", "SQL"],
    year: "2026",
    featured: false,
    links: { demo: "", repo: "" },
  },
  {
    title: "Générateur de mot de passe",
    description:
      "Un logiciel simple qui permet de générer des mots de passe.",
    tags: ["C#"],
    year: "2025",
    featured: false,
    links: { demo: "", repo: "https://github.com/SH4D0W-fr/Password_Generator_CSharp" },
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/SH4D0W-fr", icon: "github" },
  // { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
];

/**
 * Clé d'accès Web3Forms, utilisée par le formulaire de contact.
 *
 * Publique par conception : elle ne fait que router le message vers l'adresse
 * associée, et se retrouve de toute façon en clair dans le bundle JavaScript.
 * Ce n'est donc pas un secret — inutile de la sortir dans un `.env`.
 * Pour la révoquer ou la régénérer : https://web3forms.com
 */
export const web3formsKey = "72b06449-ecdf-4047-b1a7-485d081b3bfa";

/** Origine publique du site, sans barre oblique finale. Sert aux donnees structurees. */
export const siteUrl = "https://shadow-dev.fr";
