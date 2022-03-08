export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalIPages: number;
}

export class PaginationResult<T> {
    result: T;
    pagination: Pagination;
}
