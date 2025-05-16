import * as migration_20250516_070125 from './20250516_070125';

export const migrations = [
  {
    up: migration_20250516_070125.up,
    down: migration_20250516_070125.down,
    name: '20250516_070125'
  },
];
