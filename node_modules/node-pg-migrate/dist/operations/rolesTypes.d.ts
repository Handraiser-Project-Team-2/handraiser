import { Name, Value, IfExistsOption } from './generalTypes';
export interface RoleOptions {
    superuser?: boolean;
    createdb?: boolean;
    createrole?: boolean;
    inherit?: boolean;
    login?: boolean;
    replication?: boolean;
    bypassrls?: boolean;
    limit?: number;
    password?: Value;
    encrypted?: boolean;
    valid?: Value;
    inRole?: string | string[];
    role?: string | string[];
    admin?: string | string[];
}
declare type CreateRoleFn = (roleName: Name, roleOptions?: RoleOptions & IfExistsOption) => string | string[];
export declare type CreateRole = CreateRoleFn & {
    reverse: CreateRoleFn;
};
export declare type DropRole = (roleName: Name, options?: IfExistsOption) => string | string[];
export declare type AlterRole = (roleName: Name, roleOptions: RoleOptions) => string | string[];
declare type RenameRoleFn = (oldRoleName: Name, newRoleName: Name) => string | string[];
export declare type RenameRole = RenameRoleFn & {
    reverse: RenameRoleFn;
};
export {};
