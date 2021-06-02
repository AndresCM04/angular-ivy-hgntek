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
  public n_correo: string;
  public n_cc: string;
  public estudiante: estudiante = null;
  public name: string;
  public id: string;
  public lastname: string;
  public correo: string;
  public cc: string;

  constructor(private fireService: FireService) {
    this.estudiantes = [];
    this.nuevo_estudiante = '';
    this.getEstudiante();
    this.name = '';
    this.id = '';
    this.n_correo = '';
    this.n_cc = '';
    this.n_lastname = '';
    this.lastname = '';
    this.correo = '';
    this.cc = '';
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
      correo: this.n_correo,
      cc: this.n_cc
    };
    this.fireService.post(estudiante, estudiante.id).then(resp => {
      this.nuevo_estudiante = '';
      this.n_lastname = '';
      this.n_correo = '';
      this.n_cc = '';
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
    this.correo = item.correo;
    this.cc = item.cc;
    this.id = item.id;
  }

  // Actualizar
  actualizarEstudiante() {
    let estudiante: estudiante = {
      name: this.name,
      lastname: this.lastname,
      correo: this.correo,
      cc: this.cc,
      id: this.id
    };
    this.fireService.post(estudiante, estudiante.id);
    this.nuevo_estudiante = '';
    this.n_lastname = '';
    this.n_correo = '';
    this.n_cc = '';
  }
  crearNota(){
  }
}
