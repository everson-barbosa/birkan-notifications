export interface PaginationParams<T> {
  page: number;
  perPage: number;
  offset?: number;
  order?: 'asc' | 'desc';
  orderBy?: keyof T;
}
