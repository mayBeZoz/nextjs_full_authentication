import { useEffect, useRef } from "react";

type TUseClickOutsideParams = {
  handler: () => void;
  listenCapturing?: boolean;
};

export function useClickOutside<T extends Node>({
  handler,
  listenCapturing = true,
}: TUseClickOutsideParams) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);
    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]);

  return ref;
}
