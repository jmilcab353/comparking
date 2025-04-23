import { Component, OnInit } from '@angular/core';
import { InfoService } from '../service/info.service';
import { PruebasService } from '../service/pruebas.service';
import { ParticipantesService } from '../service/participantes.service';
import { EvaluacionesService } from '../service/evaluaciones.service';
import { ItemsService } from '../service/items.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-evaluar',
  imports: [CommonModule, FormsModule],
  templateUrl: './evaluar.component.html',
  styleUrl: './evaluar.component.css'
})
export class EvaluarComponent implements OnInit {
  especialidad: string = '';
  idEspecialidad: number = 0;
  pruebas: any[] = [];
  participantes: any[] = [];
  items: any[] = [];
  idPruebaSeleccionada: number | null = null;
  showModal: boolean = false;
  participanteSeleccionado: any = null;
  evaluacion: any[] = [];

  constructor(
    private infoService: InfoService,
    private pruebasService: PruebasService,
    private participantesService: ParticipantesService,
    private evaluacionesService: EvaluacionesService,
    private itemsService: ItemsService
  ) { }

  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

  private cargarDatosUsuario(): void {
    this.infoService.getUserData().subscribe(usuario => {
      this.especialidad = usuario.especialidad;
      this.idEspecialidad = usuario.idEspecialidad;
      this.cargarPruebas();
    });
  }

  private cargarPruebas(): void {
    this.pruebasService.getPruebasByEspecialidad(this.idEspecialidad).subscribe(pruebas => {
      this.pruebas = pruebas;
    });
  }

  abrirModal(participante: any): void {
    this.participanteSeleccionado = participante;
    this.showModal = true;
    this.cargarItems();
  }

  cargarParticipantes(): void {
    if (!this.idPruebaSeleccionada) return;

    this.participantesService.getParticipantesPublic().subscribe(participantes => {
      this.participantes = participantes
        .filter(p => p.especialidad === this.especialidad)
        .map(participante => ({ ...participante, evaluado: false })); // Inicialmente asumimos que no ha sido evaluado

      // Verificar si cada participante ha sido evaluado en la prueba seleccionada
      this.participantes.forEach(participante => {
        this.evaluacionesService.isEvaluado(participante.id, this.idPruebaSeleccionada!)
          .subscribe(evaluado => {
            participante.evaluado = evaluado;
          });
      });
    });
  }

  private cargarItems(): void {
    if (!this.idPruebaSeleccionada) return;

    this.itemsService.getItemsByPrueba(this.idPruebaSeleccionada).subscribe(items => {
      this.items = items;
      this.evaluacion = this.items.map(item => ({
        idItem: item.id,
        valoracion: 0,
        comentario: ''
      }));
    });
  }

  cerrarModal(): void {
    this.showModal = false;
    this.participanteSeleccionado = null;
    this.items = [];
    this.evaluacion = [];
  }

  enviarEvaluacion(): void {
    if (!this.participanteSeleccionado || !this.idPruebaSeleccionada) return;

    const evaluacionData = {
      idParticipante: this.participanteSeleccionado.id,
      idPrueba: this.idPruebaSeleccionada,
      items: this.evaluacion
    };

    this.infoService.getUserData().subscribe(usuario => {
      this.evaluacionesService.evaluar(usuario.id, evaluacionData).subscribe(() => {
        // Actualizar el estado del participante como evaluado
        this.participantes = this.participantes.map(participante =>
          participante.id === this.participanteSeleccionado.id
            ? { ...participante, evaluado: true }
            : participante
        );

        this.cerrarModal();
      });
    });
  }

}
