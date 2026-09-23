export const profile = {
  name: "SHADOW",
  role: "Développeur",
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
    links: { demo: "https://github.com/SH4D0W-fr/uno-python/releases/download/v2.0/Uno-Installer.exe", repo: "https://github.com/SH4D0W-fr/uno-python" },
  },
  {
    title: "Atlas Design System",
    description:
      "Bibliothèque de 40+ composants accessibles, documentée sous Storybook et publiée en interne.",
    tags: ["Design System", "Tailwind", "Storybook"],
    year: "2025",
    featured: true,
    links: { demo: "#", repo: "#" },
  },
  {
    title: "Orbit CLI",
    description:
      "Générateur de projets en ligne de commande : templates, presets et scripts de déploiement.",
    tags: ["Node.js", "CLI", "DX"],
    year: "2024",
    featured: false,
    links: { demo: "", repo: "#" },
  },
  {
    title: "Lumen",
    description:
      "Site vitrine d'un studio photo, animations au scroll et images optimisées, 100/100 Lighthouse.",
    tags: ["Next.js", "Motion", "SEO"],
    year: "2024",
    featured: false,
    links: { demo: "#", repo: "" },
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com", icon: "github" },
  // { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "Email", href: "mailto:contact@shadow.dev", icon: "mail" },
];
