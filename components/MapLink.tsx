import { MapPinIcon } from './icons';

type MapLinkProps = {
  href: string;
  label?: string;
  className?: string;
};

export default function MapLink({ href, label = 'Map', className = '' }: MapLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-[32px] items-center gap-1.5 rounded-md text-sm font-semibold text-copper underline-offset-2 hover:underline dark:text-accent ${className}`}
    >
      <MapPinIcon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </a>
  );
}
