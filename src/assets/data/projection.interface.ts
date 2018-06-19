import {Diagnostic} from './diagnostic.interface'

export interface Projection {
    id: number;
    name: string;
    date: string;
    diagnostics: Diagnostic[];
}