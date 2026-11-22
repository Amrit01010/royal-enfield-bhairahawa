// src/components/shared/section-heading.tsx
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  variant?: 'accent' | 'clean' | 'line';
}

export function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  variant = 'clean',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-8 lg:mb-12',
        align === 'center' && 'text-center flex flex-col items-center'
      )}
    >
      {label && variant === 'accent' && (
        <div className="inline-flex items-center gap-2 mb-2.5">
          <span className="w-1.5 h-3 bg-accent rounded-[0.5px]" />
          <span className="text-[11px] tracking-[0.2em] text-accent uppercase font-heading font-bold">
            {label}
          </span>
        </div>
      )}
      {label && variant === 'clean' && (
        <span className="text-[11px] tracking-[0.2em] text-zinc-400 uppercase font-heading font-semibold mb-2 block">
          {label}
        </span>
      )}
      {label && variant === 'line' && (
        <div className="flex items-center gap-3 mb-2.5">
          <span className="w-6 h-px bg-accent" />
          <span className="text-[11px] tracking-[0.2em] text-zinc-300 uppercase font-heading font-semibold">
            {label}
          </span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black uppercase text-white tracking-tight leading-[1.08]">
        {title}
      </h2>
      {description && (
        <p className="mt-2.5 text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed font-sans">
          {description}
        </p>
      )}
    </div>
  );
}
