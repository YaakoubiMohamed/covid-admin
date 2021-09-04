import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private afs:AngularFirestore) { }

  afficherArticles(){
    this.afs.collection('articles').snapshotChanges();
  }

  ajouterArticles(article){
    this.afs.collection('articles').add(article);
  }

  modifierArticles(article,id){
    this.afs.collection('articles').doc(id).update(article);
  }

  supprimerArticles(id){
    this.afs.collection('articles').doc(id).delete();
  }
}
