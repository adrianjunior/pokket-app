import { Diagnostic } from './diagnostic.interface'

export interface Balance {
    id: number;
    name: string;
    date: string;
    diagnostics: Diagnostic[];
}