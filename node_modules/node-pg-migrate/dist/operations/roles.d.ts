import { MigrationOptions } from '../types';
import { CreateRole, DropRole, AlterRole, RenameRole } from './rolesTypes';
export { CreateRole, DropRole, AlterRole, RenameRole };
export declare function dropRole(mOptions: MigrationOptions): DropRole;
export declare function createRole(mOptions: MigrationOptions): CreateRole;
export declare function alterRole(mOptions: MigrationOptions): AlterRole;
export declare function renameRole(mOptions: MigrationOptions): RenameRole;
