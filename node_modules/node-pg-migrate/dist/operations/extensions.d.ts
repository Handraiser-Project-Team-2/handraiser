import { MigrationOptions } from '../types';
import { CreateExtension, DropExtension } from './extensionsTypes';
export { CreateExtension, DropExtension };
export declare function dropExtension(mOptions: MigrationOptions): DropExtension;
export declare function createExtension(mOptions: MigrationOptions): CreateExtension;
