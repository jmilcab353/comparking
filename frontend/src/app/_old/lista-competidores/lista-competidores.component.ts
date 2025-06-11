import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ParticipantesService} from '../../core/services_old/participantes.service';

interface Competidor {
  id: number;
  nombre: string;
  apellidos: string;
  centro: string;
  especialidad: string;
  [key: string]: any;
}

@Component({
  selector: 'app-lista-competidores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-competidores.component.html',
  styleUrls: ['./lista-competidores.component.css']
})
export class ListaCompetidoresComponent implements OnInit {
  // Datos completos y filtrados
  allCompetidores: Competidor[] = [];
  competidores: Competidor[] = [];
  filteredCompetidores: Competidor[] = [];
  errorMessage = '';

  // Término de búsqueda
  searchTerm: string = '';

  // Paginación
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  // Ordenación
  sortColumn: string = '';
  sortDirection: boolean = true; // true = ascendente, false = descendente

  constructor(private participantesService: ParticipantesService) { }

  ngOnInit(): void {
    this.loadCompetidores();
  }

  loadCompetidores(): void {
    this.participantesService.getParticipantesPublic().subscribe({
      next: (data) => {
        this.allCompetidores = data;
        this.filterAndSort();
      },
      error: () => this.errorMessage = 'Error al cargar los competidores'
    });
  }

  // Filtrar, ordenar y paginar datos
  filterAndSort(): void {
    // Filtrar por término de búsqueda
    if (this.searchTerm && this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      this.filteredCompetidores = this.allCompetidores.filter(competidor =>
        competidor.nombre.toLowerCase().includes(term) ||
        competidor.apellidos.toLowerCase().includes(term) ||
        competidor.centro.toLowerCase().includes(term) ||
        competidor.especialidad.toLowerCase().includes(term)
      );
    } else {
      this.filteredCompetidores = [...this.allCompetidores];
    }

    // Ordenar si hay columna seleccionada
    if (this.sortColumn) {
      this.filteredCompetidores.sort((a, b) => {
        const valueA = a[this.sortColumn]?.toString().toLowerCase() || '';
        const valueB = b[this.sortColumn]?.toString().toLowerCase() || '';

        if (valueA < valueB) {
          return this.sortDirection ? -1 : 1;
        }
        if (valueA > valueB) {
          return this.sortDirection ? 1 : -1;
        }
        return 0;
      });
    }

    // Calcular páginas
    this.totalPages = Math.ceil(this.filteredCompetidores.length / this.pageSize);
    if (this.currentPage > this.totalPages) {
      this.currentPage = Math.max(1, this.totalPages);
    }

    // Aplicar paginación
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.competidores = this.filteredCompetidores.slice(startIndex, startIndex + this.pageSize);
  }

  // Ordenar por columna
  sortBy(column: string): void {
    if (this.sortColumn === column) {
      // Cambiar dirección si ya estamos ordenando por esta columna
      this.sortDirection = !this.sortDirection;
    } else {
      this.sortColumn = column;
      this.sortDirection = true;
    }
    this.filterAndSort();
  }

  // Manejar búsqueda
  onSearch(): void {
    this.currentPage = 1;
    this.filterAndSort();
  }

  // Métodos de paginación
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.filterAndSort();
    }
  }

  // Obtener el rango de páginas para mostrar
  getPagesRange(): number[] {
    const totalPagesToShow = 5; // Número de páginas a mostrar en la paginación
    const pages: number[] = [];

    let startPage = Math.max(1, this.currentPage - Math.floor(totalPagesToShow / 2));
    let endPage = startPage + totalPagesToShow - 1;

    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(1, endPage - totalPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  // Obtener la posición real en la lista
  getPosition(index: number): number {
    return (this.currentPage - 1) * this.pageSize + index + 1;
  }
}
