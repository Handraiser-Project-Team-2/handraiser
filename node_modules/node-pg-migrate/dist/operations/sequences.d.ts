import { MigrationOptions } from '../types';
import { SequenceOptions, CreateSequence, DropSequence, AlterSequence, RenameSequence } from './sequencesTypes';
import { ColumnDefinitions } from './tablesTypes';
export { CreateSequence, DropSequence, AlterSequence, RenameSequence };
export declare const parseSequenceOptions: (typeShorthands: ColumnDefinitions | undefined, options: SequenceOptions) => string[];
export declare function dropSequence(mOptions: MigrationOptions): DropSequence;
export declare function createSequence(mOptions: MigrationOptions): CreateSequence;
export declare function alterSequence(mOptions: MigrationOptions): AlterSequence;
export declare function renameSequence(mOptions: MigrationOptions): RenameSequence;
