import * as migration_20250516_125003 from './20250516_125003';

export const migrations = [
  {
    up: migration_20250516_125003.up,
    down: migration_20250516_125003.down,
    name: '20250516_125003'
  },
];
