import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { estudiante } from './estudiantes';

@Injectable()
export class FireService {
  /************
   * VARIABLES QUE REPRESENTAN LAS
   * COLECCIONES DE LA BD
   ************/
  private COLLECT_STUDENTS: string = 'estudiante';

  /******
   * ATRIBUTOS
   *****/
  private studentsCollection: AngularFirestoreCollection<estudiante>;

  constructor(private db: AngularFirestore) {
    //Inicializa el objeto studentsCollection
    this.studentsCollection = this.db.collection<estudiante>(this.COLLECT_STUDENTS);
  }

  //Metodo para obtener todos los libros
  get() {
    this.studentsCollection = this.db.collection<estudiante>(this.COLLECT_STUDENTS);
    //Retorna el resultado
    return this.studentsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  //Metodo para añadir un libro en la BD
  post(estudiante: estudiante, idd: string) {
    const id = idd || this.db.createId();
    const data = { id, ...estudiante };
    return this.studentsCollection.doc(id).set(data);
  }

  // Eliminar el libro de la BD
  eliminarr(item: estudiante) {
    this.studentsCollection.doc(item.id).delete();
  }
}