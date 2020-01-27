import { MigrationOptions } from '../types';
import { CreateDomain, DropDomain, AlterDomain, RenameDomain } from './domainsTypes';
export { CreateDomain, DropDomain, AlterDomain, RenameDomain };
export declare function dropDomain(mOptions: MigrationOptions): DropDomain;
export declare function createDomain(mOptions: MigrationOptions): CreateDomain;
export declare function alterDomain(mOptions: MigrationOptions): AlterDomain;
export declare function renameDomain(mOptions: MigrationOptions): RenameDomain;
