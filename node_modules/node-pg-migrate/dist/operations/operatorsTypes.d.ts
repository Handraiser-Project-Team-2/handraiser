import { Name, Type, DropOptions } from './generalTypes';
import { FunctionParam } from './functionsTypes';
export interface CreateOperatorOptions {
    procedure: Name;
    left?: Name;
    right?: Name;
    commutator?: Name;
    negator?: Name;
    restrict?: Name;
    join?: Name;
    hashes?: boolean;
    merges?: boolean;
}
export interface DropOperatorOptions extends DropOptions {
    left?: Name;
    right?: Name;
}
export interface CreateOperatorClassOptions {
    default?: boolean;
    family?: string;
}
export interface OperatorListDefinition {
    type: 'function' | 'operator';
    number: number;
    name: Name;
    params?: FunctionParam[];
}
declare type CreateOperatorFn = (operatorName: Name, options: CreateOperatorOptions & DropOperatorOptions) => string | string[];
export declare type CreateOperator = CreateOperatorFn & {
    reverse: CreateOperatorFn;
};
export declare type DropOperator = (operatorName: Name, dropOptions?: DropOperatorOptions) => string | string[];
declare type CreateOperatorClassFn = (operatorClassName: Name, type: Type, indexMethod: Name, operatorList: OperatorListDefinition[], options: CreateOperatorClassOptions & DropOptions) => string | string[];
export declare type CreateOperatorClass = CreateOperatorClassFn & {
    reverse: CreateOperatorClassFn;
};
export declare type DropOperatorClass = (operatorClassName: Name, indexMethod: Name, dropOptions?: DropOptions) => string | string[];
declare type RenameOperatorClassFn = (oldOperatorClassName: Name, indexMethod: Name, newOperatorClassName: Name) => string | string[];
export declare type RenameOperatorClass = RenameOperatorClassFn & {
    reverse: RenameOperatorClassFn;
};
declare type CreateOperatorFamilyFn = (operatorFamilyName: Name, indexMethod: Name, options?: DropOptions) => string | string[];
export declare type CreateOperatorFamily = CreateOperatorFamilyFn & {
    reverse: CreateOperatorFamilyFn;
};
export declare type DropOperatorFamily = (operatorFamilyName: Name, newSchemaName: Name, dropOptions?: DropOptions) => string | string[];
declare type RenameOperatorFamilyFn = (oldOperatorFamilyName: Name, indexMethod: Name, newOperatorFamilyName: Name) => string | string[];
export declare type RenameOperatorFamily = RenameOperatorFamilyFn & {
    reverse: RenameOperatorFamilyFn;
};
declare type AddToOperatorFamilyFn = (operatorFamilyName: Name, indexMethod: Name, operatorList: OperatorListDefinition[]) => string | string[];
export declare type AddToOperatorFamily = AddToOperatorFamilyFn & {
    reverse: AddToOperatorFamilyFn;
};
export declare type RemoveFromOperatorFamily = (operatorFamilyName: Name, indexMethod: Name, operatorList: OperatorListDefinition[]) => string | string[];
export {};
