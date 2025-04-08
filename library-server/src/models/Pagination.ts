export interface IPagination<T>{
    totalCount: number,
    currentPage: number,
    totalPage: number,
    limit: number,
    pageCount: number,
    items: T[]
}