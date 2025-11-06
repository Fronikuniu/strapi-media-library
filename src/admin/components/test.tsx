import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import React, { useState, useEffect } from "react";

export const MediaListener = () => {
  const data = useCMEditViewDataManager();
  const { initialData, modifiedData, slug } = data;

  const equal = !deepEqual(initialData, modifiedData);

  useEffect(() => {
    const checkForButton = () => {
      const elements = document.querySelectorAll("*");

      for (const el of elements) {
        if (el.textContent && el.textContent.includes("Add new assets")) {
          console.log('🎯 Found "Add new assets" button');

          onMediaButtonFound(el);

          return;
        }
      }
    };

    checkForButton();

    // const observer = new MutationObserver(() => {
    //   checkForButton();
    // });

    // observer.observe(document.body, {
    //   childList: true,
    //   subtree: true,
    //   characterData: true,
    // });

    // return () => observer.disconnect();
  }, []);

  const onMediaButtonFound = (element: Element) => {
    console.log("✅ Media button is now visible!");

    // Add your logic here:
    // - Click the button
    // - Monitor clicks
    // - Log events
    // etc.
  };

  return <div>chuj: {equal}</div>;
};

function deepEqual(a: any, b: any) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a == null || b == null) return false;
  if (typeof a === "object") {
    if (Array.isArray(a)) {
      if (!Array.isArray(b) || a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!deepEqual(a[i], b[i])) return false;
      }
      return true;
    } else {
      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);
      if (aKeys.length !== bKeys.length) return false;
      for (const key of aKeys) {
        if (!b.hasOwnProperty(key) || !deepEqual(a[key], b[key])) return false;
      }
      return true;
    }
  }
  return a === b;
}
