import { useEffect, useState } from "react";

export default function AnimatedLogo() {
  const text = "<devHive/>";
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < text.length) {
            setDisplayText(text.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 1000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(text.slice(0, displayText.length - 1));
          } else {
            setIsDeleting(false);
          }
        }
      },
      isDeleting ? 80 : 150
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting]);

  return (
    <div className="flex items-center font-mono text-3xl font-bold">
      <span className="text-violet-500">{displayText}</span>

      <span className="ml-1 animate-pulse text-violet-500">
        |
      </span>
    </div>
  );
}