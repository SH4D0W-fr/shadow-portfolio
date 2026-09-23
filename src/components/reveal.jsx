import { useEffect, useRef, useState } from "react";
import { cn } from "cn";

/** Sans IntersectionObserver ou en mouvement réduit, le contenu est visible d'emblée. */
function isAlwaysVisible() {
  if (typeof window === "undefined") return true;
  if (typeof IntersectionObserver === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Révèle son contenu lorsqu'il entre dans le viewport. */
export function Reveal({ className, delay = 0, children, ...props }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(isAlwaysVisible);

  useEffect(() => {
    const node = ref.current;
    if (visible || !node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
