import NextAuth from 'next-auth';
import type { Provider } from 'next-auth/providers';
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
 * Yahoo sign-in (for the golfers on Yahoo addresses). Enabled once
 * AUTH_YAHOO_ID + AUTH_YAHOO_SECRET are set. Yahoo has no built-in Auth.js
 * provider, so it's configured here as a custom OpenID Connect provider
 * (Yahoo exposes OIDC discovery at api.login.yahoo.com).
 */
export const yahooEnabled = Boolean(
  process.env.AUTH_YAHOO_ID && process.env.AUTH_YAHOO_SECRET
);

const providers: Provider[] = [Google];

if (yahooEnabled) {
  providers.push({
    id: 'yahoo',
    name: 'Yahoo',
    type: 'oidc',
    issuer: 'https://api.login.yahoo.com',
    clientId: process.env.AUTH_YAHOO_ID,
    clientSecret: process.env.AUTH_YAHOO_SECRET,
    authorization: { params: { scope: 'openid email profile' } },
    profile(profile) {
      return {
        id: profile.sub as string,
        name: (profile.name ?? profile.email) as string,
        email: profile.email as string,
        image: (profile.picture as string) ?? null,
      };
    },
  });
}

/**
 * The 8 golfers' Google accounts, mapped to their `DEFAULT_PLAYERS` id.
 * Server-side only — never shipped to the client bundle. Only the matched
 * `playerId` is exposed to the client (via the session), not the emails.
 */
const EMAIL_TO_PLAYER: Record<string, string> = {
  'huber.matt@gmail.com': 'player-1', // Matt Huber
  'matt@pinhighadvisory.com': 'player-1', // Matt Huber (work)
  'adamwake99@yahoo.com': 'player-2', // Adam Wakeland
  'jason.karns@gmail.com': 'player-3', // Jason Karns
  'kennedy.396@gmail.com': 'player-4', // Mike Kennedy
  'sweeney.matt34@gmail.com': 'player-5', // Matt Sweeney
  'mwlarsen87@gmail.com': 'player-6', // Hippy Mike (Mike Larsen)
  'arogers2112@yahoo.com': 'player-7', // Alex Rogers
  'kevinocallahanwfu@gmail.com': 'player-8', // Kevin OCallahan
};

const ALLOWED_EMAILS = Object.keys(EMAIL_TO_PLAYER);

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Placeholder keeps module load safe while auth is disabled.
  secret: process.env.AUTH_SECRET ?? 'auth-disabled-placeholder',
  providers,
  pages: { signIn: '/signin' },
  callbacks: {
    signIn({ user }) {
      return Boolean(user.email && ALLOWED_EMAILS.includes(user.email.toLowerCase()));
    },
    jwt({ token, user }) {
      // On sign-in, stamp the golfer's player id onto the token.
      if (user?.email) token.playerId = EMAIL_TO_PLAYER[user.email.toLowerCase()];
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        // Prefer the id stamped at sign-in; fall back to the token email so
        // already-signed-in golfers resolve without needing to re-login.
        const fromEmail = token.email ? EMAIL_TO_PLAYER[token.email.toLowerCase()] : undefined;
        session.user.playerId = (token.playerId as string | undefined) ?? fromEmail;
      }
      return session;
    },
    authorized({ auth }) {
      return Boolean(auth?.user);
    },
  },
});
