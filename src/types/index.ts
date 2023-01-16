export interface IAuthor {
  id?: string;
  name: string;
}
export interface IBook {
  id?: string;
  title: string;
  isbn: string;
  pageCount: number;
  published: string;
  authors?: string[];
}
