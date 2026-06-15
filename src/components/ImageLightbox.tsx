import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageLightboxProps {
  src: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
  caption?: React.ReactNode;
}

/**
 * Wraps any element to make it a clickable trigger that opens
 * a full-screen lightbox preview of the supplied image.
 */
export function ImageLightbox({ src, alt, children, className, caption }: ImageLightboxProps) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label={`View larger image: ${alt}`}
          className={cn(
            "group relative block w-full cursor-zoom-in rounded-3xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            className,
          )}
        >
          {children}
          <span
            aria-hidden
            className="pointer-events-none absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-background/70 text-foreground opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <ZoomIn className="h-4 w-4" />
          </span>
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-background/85 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-[101] flex flex-col items-center justify-center p-4 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:p-8"
        >
          <DialogPrimitive.Title className="sr-only">{alt}</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Full-screen preview. Press Escape to close.
          </DialogPrimitive.Description>
          <img
            src={src}
            alt={alt}
            className="max-h-[88vh] max-w-[95vw] rounded-2xl object-contain shadow-2xl ring-1 ring-[color:var(--gold)]/20"
          />
          {caption ? (
            <div className="mt-4 max-w-xl text-center text-sm text-muted-foreground">{caption}</div>
          ) : null}
          <DialogPrimitive.Close
            aria-label="Close preview"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-background/80 text-foreground shadow-lg ring-1 ring-border backdrop-blur transition-colors hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)]"
          >
            <X className="h-5 w-5" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
