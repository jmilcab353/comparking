import { Routes } from '@angular/router';
import { LandingComponent } from './shared/landing/landing.component';
import { ByeComponent } from './shared/bye/bye.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { adminGuard } from './core/guards/admin.guard';
import { modGuard } from './core/guards/mod.guard';
import { userGuard } from './core/guards/user.guard';

// Públicos
import { AparcamientosComponent } from './features/public/aparcamientos/aparcamientos.component';
import { AparcamientoDetalleComponent } from './features/public/aparcamiento-detalle/aparcamiento-detalle.component';

// Usuario registrado (ROLE_USER)
import { PerfilComponent } from './features/user/perfil/perfil.component';
import { PublicarComponent } from './features/user/publicar/publicar.component';
import { MisAparcamientosComponent } from './features/user/mis-aparcamientos/mis-aparcamientos.component';
import { MisReservasComponent } from './features/user/mis-reservas/mis-reservas.component';
import { MensajesComponent } from './features/user/mensajes/mensajes.component';
import { MensajesRecibidosComponent } from './features/user/mensajes-recibidos/mensajes-recibidos.component';
import { DenunciaComponent } from './features/user/denuncia/denuncia.component';
import { ResenaAppComponent } from './features/user/resena-app/resena-app.component';
import { ComunidadComponent } from './features/user/comunidad/comunidad.component';
import { PoliticaPrivacidadComponent } from './features/user/politica-privacidad/politica-privacidad.component';

// Moderador (ROLE_MOD)
import { ModAnunciosComponent } from './features/mod/mod-anuncios/mod-anuncios.component';
import { ModDenunciasComponent } from './features/mod/mod-denuncias/mod-denuncias.component';

// Administrador (ROLE_ADMIN)
import { AdminUsuariosComponent } from './features/admin/admin-usuarios/admin-usuarios.component';
import { AdminAnunciosComponent } from './features/admin/admin-anuncios/admin-anuncios.component';
import { AdminCorreccionesComponent } from './features/admin/admin-correcciones/admin-correcciones.component';

export const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'bye', component: ByeComponent, pathMatch: 'full' },

  // Aparcamientos
  { path: 'aparcamientos', component: AparcamientosComponent, pathMatch: 'full' },
  { path: 'aparcamientos/ver', component: AparcamientoDetalleComponent, pathMatch: 'full' },
  { path: 'aparcamientos/publicar', component: PublicarComponent, canActivate: [userGuard], pathMatch: 'full' },
  { path: 'aparcamientos/publicados', component: MisAparcamientosComponent, canActivate: [userGuard], pathMatch: 'full' },
  { path: 'aparcamientos/reservados', component: MisReservasComponent, canActivate: [userGuard], pathMatch: 'full' },
  { path: 'usuario/resena-app', component: ResenaAppComponent, canActivate: [userGuard], pathMatch: 'full' },

  // Usuario y comunidad
  { path: 'usuario/perfil', component: PerfilComponent, canActivate: [userGuard], pathMatch: 'full' },
  { path: 'usuario/comunidad', component: ComunidadComponent, canActivate: [userGuard], pathMatch: 'full' },
  { path: 'usuario/comunidad/mensajes', component: MensajesComponent, canActivate: [userGuard], pathMatch: 'full' },
  { path: 'usuario/comunidad/mensajes-recibidos', component: MensajesRecibidosComponent, canActivate: [userGuard], pathMatch: 'full' },
  { path: 'usuario/comunidad/politica-privacidad', component: PoliticaPrivacidadComponent, canActivate: [userGuard], pathMatch: 'full' },
  { path: 'usuario/comunidad/denuncia', component: DenunciaComponent, canActivate: [userGuard], pathMatch: 'full' },

  // Moderador
  { path: 'mod/anuncios', component: ModAnunciosComponent, canActivate: [modGuard], pathMatch: 'full' },
  { path: 'mod/denuncias', component: ModDenunciasComponent, canActivate: [modGuard], pathMatch: 'full' },

  // Admin
  { path: 'admin/usuarios', component: AdminUsuariosComponent, canActivate: [adminGuard], pathMatch: 'full' },
  { path: 'admin/anuncios', component: AdminAnunciosComponent, canActivate: [adminGuard], pathMatch: 'full' },
  { path: 'admin/correcciones', component: AdminCorreccionesComponent, canActivate: [adminGuard], pathMatch: 'full' },

  { path: '**', component: NotFoundComponent }
];
