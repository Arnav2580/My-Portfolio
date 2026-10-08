"use client";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
const hintKey = "portfolio-theme-hint-seen-v1";
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [ready, setReady] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const hint = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const hintTimer = useRef<number | undefined>(undefined);
  useEffect(() => {
    setReady(true);
    try {
      if (localStorage.getItem(hintKey)) return;
    } catch {}
    hintTimer.current = window.setTimeout(() => {
      setShowHint(true);
      try {
        localStorage.setItem(hintKey, "1");
      } catch {}
    }, 1200);
    return () => window.clearTimeout(hintTimer.current);
  }, []);
  useEffect(() => {
    if (!showHint) return;
    const timer = window.setTimeout(() => {
      // Do not remove a control while a keyboard user is interacting with it.
      if (!hint.current?.contains(document.activeElement)) setShowHint(false);
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [showHint]);
  function dismissHint() {
    window.clearTimeout(hintTimer.current);
    if (hint.current?.contains(document.activeElement)) toggle.current?.focus();
    setShowHint(false);
    try {
      localStorage.setItem(hintKey, "1");
    } catch {}
  }
  const dark = ready && resolvedTheme === "dark";
  return (
    <div
      className="theme-control"
      onKeyDown={(event) => {
        if (event.key === "Escape" && showHint) dismissHint();
      }}
    >
      <button
        ref={toggle}
        className="icon-button"
        aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
        disabled={!ready}
        onClick={() => {
          dismissHint();
          setTheme(dark ? "light" : "dark");
        }}
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          {dark ? (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
            </>
          ) : (
            <path d="M20.7 14.5A9 9 0 0 1 9.5 3.3 9 9 0 1 0 20.7 14.5Z" />
          )}
        </svg>
      </button>
      {showHint && (
        <div className="theme-hint" ref={hint}>
          <p role="status">
            Your screen, your mood.
            <br />
            <span>Tap here to switch light or dark.</span>
          </p>
          <button
            type="button"
            aria-label="Dismiss theme tip"
            onClick={dismissHint}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
