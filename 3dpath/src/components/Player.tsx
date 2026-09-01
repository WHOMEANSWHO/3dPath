import { useEffect, useRef, useState } from "react";
import type { PacePack } from "../data/pace";
import { setVideoId } from "../lib/store";
import { embedUrl, extractYouTubeId, formatStart, isFileProtocol, watchUrl } from "../lib/youtube";

interface Props {
  lessonId: number;
  pack: PacePack;
  override: string;
  activeClip: number | null;
  allowFloat: boolean;
}

export default function Player({ lessonId, pack, override, activeClip, allowFloat }: Props) {
  const [link, setLink] = useState("");
  const [linkError, setLinkError] = useState(false);
  const [floating, setFloating] = useState(false);
  const anchor = useRef<HTMLDivElement>(null);

  const clip = activeClip !== null ? pack.clips[activeClip] : undefined;
  const start = clip ? clip.start : 0;
  const packDefault = override || pack.videoId;
  const videoId = clip?.videoId || packDefault;
  const fromDisk = isFileProtocol();
  const onYouTube = videoId ? watchUrl(videoId, start) : "";

  useEffect(() => {
    if (!allowFloat || !videoId || fromDisk) {
      setFloating(false);
      return;
    }
    const el = anchor.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setFloating(!entry.isIntersecting), {
      threshold: 0,
      rootMargin: "-56px 0px 0px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [allowFloat, videoId, fromDisk]);

  const addLink = () => {
    const id = extractYouTubeId(link);
    if (!id) {
      setLinkError(true);
      return;
    }
    setLinkError(false);
    setLink("");
    setVideoId(lessonId, id);
  };

  return (
    <div ref={anchor} className="relative aspect-video w-full">
      <div className={`player-dock ${floating ? "floating" : ""}`}>
        {videoId && fromDisk ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-[6px] border border-dashed border-line2 bg-well/70 px-6 text-center">
            <p className="display text-xl font-semibold text-paper">YouTube will not play in this tab</p>
            <p className="max-w-[46ch] text-[0.84rem] leading-relaxed text-muted">
              Opening the HTML file from disk has no website address, so YouTube shows Error 153. Close this
              tab and use Start 3dPath.bat — or watch the clip on YouTube.
            </p>
            <a
              href={onYouTube}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center rounded-[4px] bg-amber px-4 text-[0.88rem] font-semibold text-night hover:bg-amber2"
            >
              Watch on YouTube from {formatStart(start)}
            </a>
          </div>
        ) : videoId ? (
          <div className="relative h-full w-full">
            <iframe
              key={`${videoId}-${activeClip ?? "x"}-${start}`}
              src={embedUrl(videoId, start, activeClip !== null)}
              title={clip ? clip.label.replace(/\[\[|\]\]/g, "") : pack.videoNote}
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full rounded-[6px] border border-line bg-black"
            />
            <a
              href={onYouTube}
              target="_blank"
              rel="noreferrer"
              className="absolute right-2 bottom-2 rounded-[4px] bg-night/80 px-2 py-1 font-mono text-[0.66rem] text-faint hover:text-amber"
            >
              Open on YouTube
            </a>
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-[6px] border border-dashed border-line2 bg-well/70 px-6 text-center">
            <p className="display text-xl font-semibold text-paper">
              Watch at 0.75&times;. Pause and copy every step.
            </p>
            <p className="max-w-[42ch] text-[0.84rem] leading-relaxed text-muted">{pack.videoNote}</p>
            <div className="mt-1 flex w-full max-w-sm gap-2">
              <label htmlFor={`link-${lessonId}`} className="sr-only">
                YouTube link
              </label>
              <input
                id={`link-${lessonId}`}
                value={link}
                onChange={(e) => setLink(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addLink()}
                placeholder="Paste the YouTube link"
                className="h-11 min-w-0 flex-1 rounded-[4px] border border-line bg-night px-3 text-[0.85rem] text-paper placeholder:text-faint focus:border-amber focus:outline-none"
              />
              <button
                type="button"
                onClick={addLink}
                className="h-11 shrink-0 rounded-[4px] border border-amber/70 px-4 text-[0.85rem] font-medium text-amber transition-colors hover:bg-amberdim"
              >
                Add video
              </button>
            </div>
            {linkError ? (
              <p className="font-mono text-[0.72rem] text-rust2">That is not a YouTube link. Copy it from the address bar.</p>
            ) : (
              <p className="font-mono text-[0.72rem] text-faint">
                Clips below start at their timestamps once a video is linked
                {clip ? ` — next: ${formatStart(clip.start)}` : ""}.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
