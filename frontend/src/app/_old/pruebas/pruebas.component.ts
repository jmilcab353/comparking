import {Component, OnInit} from '@angular/core';
import {PruebasService} from '../../core/services_old/pruebas.service';
import {InfoService} from '../../core/services/info.service';
import {ItemsService} from '../../core/services_old/items.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-pruebas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {
  pruebas: any[] = [];
  currentPrueba: any = { enunciado: '', puntuacionMaxima: 0 };
  isEditing = false;
  errorMessage = '';
  especialidadId: number | null = null;
  especialidad: string = '';
  selectedFile: File | null = null;
  showModal = false;

  // Propiedades para el modal de ítems
  showItemsModal = false;
  currentPruebaForItems: any = null;
  currentItems: any[] = [];
  currentItem: any = { descripcion: '', peso: 0, gradosConsecucion: 0 };
  isEditingItem = false;
  itemErrorMessage = ''; // Error para ítems

  constructor(
    private pruebasService: PruebasService,
    private infoService: InfoService,
    private itemsService: ItemsService
  ) { }

  ngOnInit(): void {
    this.loadUserEspecialidad();
  }

  loadUserEspecialidad(): void {
    this.infoService.getUserData().subscribe({
      next: (userData) => {
        this.especialidadId = userData.idEspecialidad;
        this.especialidad = userData.especialidad;
        this.loadPruebas();
      },
      error: () => {
        this.errorMessage = 'Error al obtener la información del usuario';
      }
    });
  }

  loadPruebas(): void {
    if (this.especialidadId) {
      this.pruebasService.getPruebasByEspecialidad(this.especialidadId).subscribe({
        next: (data) => (this.pruebas = data),
        error: () => (this.errorMessage = 'No hay pruebas disponibles')
      });
    }
  }

  onSubmit(): void {
    if (!this.especialidadId) {
      this.errorMessage = 'Error: No se pudo obtener la especialidad';
      return;
    }
    this.currentPrueba.especialidadId = this.especialidadId;

    if (this.isEditing && this.currentPrueba.id) {
      this.pruebasService.updatePrueba(this.currentPrueba.id, this.currentPrueba).subscribe({
        next: () => {
          if (this.selectedFile) {
            this.uploadPdf(this.currentPrueba.id);
          } else {
            this.loadPruebas();
            this.resetForm();
          }
        },
        error: () => this.errorMessage = 'Error al actualizar prueba'
      });
    } else {
      this.pruebasService.createPrueba(this.currentPrueba).subscribe({
        next: (newPrueba) => {
          if (this.selectedFile) {
            this.uploadPdf(newPrueba.id);
          } else {
            this.loadPruebas();
            this.resetForm();
          }
        },
        error: () => this.errorMessage = 'Error al crear prueba'
      });
    }
  }

  uploadPdf(pruebaId: number): void {
    if (this.selectedFile) {
      this.pruebasService.uploadPdf(pruebaId, this.selectedFile).subscribe({
        next: () => {
          this.closeModal();
          this.loadPruebas();
          this.resetForm();
        },
        error: (err) => {
          this.errorMessage = 'Error al subir el PDF: ' + (err.message || 'Error desconocido');
        }
      });
    } else {
      this.errorMessage = 'Por favor, selecciona un archivo PDF para subir.';
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  viewPdf(ruta: string): void {
    this.pruebasService.viewPdf(ruta);
  }

  editPrueba(prueba: any): void {
    this.currentPrueba = { ...prueba };
    this.isEditing = true;
  }

  deletePrueba(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta prueba?')) {
      this.pruebasService.deletePrueba(id).subscribe({
        next: () => this.loadPruebas(),
        error: () => this.errorMessage = 'Error al eliminar prueba'
      });
    }
  }

  resetForm(): void {
    this.currentPrueba = { enunciado: '', puntuacionMaxima: 0 };
    this.selectedFile = null;
    this.isEditing = false;
    this.errorMessage = '';
    this.showModal = false;
  }

  openModal(prueba: any): void {
    this.currentPrueba = prueba;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedFile = null;
  }

  /* ==========================
    Métodos para gestionar ítems
    ========================== */

  openItemsModal(prueba: any): void {
    this.currentPruebaForItems = prueba;

    // Comprobar si ya hemos cargado los ítems para esta prueba, si ya están cargados, no hacer la llamada nuevamente.
    if (this.currentPruebaForItems && this.currentPruebaForItems.id) {
      this.itemsService.getItemsByPrueba(prueba.id).subscribe({
        next: (data) => {
          this.currentItems = data;
          // Si no hay ítems, se muestra el mensaje "Aún no hay ítems"
          if (this.currentItems.length === 0) {
            this.itemErrorMessage = 'Aún no hay ítems';
          } else {
            this.itemErrorMessage = ''; // Limpiar cualquier mensaje de error si hay ítems
          }
        },
        error: () => {
          this.currentItems = [];
          this.itemErrorMessage = 'Esta prueba aún no tiene ítems';
        }
      });
    }

    this.showItemsModal = true;
  }


  addItem(): void {
    if (this.isEditingItem) {
      // Verifica que el ID existe antes de hacer la petición
      if (!this.currentItem.id) {
        this.itemErrorMessage = 'Error: No se pudo obtener el ID del ítem';
        return;
      }

      this.itemsService.updateItem(this.currentItem.id, this.currentItem).subscribe({
        next: () => {
          this.loadItems();
          this.resetItemForm();
        },
        error: (err) => {
          this.itemErrorMessage = `Error al actualizar el ítem: ${err.status} ${err.statusText}`;
        }
      });
    } else {
      // Crear nuevo ítem
      this.currentItem.pruebaId = this.currentPruebaForItems.id;
      this.itemsService.createItem(this.currentItem).subscribe({
        next: () => {
          this.loadItems();
          this.resetItemForm();
        },
        error: (err) => {
          this.itemErrorMessage = `Error al crear el ítem: ${err.status} ${err.statusText}`;
        }
      });
    }
  }

  editItem(item: any): void {
    this.currentItem = { ...item };
    this.isEditingItem = true;
  }

  deleteItem(idItem: number): void {
    if (!idItem) {
      this.itemErrorMessage = 'Error: No se pudo obtener el ID del ítem';
      return;
    }
    if (confirm('¿Estás seguro de que deseas eliminar este ítem?')) {
      this.itemsService.deleteItem(idItem).subscribe({
        next: () => this.loadItems(),
        error: () => this.itemErrorMessage = 'Error al eliminar ítem'
      });
    }
  }

  loadItems(): void {
    this.itemsService.getItemsByPrueba(this.currentPruebaForItems.id).subscribe({
      next: (data) => {
        this.currentItems = data;
      },
      error: () => {
        this.itemErrorMessage = 'Esta prueba aún no tiene ítems';
      }
    });
  }

  resetItemForm(): void {
    this.currentItem = { descripcion: '', peso: 0, gradosConsecucion: 0 };
    this.isEditingItem = false;
    this.itemErrorMessage = ''; // Limpiar los mensajes de error
  }

  closeItemsModal(): void {
    this.showItemsModal = false;
    this.resetItemForm();
  }

}
