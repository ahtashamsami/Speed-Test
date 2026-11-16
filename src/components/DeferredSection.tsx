import { useEffect, useRef, useState, type ReactNode } from 'react';

interface DeferredSectionProps {
  children: ReactNode;
  fallback: ReactNode;
  /** Maximum delay in ms before hydrating even if user has not scrolled */
  idleTimeoutMs?: number;
}

/**
 * Defers rendering and lazy chunk fetching of non-critical below-the-fold sections
 * until the section approaches the viewport or the browser becomes idle after LCP.
 */
export function DeferredSection({
  children,
  fallback,
  idleTimeoutMs = 1200,
}: DeferredSectionProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldRender) return;

    let cancelled = false;
    const activate = () => {
      if (!cancelled) setShouldRender(true);
    };

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined' && anchorRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            activate();
            observer?.disconnect();
          }
        },
        { rootMargin: '300px 0px' }
      );
      observer.observe(anchorRef.current);
    }

    let idleHandle: number | null = null;
    let timeoutHandle: number | null = null;

    if (typeof window.requestIdleCallback === 'function') {
      idleHandle = window.requestIdleCallback(activate, { timeout: idleTimeoutMs });
    } else {
      timeoutHandle = window.setTimeout(activate, Math.min(idleTimeoutMs, 600));
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (idleHandle !== null && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== null) {
        window.clearTimeout(timeoutHandle);
      }
    };
  }, [shouldRender, idleTimeoutMs]);

  return (
    <div ref={anchorRef}>
      {shouldRender ? children : fallback}
    </div>
  );
}
