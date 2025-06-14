import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DenunciasService } from '../../../core/services/denuncias.service';
import { UsuariosService } from '../../../core/services/usuarios.service';
import { AparcamientosService } from '../../../core/services/aparcamientos.service';

@Component({
  selector: 'app-denuncia',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './denuncia.component.html',
  styleUrl: './denuncia.component.css'
})
export class DenunciaComponent implements OnInit {
  dto: any = {};
  enviarEstado: 'idle' | 'enviando' | 'ok' | 'error' = 'idle';
  errorMsg: string = '';
  bloquearEnvio: boolean = false;

  idUsuario: number = 0;

  modalUsuariosAbierto = false;
  modalAparcamientosAbierto = false;

  usuarioSeleccionado: any = null;
  aparcamientoSeleccionado: any = null;

  usuarios: any[] = [];
  aparcamientos: any[] = [];

  filtroUsuarios: string = '';
  filtroAparcamientos: string = '';

  constructor(
    private denunciasService: DenunciasService,
    private usuariosService: UsuariosService,
    private aparcamientosService: AparcamientosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const login = sessionStorage.getItem('LOGIN');
    if (login) {
      this.idUsuario = JSON.parse(login).user.id;
    }

    this.usuariosService.getUsuarios().subscribe({
      next: data => {
        this.usuarios = data
          .map(u => ({
            id: Number(u.idUser),
            nombre: u.nombre,
            email: u.username,
            role: u.role
          }))
          .filter(u => u.id !== this.idUsuario && u.role === 'ROLE_USER');
      },
      error: () => this.usuarios = []
    });

    this.aparcamientosService.getAparcamientos().subscribe({
      next: data => this.aparcamientos = data,
      error: () => console.error('Error al cargar aparcamientos')
    });
  }

  seleccionarUsuario(usuario: any) {
    this.usuarioSeleccionado = usuario;
    this.dto.denunciadoId = usuario.id;
    this.modalUsuariosAbierto = false;
  }

  limpiarUsuario() {
    this.usuarioSeleccionado = null;
    this.dto.denunciadoId = null;
  }

  seleccionarAparcamiento(aparcamiento: any) {
    this.aparcamientoSeleccionado = aparcamiento;
    this.dto.aparcamientoId = aparcamiento.id;
    this.modalAparcamientosAbierto = false;
  }

  limpiarAparcamiento() {
    this.aparcamientoSeleccionado = null;
    this.dto.aparcamientoId = null;
  }

  enviar(): void {
    this.errorMsg = '';
    this.enviarEstado = 'idle';

    if (this.bloquearEnvio) return;

    if (!this.dto.denunciadoId || !this.dto.aparcamientoId || !this.dto.descripcion?.trim()) {
      this.errorMsg = 'Debe rellenar todos los campos.';
      this.enviarEstado = 'error';
      return;
    }

    const payload = {
      denuncianteId: this.idUsuario,
      denunciadoId: this.dto.denunciadoId,
      aparcamientoId: this.dto.aparcamientoId,
      descripcion: this.dto.descripcion.trim(),
      imagen: '',
      fecha: new Date().toISOString().slice(0, 19),
      estado: 'pendiente'
    };

    this.enviarEstado = 'enviando';
    this.bloquearEnvio = true;

    this.denunciasService.crearDenuncia(payload).subscribe({
      next: () => {
        this.enviarEstado = 'ok';
        setTimeout(() => {
          this.router.navigate(['/usuario/comunidad']);
          this.bloquearEnvio = false;
        }, 2000);
      },
      error: () => {
        this.enviarEstado = 'error';
        this.errorMsg = 'No se pudo registrar la denuncia.';
        this.bloquearEnvio = false;
      }
    });
  }

  get usuariosFiltrados() {
    const term = this.filtroUsuarios.trim().toLowerCase();
    return this.usuarios.filter(u =>
      (u.nombre?.toLowerCase() ?? '').includes(term) ||
      (u.email?.toLowerCase() ?? '').includes(term)
    );
  }

  get aparcamientosFiltrados() {
    const term = this.filtroAparcamientos.trim().toLowerCase();
    return this.aparcamientos.filter(a =>
      (a.direccion?.toLowerCase() ?? '').includes(term)
    );
  }
}
