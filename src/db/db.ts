import { createClient } from '@libsql/client';

export const getClient = () => {
  return createClient({
    url: import.meta.env.TURSO_DB_URL ?? '',
    authToken: import.meta.env.TURSO_DB_AUTH_TOKEN ?? ''
  });
};