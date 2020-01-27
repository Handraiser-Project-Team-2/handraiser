import { MigrationOptions } from '../types';
import { CreatePolicy, DropPolicy, AlterPolicy, RenamePolicy } from './policiesTypes';
export { CreatePolicy, DropPolicy, AlterPolicy, RenamePolicy };
export declare function dropPolicy(mOptions: MigrationOptions): DropPolicy;
export declare function createPolicy(mOptions: MigrationOptions): CreatePolicy;
export declare function alterPolicy(mOptions: MigrationOptions): AlterPolicy;
export declare function renamePolicy(mOptions: MigrationOptions): RenamePolicy;
