import { Name, Value, DropOptions } from './generalTypes';
export interface FunctionParamType {
    mode?: 'IN' | 'OUT' | 'INOUT' | 'VARIADIC';
    name?: string;
    type: string;
    default?: Value;
}
export declare type FunctionParam = string | FunctionParamType;
export interface FunctionOptions {
    returns?: string;
    language: string;
    replace?: boolean;
    window?: boolean;
    behavior?: 'IMMUTABLE' | 'STABLE' | 'VOLATILE';
    onNull?: boolean;
    parallel?: 'UNSAFE' | 'RESTRICTED' | 'SAFE';
}
declare type CreateFunctionFn = (functionName: Name, functionParams: FunctionParam[], functionOptions: FunctionOptions & DropOptions, definition: Value) => string | string[];
export declare type CreateFunction = CreateFunctionFn & {
    reverse: CreateFunctionFn;
};
export declare type DropFunction = (functionName: Name, functionParams: FunctionParam[], dropOptions?: DropOptions) => string | string[];
declare type RenameFunctionFn = (oldFunctionName: Name, functionParams: FunctionParam[], newFunctionName: Name) => string | string[];
export declare type RenameFunction = RenameFunctionFn & {
    reverse: RenameFunctionFn;
};
export {};
