import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private afs:AngularFirestore) { }

  afficherPatients(){
    this.afs.collection('patients').snapshotChanges();
  }

  ajouterPatients(patient){
    this.afs.collection('patients').add(patient);
  }

  modifierPatients(patient,id){
    this.afs.collection('patients').doc(id).update(patient);
  }

  supprimerPatients(id){
    this.afs.collection('patients').doc(id).delete();
  }
}
