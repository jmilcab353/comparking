import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../core/services/usuarios.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: any = {};
  backup: any = {};
  editMode = false;
  showPasswordModal = false;
  showSaldoModal = false;
  showRetiradaModal = false;

  nuevaPassword = '';
  repetirPassword = '';
  ingreso = 0;
  retirada = 0;

  mensaje = '';
  errorMessage = '';
  errorPassword = '';
  errorSaldo = '';

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.getMisDatos().subscribe({
      next: data => {
        this.usuario = { ...data };
        this.backup = { ...data };
      },
      error: err => console.error('Error al cargar datos del perfil:', err)
    });
  }

  get nombreInvalido(): boolean {
    return this.usuario.nombre && (this.usuario.nombre.length < 2 || this.usuario.nombre.length > 30);
  }

  get apellidosInvalido(): boolean {
    return this.usuario.apellidos && (this.usuario.apellidos.length < 2 || this.usuario.apellidos.length > 100);
  }

  get dniInvalido(): boolean {
    return this.usuario.dni && !/^[0-9]{8}[A-Za-z]$/.test(this.usuario.dni);
  }

  validarFormulario(): boolean {
    this.errorMessage = '';

    if (!this.usuario.nombre || !this.usuario.apellidos || !this.usuario.username) {
      this.errorMessage = 'Los campos obligatorios no pueden estar vacíos.';
      return false;
    }

    if (this.nombreInvalido) {
      this.errorMessage = 'El nombre debe tener entre 2 y 30 caracteres.';
      return false;
    }

    if (this.apellidosInvalido) {
      this.errorMessage = 'Los apellidos deben tener entre 2 y 100 caracteres.';
      return false;
    }

    if (this.dniInvalido) {
      this.errorMessage = 'El DNI debe tener 8 números y una letra.';
      return false;
    }

    return true;
  }

  guardarCambios(): void {
    if (!this.validarFormulario()) return;

    const datosActualizados = {
      nombre: this.usuario.nombre,
      apellidos: this.usuario.apellidos,
      dni: this.usuario.dni,
      foto: this.usuario.foto,
      iban: this.usuario.iban,
      username: this.usuario.username,
      saldo: this.usuario.saldo
    };

    this.usuariosService.updateUsuario(this.usuario.id, datosActualizados).subscribe({
      next: updated => {
        this.usuario = updated;
        this.backup = { ...updated };
        this.editMode = false;
        this.errorMessage = '';
        this.mensaje = 'Perfil actualizado con éxito.';
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Error al guardar los cambios.';
      }
    });
  }

  cancelarEdicion(): void {
    this.usuario = { ...this.backup };
    this.editMode = false;
    this.errorMessage = '';
  }

  abrirModalContrasena(): void {
    this.nuevaPassword = '';
    this.repetirPassword = '';
    this.errorPassword = '';
    this.showPasswordModal = true;
  }

  abrirModalSaldo(): void {
    this.ingreso = 0;
    this.showSaldoModal = true;
  }

  abrirModalRetirada(): void {
    this.retirada = 0;
    this.errorSaldo = '';
    this.showRetiradaModal = true;
  }

  cerrarModal(): void {
    this.showPasswordModal = false;
    this.showSaldoModal = false;
    this.showRetiradaModal = false;
    this.errorPassword = '';
    this.errorSaldo = '';
  }

  actualizarContrasena(): void {
    this.errorPassword = '';

    if (!this.nuevaPassword || !this.repetirPassword) {
      this.errorPassword = 'Debes completar ambos campos.';
      return;
    }

    if (this.nuevaPassword !== this.repetirPassword) {
      this.errorPassword = 'Las contraseñas no coinciden.';
      return;
    }

    if (this.nuevaPassword.length < 4) {
      this.errorPassword = 'La contraseña debe tener al menos 4 caracteres.';
      return;
    }

    this.usuariosService.actualizarPassword(this.usuario.id, {
      nuevaPassword: this.nuevaPassword
    }).subscribe({
      next: () => {
        this.mensaje = 'Contraseña actualizada con éxito.';
        this.cerrarModal();
      },
      error: () => {
        this.errorPassword = 'No se pudo actualizar la contraseña.';
      }
    });
  }

  agregarSaldo(): void {
    this.errorSaldo = '';

    if (this.ingreso <= 0) {
      this.errorSaldo = 'La cantidad debe ser mayor a 0.';
      return;
    }

    const nuevoSaldo = this.usuario.saldo + this.ingreso;

    const datosActualizados = {
      ...this.usuario,
      saldo: nuevoSaldo
    };

    this.usuariosService.updateUsuario(this.usuario.id, datosActualizados).subscribe({
      next: updated => {
        this.usuario = updated;
        this.backup = { ...updated };
        this.showSaldoModal = false;
        this.mensaje = `Saldo actualizado. Se añadieron ${this.ingreso.toFixed(2)} €.`;
      },
      error: () => {
        this.errorSaldo = 'No se pudo añadir el saldo.';
      }
    });
  }

  retirarSaldo(): void {
    this.errorSaldo = '';

    if (this.retirada <= 0) {
      this.errorSaldo = 'La cantidad debe ser mayor a 0.';
      return;
    }

    if (this.retirada > this.usuario.saldo) {
      this.errorSaldo = 'No tienes suficiente saldo disponible.';
      return;
    }

    const nuevoSaldo = this.usuario.saldo - this.retirada;

    const datosActualizados = {
      ...this.usuario,
      saldo: nuevoSaldo
    };

    this.usuariosService.updateUsuario(this.usuario.id, datosActualizados).subscribe({
      next: updated => {
        this.usuario = updated;
        this.backup = { ...updated };
        this.showRetiradaModal = false;
        this.mensaje = `Se han retirado ${this.retirada.toFixed(2)} €. Serán ingresados en tu cuenta bancaria.`;
      },
      error: () => {
        this.errorSaldo = 'No se pudo realizar la retirada.';
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.usuariosService.subirFoto(this.usuario.id, formData).subscribe({
        next: (url) => {
          this.usuario.foto = url;
          this.mensaje = 'Foto actualizada correctamente.';
        },
        error: () => {
          this.errorMessage = 'No se pudo subir la foto.';
        }
      });
    }
  }
}
