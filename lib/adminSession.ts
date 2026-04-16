const SESSION_KEY = 'cfstt-admin-session';

// Require a non-trivial access code so a single-character (or accidentally
// blank) env value cannot be brute-forced or matched against a typo.
const MIN_ADMIN_CODE_LENGTH = 4;

export function readAdminSession(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(SESSION_KEY) === '1';
}

export function writeAdminSession(): void {
  sessionStorage.setItem(SESSION_KEY, '1');
}

export function clearAdminSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

/** Placeholder until real roles: must match `NEXT_PUBLIC_ADMIN_ACCESS_CODE` (Vercel / .env.local). */
export function getExpectedAdminCode(): string {
  return (process.env.NEXT_PUBLIC_ADMIN_ACCESS_CODE ?? '').trim();
}

export function adminAccessConfigured(): boolean {
  return getExpectedAdminCode().length >= MIN_ADMIN_CODE_LENGTH;
}
