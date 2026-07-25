import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      /** Matched golfer id from `DEFAULT_PLAYERS`, set in the auth session callback. */
      playerId?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    playerId?: string;
  }
}
