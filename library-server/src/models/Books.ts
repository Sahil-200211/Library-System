import { ILoanRecord } from "./LoanRecord";

export interface IBook {
    barcode: string;
    cover: string;
    title: string;
    author: string | string[];
    description: string;
    subjects: string[];
    publicationDate: Date;
    publisher: string;
    pages: number;
    genre: string;
    records: ILoanRecord[];
}

