import {Component, OnInit} from '@angular/core';
import {EvaluacionesService} from '../../core/services_old/evaluaciones.service';
import {EspecialidadesService} from '../../core/services_old/especialidades.service';
import {ParticipantesService} from '../../core/services_old/participantes.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-ganadores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ganadores.component.html',
  styleUrls: ['./ganadores.component.css']
})
export class GanadoresComponent implements OnInit {
  especialidades: any[] = [];
  participantes: any[] = [];
  ganadoresSeleccionados: any[] = [];
  showModal: boolean = false;
  mensajeError: string = '';
  especialidadSeleccionada: any = null;

  constructor(
    private evaluacionesService: EvaluacionesService,
    private especialidadesService: EspecialidadesService,
    private participantesService: ParticipantesService
  ) { }

  ngOnInit(): void {
    this.cargarEspecialidades();
    this.cargarParticipantes();
  }

  private cargarEspecialidades(): void {
    this.especialidadesService.getEspecialidades().subscribe({
      next: (data) => (this.especialidades = data),
      error: (err) => console.error('Error al obtener especialidades', err)
    });
  }

  private cargarParticipantes(): void {
    this.participantesService.getParticipantesPublic().subscribe({
      next: (data) => (this.participantes = data),
      error: (err) => console.error('Error al obtener participantes', err)
    });
  }

  mostrarGanador(idEspecialidad: number): void {
    this.especialidadSeleccionada = this.especialidades.find(e => e.id === idEspecialidad) || null;

    this.evaluacionesService.getGanadoresByEspecialidad(idEspecialidad).subscribe({
      next: (data) => {
        if (data.length > 0) {
          // Obtener la puntuación más alta
          const maxNota = Math.max(...data.map(e => e.notaFinal));

          // Filtrar ganadores con la misma puntuación
          const ganadoresEmpatados = data.filter(e => e.notaFinal === maxNota);

          // Obtener los detalles de los ganadores
          this.ganadoresSeleccionados = ganadoresEmpatados.map(ganador => {
            const participante = this.participantes.find(p => p.id === ganador.idParticipante);
            return participante ? {
              nombre: participante.nombre,
              apellidos: participante.apellidos,
              idParticipante: ganador.idParticipante,
              centro: participante.centro,
              notaFinal: ganador.notaFinal.toFixed(2)
            } : null;
          }).filter(g => g !== null);

          if (this.ganadoresSeleccionados.length === 0) {
            this.mensajeError = 'No hay ganador para esta especialidad.';
          } else {
            this.mensajeError = ''; // Limpiar mensaje de error
          }
        } else {
          this.mensajeError = 'No hay ganador para esta especialidad.';
          this.ganadoresSeleccionados = [];
        }

        this.showModal = true;
      },
      error: (err) => {
        console.error('Error al obtener ganadores', err);
        this.mensajeError = 'No hay ganador para esta especialidad.';
        this.ganadoresSeleccionados = [];
        this.showModal = true; // Se abre el modal con el mensaje de error
      }
    });
  }

  cerrarModal(): void {
    this.showModal = false;
    this.ganadoresSeleccionados = [];
    this.mensajeError = '';
  }

}
