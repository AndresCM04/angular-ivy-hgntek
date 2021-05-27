import { Component, VERSION } from '@angular/core';
import { FireService } from './fireservice';
import { estudiante } from './estudiantes';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /******
   * ATRIBUTOS
   *****/
  public estudiantes: estudiante[];
  public nuevo_estudiante: string;
  public n_lastname: string;
  public n_cc: string;
  public n_cel: string;
  public estudiante: estudiante = null;
  public name: string;
  public id: string;
  public lastname: string;
  public cc: string;
  public cel: string;

  constructor(private fireService: FireService) {
    this.estudiantes = [];
    this.nuevo_estudiante = '';
    this.getEstudiante();
    this.name = '';
    this.id = '';
    this.n_cc = '';
    this.n_cel = '';
    this.n_lastname = '';
    this.lastname = '';
    this.cc = '';
    this.cel = '';
  }

  //Método para obtener todos los libros
  getEstudiante() {
    this.fireService.get().subscribe(
      (respEstudiante: estudiante[]) => {
        //Obtiene el resultado de la consulta
        this.estudiantes = respEstudiante;
      },
      error => {
        //Aquí imprime el error en caso de no comunicarse con firebase o un error de BD
        console.error(error);
      }
    );
  }

  crearEstudiante() {
    let estudiante: estudiante = {
      name: this.nuevo_estudiante,
      lastname: this.n_lastname,
      cc: this.n_cc,
      celular: this.n_cel
    };
    this.fireService.post(estudiante, estudiante.id).then(resp => {
      this.nuevo_estudiante = '';
      this.n_lastname = '';
      this.n_cc = '';
      this.n_cel = '';
    });
  }
  // Eliminar
  eliminarEstudiante(item: estudiante) {
    try {
      this.fireService.eliminarr(item);
      alert('¡Se ha eliminado con exito!');
    } catch (err) {
      console.log(err);
    }
  }
  //Consultar
  consultarEstudiante(item: estudiante) {
    this.name = item.name;
    this.lastname = item.lastname;
    this.cc = item.cc;
    this.cel = item.celular;
    this.id = item.id
  }

  // Actualizar
  actualizarEstudiante() {
    let estudiante: estudiante = {
      name: this.name, 
      lastname: this.lastname,
      cc: this.cc,
      celular: this.cel,
      id: this.id
    };
  }
}
