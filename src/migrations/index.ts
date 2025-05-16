import * as migration_20250516_130354 from './20250516_130354';
import * as migration_20250516_134203 from './20250516_134203';

export const migrations = [
  {
    up: migration_20250516_130354.up,
    down: migration_20250516_130354.down,
    name: '20250516_130354',
  },
  {
    up: migration_20250516_134203.up,
    down: migration_20250516_134203.down,
    name: '20250516_134203'
  },
];
