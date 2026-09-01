import { Fragment } from "react";

/** Renders [[Key]] as a keyboard stamp and {{.ext}} as a file stamp, inline. */
export default function Marked({ text }: { text: string }) {
  const parts = text.split(/(\[\[[^\]]+\]\]|\{\{[^}]+\}\})/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("[[") && part.endsWith("]]")) {
          return (
            <kbd key={i} className="key">
              {part.slice(2, -2)}
            </kbd>
          );
        }
        if (part.startsWith("{{") && part.endsWith("}}")) {
          return (
            <span key={i} className="stamp border-line2 bg-well text-teal2">
              {part.slice(2, -2)}
            </span>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
