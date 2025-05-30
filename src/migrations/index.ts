import * as migration_20250516_130354 from './20250516_130354';
import * as migration_20250516_134203 from './20250516_134203';
import * as migration_20250526_121330 from './20250526_121330';
import * as migration_20250530_055327 from './20250530_055327';

export const migrations = [
  {
    up: migration_20250516_130354.up,
    down: migration_20250516_130354.down,
    name: '20250516_130354',
  },
  {
    up: migration_20250516_134203.up,
    down: migration_20250516_134203.down,
    name: '20250516_134203',
  },
  {
    up: migration_20250526_121330.up,
    down: migration_20250526_121330.down,
    name: '20250526_121330',
  },
  {
    up: migration_20250530_055327.up,
    down: migration_20250530_055327.down,
    name: '20250530_055327'
  },
];
