/**
 * Pré-rendu du site après `vite build`.
 *
 * Deux choses sont injectées dans `dist/index.html` :
 *  1. le HTML complet de l'application, pour que les robots qui n'exécutent pas
 *     de JavaScript (Bing, LinkedIn, Discord…) voient le contenu ;
 *  2. les données structurées JSON-LD, construites depuis `src/data/portfolio.js`
 *     pour qu'elles restent synchronisées avec le contenu réel du site.
 *
 * L'application est rendue telle quelle, intro comprise : le premier affichage
 * est donc identique à ce que React produira ensuite, sans clignotement.
 */
import fs from "node:fs/promises";
import path from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

const ROOT = process.cwd();
const TARGET = path.join(ROOT, "dist", "index.html");
const PLACEHOLDER = '<div id="root"></div>';

/** Échappe les séquences qui fermeraient prématurément la balise <script>. */
function safeJsonLd(value) {
  return JSON.stringify(value, null, 2).replace(/</g, "\u003c");
}

function buildJsonLd({ profile, projects, stack, socials, siteUrl }) {
  const person = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: profile.name,
    url: `${siteUrl}/`,
    jobTitle: profile.role,
    description: profile.bio.join(" "),
    email: `mailto:${profile.email}`,
    knowsAbout: stack.flatMap((group) => group.items),
    address: {
      "@type": "PostalAddress",
      addressCountry: "FR",
      addressLocality: profile.location,
    },
    sameAs: socials
      .map((social) => social.href)
      .filter((href) => href.startsWith("http")),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: `${profile.name} — ${profile.role}`,
    inLanguage: "fr-FR",
    publisher: { "@id": person["@id"] },
  };

  const profilePage = {
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#webpage`,
    url: `${siteUrl}/`,
    name: `${profile.name} — ${profile.role}`,
    isPartOf: { "@id": website["@id"] },
    about: { "@id": person["@id"] },
    inLanguage: "fr-FR",
  };

  const portfolio = {
    "@type": "ItemList",
    "@id": `${siteUrl}/#projets`,
    name: "Projets",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.description,
        applicationCategory: "DeveloperApplication",
        keywords: project.tags.join(", "),
        author: { "@id": person["@id"] },
        ...(project.links.demo ? { url: project.links.demo } : {}),
        ...(project.links.repo ? { codeRepository: project.links.repo } : {}),
      },
    })),
  };

  return { "@context": "https://schema.org", "@graph": [person, website, profilePage, portfolio] };
}

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

try {
  const { default: App } = await server.ssrLoadModule("/src/App.jsx");
  const data = await server.ssrLoadModule("/src/data/portfolio.js");

  const appHtml = renderToString(React.createElement(App));
  const jsonLd = safeJsonLd(buildJsonLd(data));

  const template = await fs.readFile(TARGET, "utf8");
  if (!template.includes(PLACEHOLDER)) {
    throw new Error(`Point d'injection "${PLACEHOLDER}" introuvable dans dist/index.html`);
  }
  if (!template.includes("</head>")) {
    throw new Error("Balise </head> introuvable dans dist/index.html");
  }

  const output = template
    .replace(PLACEHOLDER, `<div id="root">${appHtml}</div>`)
    .replace(
      "</head>",
      `  <script type="application/ld+json">\n${jsonLd}\n    </script>\n  </head>`
    );

  await fs.writeFile(TARGET, output);
  console.log(
    `Pré-rendu : ${(appHtml.length / 1024).toFixed(1)} Ko de HTML + ` +
      `${data.projects.length} projets en données structurées.`
  );
} finally {
  await server.close();
}
