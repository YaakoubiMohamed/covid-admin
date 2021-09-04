import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patients: User[];

  constructor(private patientservice:PatientService, private afs:AngularFirestore, private router:Router) { }

  ngOnInit(): void {
    /*
    this.patientservice.afficherPatients().subscribe(data =>{
      this.patients = data.map(item => {
        let uid = item.payload.doc.uid;
        let data = item.payload.doc.data;
        return { uid, ...(data as {})} as Patient;
      });
    })
    */

    this.afs.collection('patients').snapshotChanges().subscribe(admin => {
      this.patients = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as User;
      });
      console.log(this.patients);           
    });
  }

  supp(id){
    this.patientservice.supprimerPatients(id);
  }

  Afficher(patient)
  {
    localStorage.setItem('patient',JSON.stringify(patient));
    this.router.navigate(['/afficher-patients']);
  }
  modifier(patient)
  {
    localStorage.setItem('patient',JSON.stringify(patient));
    this.router.navigate(['/modifier-patients']);
  }

}
