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
      className={`inline-flex min-h-[32px] items-center gap-1 rounded-md text-sm font-medium text-primary underline-offset-2 hover:underline ${className}`}
    >
      <span aria-hidden>📍</span>
      <span>{label}</span>
    </a>
  );
}
