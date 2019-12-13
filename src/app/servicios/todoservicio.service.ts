import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';
import { note } from '../modelo/note';

@Injectable({
  providedIn: 'root'
})
export class TodoservicioService {
  myCollection: AngularFirestoreCollection;
  constructor(private fireStone: AngularFirestore) {
    this.myCollection = fireStone.collection<any>(environment.firebaseConfig.collection);
  }
  readTODO(): Observable<firebase.firestore.QuerySnapshot> {
    return this.myCollection.get();
  }
  readTODObyID(id: string): Observable<firebase.firestore.DocumentSnapshot> {
    return this.myCollection.doc(id).get();
  }
  addTODO(myNote: note): Promise<firebase.firestore.DocumentReference> {
    return this.myCollection.add(myNote);
  }
  updateTODO(id: string, data: note): Promise<void> {
    return this.myCollection.doc(id).set(data);
  }
  removeTODO(id: string): Promise<void> {
    return this.myCollection.doc(id).delete();
  }
  /**
   * TAREA: read note where...
   */
  readTODOByCriteria() { }

  readTODO2(timer: number = 10000): Observable<note[]> {
    return new Observable((observer) => {
      //observer.next observer.error observer.complete()
      let subcripcion: Subscription;
      let tempo = setTimeout(() => {
      subcripcion.unsubscribe();
      observer.error("Timeout");
      }, timer);
      subcripcion = this.readTODO().subscribe((lista) => {
        clearTimeout(tempo);
        let listado=[];
        lista.docs.forEach((nota) => {
          listado.push({ id: nota.id, ...nota.data() });
        });
        observer.next(listado);
        observer.complete();
      })
    });
  }
}
