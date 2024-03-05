import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private store: AngularFirestore) {}

  loadData() {
    return this.store
      .collection('catergories')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((load) => {
            const data: any = load.payload.doc.data();
            const id = load.payload.doc.id;
            return { data, id };
          });
        })
      );
  }
}
