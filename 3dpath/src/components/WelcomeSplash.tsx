import { useState } from "react";

const WELCOME_KEY = "3dpath:welcome-v1";

const seen = () => {
  try {
    return localStorage.getItem(WELCOME_KEY) === "1";
  } catch {
    return false;
  }
};

export default function WelcomeSplash() {
  const [open, setOpen] = useState(() => !seen());

  const dismiss = () => {
    try {
      localStorage.setItem(WELCOME_KEY, "1");
    } catch {
      /* blocked — still close so they can learn */
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-night/80 px-4 py-8">
      <div role="dialog" aria-labelledby="welcome-title" aria-modal="true" className="card max-h-[90vh] w-full max-w-lg overflow-y-auto p-6 desk:p-8">
        <p className="font-mono text-[0.72rem] text-faint">First launch</p>
        <h2 id="welcome-title" className="display mt-1 text-3xl font-bold">
          How to open this
        </h2>
        <ol className="mt-5 space-y-4 text-[0.9rem] leading-relaxed text-muted">
          <li>
            <span className="font-semibold text-paper">Windows may warn.</span> SmartScreen appears because the app is not
            signed. Click <span className="text-amber">More info</span>, then <span className="text-amber">Run anyway</span>.
          </li>
          <li>
            <span className="font-semibold text-paper">YouTube needs the internet.</span> This window is only the school. Clips
            play from YouTube; official docs open in your normal browser.
          </li>
          <li>
            <span className="font-semibold text-paper">Blender is separate.</span> So are GTA V, CodeWalker, and FiveM. 3dPath
            does not install them.
          </li>
          <li>
            <span className="font-semibold text-paper">Slow starts at 0.75×.</span> You do not change the YouTube gear for
            that. Fast is 1×. Progress stays on this PC — Notes has a backup download.
          </li>
        </ol>
        <button
          type="button"
          onClick={dismiss}
          className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-[4px] bg-amber text-[0.92rem] font-semibold text-night hover:bg-amber2"
        >
          Got it — open the school
        </button>
      </div>
    </div>
  );
}
