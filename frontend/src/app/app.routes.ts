import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { ByeComponent } from './bye/bye.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { adminGuard } from './auth/admin.guard';
import { modGuard } from './auth/mod.guard';
import { userGuard } from './auth/user.guard';

// Públicos
import { AparcamientosComponent } from './aparcamientos/aparcamientos/aparcamientos.component';
import { AparcamientoDetalleComponent } from './aparcamientos/aparcamiento-detalle/aparcamiento-detalle.component';
import { RegisterComponent } from './auth/register/register.component';

// Usuario registrado (ROLE_USER)
import { PerfilComponent } from './usuario/perfil/perfil/perfil.component';
import { PublicarComponent } from './usuario/publicar/publicar/publicar.component';
import { MisAparcamientosComponent } from './usuario/aparcamientos/mis-aparcamientos/mis-aparcamientos.component';
import { MisReservasComponent } from './usuario/reservas/mis-reservas/mis-reservas.component';
import { ReservarComponent } from './usuario/reservar/reservar/reservar.component';
import { MensajesComponent } from './usuario/mensajes/mensajes/mensajes.component';
import { TruequesComponent } from './usuario/trueques/trueques/trueques.component';
import { CarteraComponent } from './usuario/cartera/cartera/cartera.component';
import { DenunciaComponent } from './usuario/denuncia/denuncia/denuncia.component';
import { ResenaAppComponent } from './usuario/resena/resena-app/resena-app.component';

// Moderador (ROLE_MOD)
import { ModAnunciosComponent } from './mod/anuncios/mod-anuncios/mod-anuncios.component';
import { ModDenunciasComponent } from './mod/denuncias/mod-denuncias/mod-denuncias.component';

// Administrador (ROLE_ADMIN)
import { AdminUsuariosComponent } from './admin/usuarios/admin-usuarios/admin-usuarios.component';
import { AdminAnunciosComponent } from './admin/anuncios/admin-anuncios/admin-anuncios.component';
import { AdminCorreccionesComponent } from './admin/correcciones/admin-correcciones/admin-correcciones.component';

export const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'bye', component: ByeComponent, pathMatch: 'full' },

  // Públicos
  { path: 'aparcamientos', component: AparcamientosComponent, pathMatch: 'full' },
  { path: 'aparcamientos/:id', component: AparcamientoDetalleComponent, pathMatch: 'full' },

  // ROLE_USER
  { path: 'usuario/perfil', component: PerfilComponent, canActivate: [userGuard], pathMatch: 'full' },
  { path: 'usuario/publicar', component: PublicarComponent, canActivate: [userGuard], pathMatch: 'full' },
  { path: 'usuario/aparcamientos', component: MisAparcamientosComponent, canActivate: [userGuard], pathMatch: 'full' },
  { path: 'usuario/reservas', component: MisReservasComponent, canActivate: [userGuard], pathMatch: 'full' },
  { path: 'usuario/reservar/:id', component: ReservarComponent, canActivate: [userGuard], pathMatch: 'full' },
  { path: 'usuario/mensajes', component: MensajesComponent, canActivate: [userGuard], pathMatch: 'full' },
  { path: 'usuario/trueques', component: TruequesComponent, canActivate: [userGuard], pathMatch: 'full' },
  { path: 'usuario/cartera', component: CarteraComponent, canActivate: [userGuard], pathMatch: 'full' },
  { path: 'usuario/denuncia/:idReserva', component: DenunciaComponent, canActivate: [userGuard], pathMatch: 'full' },
  { path: 'usuario/resena-app', component: ResenaAppComponent, canActivate: [userGuard], pathMatch: 'full' },

  // ROLE_MOD
  { path: 'mod/anuncios', component: ModAnunciosComponent, canActivate: [modGuard], pathMatch: 'full' },
  { path: 'mod/denuncias', component: ModDenunciasComponent, canActivate: [modGuard], pathMatch: 'full' },

  // ROLE_ADMIN
  { path: 'admin/usuarios', component: AdminUsuariosComponent, canActivate: [adminGuard], pathMatch: 'full' },
  { path: 'admin/anuncios', component: AdminAnunciosComponent, canActivate: [adminGuard], pathMatch: 'full' },
  { path: 'admin/correcciones', component: AdminCorreccionesComponent, canActivate: [adminGuard], pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }  // Ruta comodín al final
];
