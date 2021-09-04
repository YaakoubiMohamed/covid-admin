import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Contact } from '../../classes/contact';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  contacts: Contact[];

  constructor(private afs:AngularFirestore,) { }

  ngOnInit(): void {
    this.afs.collection('contacts').snapshotChanges().subscribe(admin => {
      this.contacts = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Contact;
      });
      console.log(this.contacts);           
    });
  }

}
