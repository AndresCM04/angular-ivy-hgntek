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
  public n_celular: string;
  public n_cc: string;
  public estudiante: estudiante = null;
  public name: string;
  public id: string;
  public lastname: string;
  public celular: string;
  public cc: string;
  public my_notes = [
    { id: 1, title: 'Agregar nota', description: 'Primer corte' },
    { id: 2, title: 'Agregar nota', description: 'Segundo corte' },
    { id: 3, title: 'Agregar nota', description: 'Tercer corte' }
  ];

  constructor(private fireService: FireService) {
    this.estudiantes = [];
    this.nuevo_estudiante = '';
    this.getEstudiante();
    this.name = '';
    this.id = '';
    this.n_celular = '';
    this.n_cc = '';
    this.n_lastname = '';
    this.lastname = '';
    this.celular = '';
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
      celular: this.n_celular,
      cc: this.n_cc
    };
    this.fireService.post(estudiante, estudiante.id).then(resp => {
      this.nuevo_estudiante = '';
      this.n_lastname = '';
      this.n_celular = '';
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
    this.celular = item.celular;
    this.cc = item.cc;
    this.id = item.id;
  }

  // Actualizar
  actualizarEstudiante() {
    let estudiante: estudiante = {
      name: this.name,
      lastname: this.lastname,
      celular: this.celular,
      cc: this.cc,
      id: this.id
    };
    this.fireService.post(estudiante, estudiante.id);
    this.nuevo_estudiante = '';
    this.name = '';
    this.n_lastname = '';
    this.lastname = '';
    this.n_celular = '';
    this.celular = '';
    this.n_cc = '';
    this.cc = '';
    this.id = '';
  }
  nota = { id: null, title: null, description: null };
  show_form = false;
  editar = false;
  agregarNota() {
    this.show_form = true;
  }
  verNota(nota) {
    this.editar =false;
    this.nota = nota;
    this.show_form = true;
  }
  cancelar() {
    this.show_form = false;
  }
  eliminar() {
    var me = this;
    this.my_notes.forEach(function(el, i) {
      if (el == me.nota) {
        me.my_notes.splice(i, 1);
      }
    });
    this.show_form = false;
    this.nota = { id: null, title: null, description: null };
  }
  crearNota() {
    if (this.editar) {
      var me = this;
      this.my_notes.forEach(function(el, i) {
        if (el.id === me.nota.id) {
          me.my_notes[i] = me.nota;
        }
      });
      me.show_form = false;
    } else {
      this.nota.id = Date.now();
      this.my_notes.push(this.nota);
      this.show_form = false;
      this.nota = { id: null, title: null, description: null };
    }
  }
}
