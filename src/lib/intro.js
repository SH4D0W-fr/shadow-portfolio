const STORAGE_KEY = "shadow-intro-seen";

/** Vrai si l'intro a déjà été jouée pendant cette session, ou si l'animation est désactivée. */
export function shouldSkipIntro() {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function markIntroSeen() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* stockage indisponible : l'intro rejouera au prochain chargement */
  }
}
