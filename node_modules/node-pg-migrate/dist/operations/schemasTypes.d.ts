import { DropOptions, IfNotExistsOption } from './generalTypes';
export interface CreateSchemaOptions extends IfNotExistsOption {
    authorization?: string;
}
declare type CreateSchemaFn = (schemaName: string, schemaOptions?: CreateSchemaOptions & DropOptions) => string | string[];
export declare type CreateSchema = CreateSchemaFn & {
    reverse: CreateSchemaFn;
};
export declare type DropSchema = (schemaName: string, dropOptions?: DropOptions) => string | string[];
declare type RenameSchemaFn = (oldSchemaName: string, newSchemaName: string) => string | string[];
export declare type RenameSchema = RenameSchemaFn & {
    reverse: RenameSchemaFn;
};
export {};
