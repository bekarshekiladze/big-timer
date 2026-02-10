import { useEffect, useState } from "react";

type PointerType = "mouse" | "pen" | "touch";

export default function usePointerIdentifier(
  allowed: PointerType[] = ["mouse"],
) {
  const [mouseCapable, setMouseCapable] = useState(false);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (allowed.includes(e.pointerType as PointerType)) {
        setMouseCapable(true);
      }
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [allowed]);

  return mouseCapable;
}
