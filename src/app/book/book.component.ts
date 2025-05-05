import { Component, OnInit } from '@angular/core';
import { Book } from './book.model';
import { BookService } from './book.service';
import { AutorService } from '../autor/autor.service';
import { Autor } from '../autor/autor.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: Book[] = [];
  autores: Autor[] = [];
  selectedBook: Book | null = null;
  showModal = false;
  searchTerm = '';
  currentPage = 1;
  lastPage = 1;

  constructor(private bookService: BookService, private autorService: AutorService) {}

  ngOnInit(): void {
    this.loadBooks();
    this.autorService.getAutores().subscribe(res => this.autores = res.data);
  }

  loadBooks(page = 1): void {
    this.bookService.getBooks(page, this.searchTerm).subscribe(res => {
      this.books = res.data;
      this.currentPage = res.current_page;
      this.lastPage = res.last_page;
    });
  }

  abrirModal(book?: Book): void {
    this.selectedBook = book ? { ...book } : {
      id: 0,
      title: '',
      description: '',
      year: '',
      publisher: false,
      date: '',
      author_id: 0
    };
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
    this.selectedBook = null;
  }

  guardar(): void {
    if (!this.selectedBook) return;
    if (this.selectedBook.id) {
      this.bookService.updateBook(this.selectedBook.id, this.selectedBook).subscribe(() => {
        this.loadBooks(this.currentPage);
        this.cerrarModal();
      });
    } else {
      this.bookService.createBook(this.selectedBook).subscribe(() => {
        this.loadBooks();
        this.cerrarModal();
      });
    }
  }

  eliminar(id: number): void {
    if (confirm('¿Deseas eliminar este libro?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.loadBooks(this.currentPage);
      });
    }
  }

  paginas(): number[] {
    return Array(this.lastPage).fill(0).map((_, i) => i + 1);
  }
}
