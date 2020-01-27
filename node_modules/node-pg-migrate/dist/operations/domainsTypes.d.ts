import { Value, Name, Type, DropOptions } from './generalTypes';
export interface DomainOptions {
    default?: Value;
    notNull?: boolean;
    check?: string;
    constraintName?: string;
}
export interface DomainOptionsCreate extends DomainOptions {
    collation?: string;
}
export interface DomainOptionsAlter extends DomainOptions {
    allowNull?: boolean;
}
declare type CreateDomainFn = (domainName: Name, type: Type, domainOptions?: DomainOptionsCreate & DropOptions) => string | string[];
export declare type CreateDomain = CreateDomainFn & {
    reverse: CreateDomainFn;
};
export declare type DropDomain = (domainName: Name, dropOptions?: DropOptions) => string | string[];
export declare type AlterDomain = (domainName: Name, domainOptions: DomainOptionsAlter) => string | string[];
declare type RenameDomainFn = (oldDomainName: Name, newDomainName: Name) => string | string[];
export declare type RenameDomain = RenameDomainFn & {
    reverse: RenameDomainFn;
};
export {};
