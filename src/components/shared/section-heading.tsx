// src/components/shared/section-heading.tsx
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  label,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-8 sm:mb-10',
        align === 'center' && 'text-center flex flex-col items-center'
      )}
    >
      {label && (
        <span className="text-[11px] tracking-[0.2em] text-accent uppercase font-heading font-semibold mb-2 block">
          {label}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold uppercase text-white tracking-wide">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
