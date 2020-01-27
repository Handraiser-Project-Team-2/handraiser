import { Name, Type, DropOptions, IfNotExistsOption } from './generalTypes';
export interface SequenceOptions {
    type?: Type;
    increment?: number;
    minvalue?: number | null | false;
    maxvalue?: number | null | false;
    start?: number;
    cache?: number;
    cycle?: boolean;
    owner?: string | null | false;
}
export interface SequenceOptionsCreate extends SequenceOptions, IfNotExistsOption {
    temporary?: boolean;
}
export interface SequenceOptionsAlter extends SequenceOptions {
    restart?: number | true;
}
declare type CreateSequenceFn = (sequenceName: Name, sequenceOptions?: SequenceOptionsCreate & DropOptions) => string | string[];
export declare type CreateSequence = CreateSequenceFn & {
    reverse: CreateSequenceFn;
};
export declare type DropSequence = (sequenceName: Name, dropOptions?: DropOptions) => string | string[];
export declare type AlterSequence = (sequenceName: Name, sequenceOptions: SequenceOptionsAlter) => string | string[];
declare type RenameSequenceFn = (oldSequenceName: Name, newSequenceName: Name) => string | string[];
export declare type RenameSequence = RenameSequenceFn & {
    reverse: RenameSequenceFn;
};
export {};
