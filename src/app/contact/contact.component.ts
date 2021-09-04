import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Contact } from '../classes/contact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Contact[];

  constructor(private contactservice:ContactService, private afs:AngularFirestore, private router:Router) { }

  ngOnInit(): void {
    /*
    this.contactservice.afficherContacts().subscribe(data =>{
      this.contacts = data.map(item => {
        let uid = item.payload.doc.uid;
        let data = item.payload.doc.data;
        return { uid, ...(data as {})} as Contact;
      });
    })
    */

    this.afs.collection('contacts').snapshotChanges().subscribe(admin => {
      this.contacts = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Contact;
      });
      console.log(this.contacts);           
    });
  }

  

  afficher(contact)
  {
    localStorage.setItem('contact',JSON.stringify(contact));
    this.router.navigate(['/afficher']);
  }
  

}
