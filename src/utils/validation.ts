import { type Value } from '@libsql/client';

export const isApodoRepeated = (rowCount: Value): boolean => {
  const count = rowCount as number || 0;
  return count > 0;
};