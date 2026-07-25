import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

/**
 * Auth is OFF until AUTH_SECRET, AUTH_GOOGLE_ID, and AUTH_GOOGLE_SECRET are
 * set (in Vercel project env vars for production). With them unset the site
 * is public, exactly as before.
 */
export const authEnabled = Boolean(
  process.env.AUTH_SECRET && process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
);

/**
 * The only Google accounts allowed in — the 8 golfers.
 * Server-side only; never shipped to the client bundle.
 */
const ALLOWED_EMAILS = [
  'huber.matt@gmail.com', // Matt Huber
  'matt@pinhighadvisory.com', // Matt Huber (work)
  'adamwake99@yahoo.com', // Adam Wakeland
  'jason.karns@gmail.com', // Jason Karns
  'kennedy.396@gmail.com', // Mike (Michael) Kennedy
  'sweeney.matt34@gmail.com', // Matt Sweeney
  'mlarsen07@gmail.com', // Hippy Mike (Mike Larsen)
  'arogers2112@yahoo.com', // Alex Rogers
  'kevinocallahanwfu@gmail.com', // Kevin OCallahan
].map((e) => e.toLowerCase());

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Placeholder keeps module load safe while auth is disabled.
  secret: process.env.AUTH_SECRET ?? 'auth-disabled-placeholder',
  providers: [Google],
  pages: { signIn: '/signin' },
  callbacks: {
    signIn({ user }) {
      return Boolean(user.email && ALLOWED_EMAILS.includes(user.email.toLowerCase()));
    },
    authorized({ auth }) {
      return Boolean(auth?.user);
    },
  },
});
