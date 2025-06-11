import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../../core/services/usuarios.service';

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-usuarios.component.html',
  styleUrl: './admin-usuarios.component.css'
})
export class AdminUsuariosComponent implements OnInit {
  allUsuarios: any[] = [];
  usuarios: any[] = [];
  filteredUsuarios: any[] = [];
  errorMessage = '';

  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  sortColumn: string = '';
  sortDirection: boolean = true;

  mostrarModalNuevoModerador: boolean = false;
  mostrarModalEditarUsuario: boolean = false;

  nuevoModerador = {
    email: '',
    password: ''
  };

  usuarioEditando: any = {
    nombre: '',
    apellidos: '',
    username: '',
    dni: '',
    saldo: 0,
    depositos: 0,
    role: '',
    password1: '',
    password2: ''
  };

  errorEditar: string = '';

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: data => {
        this.allUsuarios = data.filter(u => u.role !== 'ROLE_ADMIN');
        this.filtrarYOrdenar();
      },
      error: () => this.errorMessage = 'Error al cargar los usuarios'
    });
  }

  filtrarYOrdenar(): void {
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      this.filteredUsuarios = this.allUsuarios.filter(u =>
        u.nombre?.toLowerCase().includes(term) ||
        u.apellidos?.toLowerCase().includes(term) ||
        u.username?.toLowerCase().includes(term) ||
        u.dni?.toLowerCase().includes(term) ||
        u.role?.toLowerCase().includes(term)
      );
    } else {
      this.filteredUsuarios = [...this.allUsuarios];
    }

    if (this.sortColumn) {
      this.filteredUsuarios.sort((a, b) => {
        const valA = a[this.sortColumn]?.toString().toLowerCase() || '';
        const valB = b[this.sortColumn]?.toString().toLowerCase() || '';
        return valA < valB ? (this.sortDirection ? -1 : 1) : valA > valB ? (this.sortDirection ? 1 : -1) : 0;
      });
    }

    this.totalPages = Math.ceil(this.filteredUsuarios.length / this.pageSize);
    if (this.currentPage > this.totalPages) this.currentPage = Math.max(1, this.totalPages);

    const start = (this.currentPage - 1) * this.pageSize;
    this.usuarios = this.filteredUsuarios.slice(start, start + this.pageSize);
  }

  onSearch(): void {
    this.currentPage = 1;
    this.filtrarYOrdenar();
  }

  sortBy(col: string): void {
    this.sortDirection = this.sortColumn === col ? !this.sortDirection : true;
    this.sortColumn = col;
    this.filtrarYOrdenar();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.filtrarYOrdenar();
    }
  }

  getPagesRange(): number[] {
    const range: number[] = [];
    const totalToShow = 5;
    let start = Math.max(1, this.currentPage - Math.floor(totalToShow / 2));
    let end = Math.min(this.totalPages, start + totalToShow - 1);
    start = Math.max(1, end - totalToShow + 1);
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  }

  getPosition(index: number): number {
    return (this.currentPage - 1) * this.pageSize + index + 1;
  }

  abrirModalNuevoModerador(): void {
    this.errorMessage = '';
    this.mostrarModalNuevoModerador = true;
  }

  cerrarModalNuevoModerador(): void {
    this.nuevoModerador = { email: '', password: '' };
    this.mostrarModalNuevoModerador = false;
  }

  crearModerador(): void {
    this.errorMessage = '';

    if (!this.nuevoModerador.email.includes('@')) {
      this.errorMessage = 'El email no es válido.';
      return;
    }

    if (this.nuevoModerador.password.length < 4) {
      this.errorMessage = 'La contraseña debe tener al menos 4 caracteres.';
      return;
    }

    const dto = {
      username: this.nuevoModerador.email,
      password: this.nuevoModerador.password,
      password2: this.nuevoModerador.password
    };

    this.usuariosService.createUsuario(dto).subscribe({
      next: () => {
        this.cargarUsuarios();
        this.cerrarModalNuevoModerador();
      },
      error: () => {
        this.errorMessage = 'Error al crear el moderador';
      }
    });
  }

  editarUsuario(user: any): void {
    this.usuarioEditando = {
      ...user,
      password1: '',
      password2: ''
    };
    this.errorEditar = '';
    this.mostrarModalEditarUsuario = true;
  }

  cerrarModalEditarUsuario(): void {
    this.usuarioEditando = null;
    this.mostrarModalEditarUsuario = false;
  }

  guardarCambiosUsuario(): void {
    if (!this.usuarioEditando?.idUser) return;

    this.errorEditar = '';

    const { password1, password2 } = this.usuarioEditando;

    if (!this.usuarioEditando.username || !this.usuarioEditando.nombre || !this.usuarioEditando.apellidos) {
      this.errorEditar = 'Nombre, apellidos y correo son obligatorios.';
      return;
    }

    if (!this.usuarioEditando.username.includes('@')) {
      this.errorEditar = 'El correo electrónico no es válido.';
      return;
    }

    if (password1 || password2) {
      if (password1 !== password2) {
        this.errorEditar = 'Las contraseñas no coinciden.';
        return;
      }
      if (password1.length < 4) {
        this.errorEditar = 'La contraseña debe tener al menos 4 caracteres.';
        return;
      }
    }

    const dto = {
      username: this.usuarioEditando.username,
      password: password1 || '********',
      nombre: this.usuarioEditando.nombre,
      apellidos: this.usuarioEditando.apellidos,
      dni: this.usuarioEditando.dni,
      foto: this.usuarioEditando.foto || '',
      saldo: this.usuarioEditando.saldo,
      depositos: this.usuarioEditando.depositos,
      role: this.usuarioEditando.role
    };

    this.usuariosService.updateUsuarioAdmin(this.usuarioEditando.idUser, dto).subscribe({
      next: () => {
        this.cargarUsuarios();
        this.cerrarModalEditarUsuario();
      },
      error: () => {
        this.errorEditar = 'Error al actualizar el usuario.';
      }
    });
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuariosService.deleteUsuario(id).subscribe({
        next: () => this.cargarUsuarios(),
        error: () => this.errorMessage = 'Error al eliminar el usuario'
      });
    }
  }
  
}
