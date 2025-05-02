import { Component, OnInit } from '@angular/core';
import { AutorService } from './autor.service';
import { Autor } from './autor.model';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {
  autores: Autor[] = [];
  total = 0;
  currentPage = 1;
  lastPage = 1;
  searchTerm = '';
  selectedAutor: Autor | null = null;
  showModal = false;

  constructor(private autorService: AutorService) { }

  ngOnInit(): void {
    this.cargarAutores();
  }

  cargarAutores(page = 0): void {
    this.autorService.getAutores(page, this.searchTerm).subscribe(res => {
      this.autores = res.data;
      this.total = res.total;
      this.currentPage = res.current_page;
      this.lastPage = res.last_page;
      this.total = res.total;
    });
  }
  paginas(): number[] {
    console.log(Array(this.lastPage).fill(0).map((_, i) => i + 1))
    return Array(this.lastPage).fill(0).map((_, i) => i + 1);
  }
  abrirModal(autor?: Autor): void {
    this.selectedAutor = autor ? { ...autor } : { id: 0, name: '', gender: 'Masculino' } as Autor;
    this.showModal = true;
  }  

  cerrarModal(): void {
    this.showModal = false;
    this.selectedAutor = null;
  }

  guardar(): void {
    if (this.selectedAutor?.id) {
      this.autorService.updateAutor(this.selectedAutor.id, this.selectedAutor).subscribe(() => {
        this.cargarAutores(this.currentPage);
        this.cerrarModal();
      });
    } else {
      this.autorService.createAutor(this.selectedAutor!).subscribe(() => {
        this.cargarAutores();
        this.cerrarModal();
      });
    }
  }

  eliminar(id: number): void {
    if (confirm('¿Deseas eliminar este autor?')) {
      this.autorService.deleteAutor(id).subscribe(() => {
        this.cargarAutores(this.currentPage);
      });
    }
  }
}
