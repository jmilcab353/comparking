import { Routes } from '@angular/router';
import { ListaCompetidoresComponent } from './lista-competidores/lista-competidores.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AdminComponent } from './admin/admin.component';
import { adminGuard } from './auth/admin.guard';
import { ExpertoComponent } from './experto/experto.component';
import { expertoGuard } from './auth/experto.guard';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { ExpertosComponent } from './expertos/expertos.component';
import { GanadoresComponent } from './ganadores/ganadores.component';
import { ParticipantesComponent } from './participantes/participantes.component';
import { EvaluarComponent } from './evaluar/evaluar.component';
import { PruebasComponent } from './pruebas/pruebas.component';
import { ByeComponent } from './bye/bye.component';

export const routes: Routes = [
    { path: '', component: LandingComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'competidores', component: ListaCompetidoresComponent, pathMatch: 'full' },
    { path: 'bye', component: ByeComponent, pathMatch: 'full' },
    
    { path: 'admin', component: AdminComponent, canActivate: [adminGuard], pathMatch: 'full' },
    { path: 'admin/especialidades', component: EspecialidadesComponent, canActivate: [adminGuard], pathMatch: 'full' },
    { path: 'admin/expertos', component: ExpertosComponent, canActivate: [adminGuard], pathMatch: 'full' },
    { path: 'admin/ganadores', component: GanadoresComponent, canActivate: [adminGuard], pathMatch: 'full' },

    { path: 'experto', component: ExpertoComponent, canActivate: [expertoGuard], pathMatch: 'full' },
    { path: 'experto/participantes', component: ParticipantesComponent, canActivate: [expertoGuard], pathMatch: 'full' },
    { path: 'experto/evaluar', component: EvaluarComponent, canActivate: [expertoGuard], pathMatch: 'full' },
    { path: 'experto/pruebas', component: PruebasComponent, canActivate: [expertoGuard], pathMatch: 'full' },

];
