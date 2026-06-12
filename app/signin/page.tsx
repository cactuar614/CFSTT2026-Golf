import { signIn } from '@/lib/auth';
import { TRIP_NAME, TRIP_DATES, TRIP_LOCATION } from '@/lib/constants';

export default function SignInPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const denied = Boolean(searchParams?.error);

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-b from-primary-dark to-primary px-6 py-10 text-center shadow-card">
        <div className="pointer-events-none absolute inset-2 rounded-xl border border-accent/40" aria-hidden />
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-light">
          Members only · {TRIP_LOCATION}
        </p>
        <h1 className="mx-auto mt-2 font-display text-2xl font-bold tracking-tight text-cream">
          {TRIP_NAME}
        </h1>
        <p className="mt-2 text-sm text-cream/80">{TRIP_DATES}</p>

        <form
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: '/' });
          }}
          className="relative mt-8"
        >
          <button
            type="submit"
            className="w-full rounded-xl bg-accent px-4 py-3 font-semibold text-char-900 transition-colors active:bg-accent-light md:hover:bg-accent-light"
          >
            Continue with Google
          </button>
        </form>

        {denied ? (
          <p className="mt-4 text-sm text-red-200">
            That Google account isn&apos;t on the trip roster. Ask Matt to add you.
          </p>
        ) : null}
      </div>
    </div>
  );
}
