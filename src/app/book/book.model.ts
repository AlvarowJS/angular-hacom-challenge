import { Autor } from '../autor/autor.model';

export interface Book {
  id: number;
  title: string;
  description: string;
  year: string;
  publisher: boolean;
  date: string;
  author_id: number;
  created_at?: string;
  updated_at?: string;
  author?: Autor;
}


