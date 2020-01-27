import { MigrationOptions } from '../types';
import { DropIndex, CreateIndex } from './indexesTypes';
export { CreateIndex, DropIndex };
export declare function dropIndex(mOptions: MigrationOptions): DropIndex;
export declare function createIndex(mOptions: MigrationOptions): CreateIndex;
