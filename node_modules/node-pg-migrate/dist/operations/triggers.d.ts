import { MigrationOptions } from '../types';
import { CreateTrigger, DropTrigger, RenameTrigger } from './triggersTypes';
export { CreateTrigger, DropTrigger, RenameTrigger };
export declare function dropTrigger(mOptions: MigrationOptions): DropTrigger;
export declare function createTrigger(mOptions: MigrationOptions): CreateTrigger;
export declare function renameTrigger(mOptions: MigrationOptions): RenameTrigger;
