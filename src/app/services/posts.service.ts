import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat/app';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private store: AngularFirestore) {}

  loadFeatured() {
    return this.store
      .collection('posts', (ref) =>
        ref.where('isFeatured', '==', true).limit(4)
      )
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

  loadLatest() {
    return this.store
      .collection('posts', (ref) => ref.orderBy('createAt'))
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

  loadCategoryPosts(categoryId: any) {
    return this.store
      .collection('posts', (ref) =>
        ref.where('category.categoryId', '==', categoryId)
      )
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

  loadSinglePost(postId: any) {
    return this.store.doc(`posts/${postId}`).valueChanges();
  }

  countViews(postId: string) {
    const viewsCount = {
      views: firebase.default.firestore.FieldValue.increment(1),
    };
    this.store
      .doc(`posts/${postId}`)
      .update(viewsCount)
      .then(() => {});
  }
}
