import { Name, IfExistsOption } from './generalTypes';
export interface PolicyOptions {
    role?: string | string[];
    using?: string;
    check?: string;
}
interface CreatePolicyOptionsEn {
    command?: 'ALL' | 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';
}
export declare type CreatePolicyOptions = CreatePolicyOptionsEn & PolicyOptions;
declare type CreatePolicyFn = (tableName: Name, policyName: string, options?: CreatePolicyOptions & IfExistsOption) => string | string[];
export declare type CreatePolicy = CreatePolicyFn & {
    reverse: CreatePolicyFn;
};
export declare type DropPolicy = (tableName: Name, policyName: string, options?: IfExistsOption) => string | string[];
export declare type AlterPolicy = (tableName: Name, policyName: string, options: PolicyOptions) => string | string[];
declare type RenamePolicyFn = (tableName: Name, policyName: string, newPolicyName: string) => string | string[];
export declare type RenamePolicy = RenamePolicyFn & {
    reverse: RenamePolicyFn;
};
export {};
