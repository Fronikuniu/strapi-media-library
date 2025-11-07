import React, { useEffect, useRef } from "react";

export const MediaListener = () => {
  const clickCountRef = useRef(0);
  const isRefreshingRef = useRef(false);

  useEffect(() => {
    const handlePlusButtonClick = (e: Event) => {
      const target = e.target as HTMLElement;

      const button = target.closest("button");
      if (!button) return;

      const hasAddText = button
        .querySelector("span")
        ?.textContent?.includes("Add");

      if (hasAddText && !isRefreshingRef.current) {
        clickCountRef.current++;

        if (clickCountRef.current > 1) {
          setTimeout(() => {
            refreshModal(button);
          }, 0);
        }
      }
    };

    document.addEventListener("click", handlePlusButtonClick, true);

    return () => {
      document.removeEventListener("click", handlePlusButtonClick, true);
    };
  }, []);

  const refreshModal = (plusButton: HTMLButtonElement) => {
    isRefreshingRef.current = true;

    const closeButton = Array.from(document.querySelectorAll("button")).find(
      (btn) => {
        const span = btn.querySelector("span");
        return span?.textContent === "Close the modal";
      }
    ) as HTMLElement;

    if (closeButton) {
      closeButton.click();

      setTimeout(() => {
        if (plusButton) plusButton.click();

        setTimeout(() => {
          isRefreshingRef.current = false;
        }, 0);
      }, 0);
    } else {
      isRefreshingRef.current = false;
    }
  };

  return null;
};
