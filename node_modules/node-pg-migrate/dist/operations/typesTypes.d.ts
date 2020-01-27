import { Name, Value, Type, DropOptions, IfExistsOption, IfNotExistsOption } from './generalTypes';
export interface AddTypeValueOptions extends IfNotExistsOption {
    before?: string;
    after?: string;
}
declare type CreateTypeFn = (typeName: Name, values: (Value[] | {
    [name: string]: Type;
}) & DropOptions) => string | string[];
export declare type CreateType = CreateTypeFn & {
    reverse: CreateTypeFn;
};
export declare type DropType = (typeName: Name, dropOptions?: DropOptions) => string | string[];
declare type RenameTypeFn = (typeName: Name, newTypeName: Name) => string | string[];
export declare type RenameType = RenameTypeFn & {
    reverse: RenameTypeFn;
};
declare type AddTypeAttributeFn = (typeName: Name, attributeName: string, attributeType: Type & IfExistsOption) => string | string[];
export declare type AddTypeAttribute = AddTypeAttributeFn & {
    reverse: AddTypeAttributeFn;
};
export declare type DropTypeAttribute = (typeName: Name, attributeName: string, options: IfExistsOption) => string | string[];
export declare type SetTypeAttribute = (typeName: Name, attributeName: string, attributeType: Type) => string | string[];
export declare type AddTypeValue = (typeName: Name, value: Value, options?: AddTypeValueOptions) => string | string[];
declare type RenameTypeAttributeFn = (typeName: Name, attributeName: string, newAttributeName: string) => string | string[];
export declare type RenameTypeAttribute = RenameTypeAttributeFn & {
    reverse: RenameTypeAttributeFn;
};
declare type RenameTypeValueFn = (typeName: Name, value: string, newValue: string) => string | string[];
export declare type RenameTypeValue = RenameTypeValueFn & {
    reverse: RenameTypeValueFn;
};
export {};
