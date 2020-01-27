import { MigrationOptions } from '../types';
import { CreateSchema, DropSchema, RenameSchema } from './schemasTypes';
export { CreateSchema, DropSchema, RenameSchema };
export declare function dropSchema(mOptions: MigrationOptions): DropSchema;
export declare function createSchema(mOptions: MigrationOptions): CreateSchema;
export declare function renameSchema(mOptions: MigrationOptions): RenameSchema;
