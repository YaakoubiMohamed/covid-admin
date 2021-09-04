import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private afs:AngularFirestore) { }

  afficherContacts(){
    this.afs.collection('contacts').snapshotChanges();
  }

  repondreContacts(contact){
    this.afs.collection('reponses').add(contact);
  }

  reponsesListe(){
   return this.afs.collection('reponses').snapshotChanges();
  }
  

  supprimerContacts(id){
    this.afs.collection('contacts').doc(id).delete();
  }
}
