import { Book } from "./Book";

export type LoanRecord = {
    _id: string;
    status: "LOANED" | "AVAILABLE";
    loanedDate: Date;
    dueDate: Date;
    returnDate?: Date;
    patron: string;
    employeeOut: string;
    employeeIn?: string;
    item: Book;
    createdAt: Date;
    updatedAt: Date;
}