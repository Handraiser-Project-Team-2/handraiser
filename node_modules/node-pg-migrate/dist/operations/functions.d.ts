import { MigrationOptions } from '../types';
import { CreateFunction, DropFunction, RenameFunction } from './functionsTypes';
export { CreateFunction, DropFunction, RenameFunction };
export declare function dropFunction(mOptions: MigrationOptions): DropFunction;
export declare function createFunction(mOptions: MigrationOptions): CreateFunction;
export declare function renameFunction(mOptions: MigrationOptions): RenameFunction;
