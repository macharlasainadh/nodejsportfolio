"use client";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { annotate } from "rough-notation";

export function Highlighter({
  children,
  action = "highlight",
  color = "#007BFF",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
}) {
  const elementRef = useRef(null);
  const annotationRef = useRef(null);

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  });

  // If isView is false, always show. If isView is true, wait for inView
  const shouldShow = !isView || isInView;

    useEffect(() => {
    if (!shouldShow) return;

    const element = elementRef.current;
    if (!element) return;

    const annotationConfig = {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    };

    const annotation = annotate(element, annotationConfig);
    annotationRef.current = annotation;
    annotation.show();

    // Track the last position relative to the document
    let lastTop = 0;
    let lastLeft = 0;
    let lastWidth = 0;
    let lastHeight = 0;

    const updatePosition = () => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      const absoluteLeft = rect.left + window.scrollX;

      // Only hide/show if layout coordinates or size have actually changed
      if (
        absoluteTop !== lastTop ||
        absoluteLeft !== lastLeft ||
        rect.width !== lastWidth ||
        rect.height !== lastHeight
      ) {
        lastTop = absoluteTop;
        lastLeft = absoluteLeft;
        lastWidth = rect.width;
        lastHeight = rect.height;
        annotation.hide();
        annotation.show();
      }
    };

    updatePosition();

    const resizeObserver = new ResizeObserver(() => {
      updatePosition();
    });

    resizeObserver.observe(element);
    resizeObserver.observe(document.body);

    // Fast polling on mount/animation entry (first 2 seconds)
    const fastIntervalId = setInterval(updatePosition, 100);

    // Slow polling for dynamic updates/collapses/expands later
    let slowIntervalId;
    const timeoutId = setTimeout(() => {
      clearInterval(fastIntervalId);
      slowIntervalId = setInterval(updatePosition, 500);
    }, 2000);

    // Recalculate position when fonts are loaded
    if (document.fonts) {
      document.fonts.ready.then(updatePosition);
    }

    return () => {
      clearInterval(fastIntervalId);
      clearInterval(slowIntervalId);
      clearTimeout(timeoutId);
      if (element) {
        annotation.remove();
        annotate(element, { type: action }).remove();
        resizeObserver.disconnect();
      }
    };
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ]);
  
  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  );
}
