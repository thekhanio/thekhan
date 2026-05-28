// Reusable click-to-expand accordion. Extracted from the WebsitesPage FAQ
// pattern (useState + Framer Motion height animation + chevron). Used by the
// FAQ sections on /websites, /marketing, /why-intent and dense sections on /about.
//
// Single-open by default (opening one closes the rest). Pass allowMultiple to
// let several stay open. Title + content are arbitrary nodes so it works for
// plain Q&A text and richer blocks alike.

import { useState, type ReactNode } from "react";
import { m, AnimatePresence } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  title: ReactNode;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: number[];
  className?: string;
  itemClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
};

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className,
  itemClassName,
  titleClassName,
  contentClassName,
}: AccordionProps) {
  const [open, setOpen] = useState<number[]>(defaultOpen);

  const toggle = (i: number) =>
    setOpen((prev) => {
      const isOpen = prev.includes(i);
      if (allowMultiple) return isOpen ? prev.filter((n) => n !== i) : [...prev, i];
      return isOpen ? [] : [i];
    });

  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        return (
          <div key={i} className={cn("border-b border-line", itemClassName)}>
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="w-full py-6 flex items-center justify-between gap-4 text-left cursor-pointer hover:text-accent-light transition-colors"
            >
              <span className={cn("text-ink font-medium text-lg md:text-xl", titleClassName)}>
                {item.title}
              </span>
              <IconChevronDown
                className={cn(
                  "w-5 h-5 text-accent flex-shrink-0 transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className={cn("pb-6 text-ink-muted leading-relaxed text-base md:text-lg", contentClassName)}>
                    {item.content}
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
