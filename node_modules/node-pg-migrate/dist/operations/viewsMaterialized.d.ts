import { MigrationOptions } from '../types';
import { CreateMaterializedView, DropMaterializedView, AlterMaterializedView, RenameMaterializedView, RenameMaterializedViewColumn, RefreshMaterializedView } from './viewsMaterializedTypes';
export { CreateMaterializedView, DropMaterializedView, AlterMaterializedView, RenameMaterializedView, RenameMaterializedViewColumn, RefreshMaterializedView, };
export declare function dropMaterializedView(mOptions: MigrationOptions): DropMaterializedView;
export declare function createMaterializedView(mOptions: MigrationOptions): CreateMaterializedView;
export declare function alterMaterializedView(mOptions: MigrationOptions): AlterMaterializedView;
export declare function renameMaterializedView(mOptions: MigrationOptions): RenameMaterializedView;
export declare function renameMaterializedViewColumn(mOptions: MigrationOptions): RenameMaterializedViewColumn;
export declare function refreshMaterializedView(mOptions: MigrationOptions): RefreshMaterializedView;
