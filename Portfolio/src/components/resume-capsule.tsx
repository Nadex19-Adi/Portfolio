import { ArrowDownRight } from "lucide-react";

import { PROFILE } from "@/data/profile";

/**
 * Round button that unrolls into a labelled pill on hover or keyboard focus.
 */
export function ResumeCapsule({ label = "View Resume" }: { label?: string }) {
  return (
    <a
      href={PROFILE.resumeUrl}
      download="Aditya_Patil_Resume.pdf"
      aria-label={label}
      className="group inline-flex shrink-0 items-center focus-visible:outline-none"
    >
      <span className="relative flex h-12 w-12 items-center overflow-hidden rounded-full bg-white shadow-xl transition-[width] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-48 group-focus-visible:w-48">
        <span className="pointer-events-none whitespace-nowrap pl-6 pr-12 text-[10px] font-black uppercase tracking-[0.2em] text-black opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          {label}
        </span>
        <span className="absolute right-0 flex size-12 items-center justify-center text-black transition-transform duration-500 group-hover:rotate-45 group-focus-visible:rotate-45">
          <ArrowDownRight className="h-5 w-5" />
        </span>
      </span>
    </a>
  );
}
