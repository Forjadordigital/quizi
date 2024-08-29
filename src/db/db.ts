import { createClient } from '@libsql/client';

export const getClient = () => {
  return createClient({
    url: import.meta.env.PUBLIC_DATABASE_URL ?? '',
    authToken: import.meta.env.DATABASE_AUTH_TOKEN ?? ''
  });
};