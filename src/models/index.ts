export interface IdParam {
  id: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  pageCount: number;
}

export interface PageQueryParams {
  page: number;
  size: number;
}
