export const extractYouTubeId = (input: string): string | null => {
  const m = input.trim().match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})|^([A-Za-z0-9_-]{11})$/);
  return m ? (m[1] ?? m[2]) : null;
};

export const isFileProtocol = () => typeof window !== "undefined" && window.location.protocol === "file:";

const startSeconds = (start: number) => Math.max(0, Math.floor(start));

/** Watch page — always works, including from a file:// tab. */
export const watchUrl = (videoId: string, start: number) => {
  const t = startSeconds(start);
  return `https://www.youtube.com/watch?v=${videoId}${t ? `&t=${t}` : ""}`;
};

/**
 * Embeds need a real http(s) origin and a Referer. youtube-nocookie + file://
 * is what produces Error 153 (Video player configuration error).
 */
export const embedUrl = (videoId: string, start: number, autoplay: boolean) => {
  const t = startSeconds(start);
  const params = new URLSearchParams({
    start: String(t),
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    enablejsapi: "1",
  });
  if (autoplay) params.set("autoplay", "1");
  if (typeof window !== "undefined" && window.location.protocol.startsWith("http")) {
    params.set("origin", window.location.origin);
  }
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
};

export const playbackRateForPace = (pace: "slow" | "fast") => (pace === "slow" ? 0.75 : 1);

/** Ask an enablejsapi embed to change speed. Does not wrap or destroy the iframe. */
export const postPlaybackRate = (iframe: HTMLIFrameElement, rate: number) => {
  try {
    iframe.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: "setPlaybackRate", args: [rate] }),
      "*",
    );
  } catch {
    /* cross-origin until the embed is ready */
  }
};

export const formatStart = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
};
