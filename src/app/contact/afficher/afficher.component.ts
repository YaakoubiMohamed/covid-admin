import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from '../../classes/contact';
import { Reponse } from '../../classes/reponse';

@Component({
  selector: 'app-afficher',
  templateUrl: './afficher.component.html',
  styleUrls: ['./afficher.component.css']
})
export class AfficherComponent implements OnInit {
  contact: any;
  etat= false;
  reponseForm: FormGroup;
  date: Date;
  today: string;
  user: any;
  reponses: Reponse[];

  constructor(private contactservice: ContactService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.date = new Date();
      let dd = String(this.date.getDate()).padStart(2, '0');
      let mm = String(this.date.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = this.date.getFullYear();

      this.today = mm + '/' + dd + '/' + yyyy;
    this.contact = JSON.parse(localStorage.getItem('contact'));
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.contact);
    this.reponseForm = this.fb.group({
      reponse: ['', [Validators.required]],
      date: [this.today],
      email: [this.user.email],
      contact_id: [this.contact.uid],
    });
    this.reponsesListe();
  }

  show()
  {
    this.etat = true;
  }
  hide()
  {
    this.etat = false;
  }
  Repondre()
  {
    this.contactservice.repondreContacts(this.reponseForm.value);
    this.etat = false;
  }
  reponsesListe()
  {
    this.contactservice.reponsesListe().subscribe(admin => {
      this.reponses = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Reponse;
      });
      console.log(this.reponses);     
      this.reponses = this.reponses.filter(item => {
        return item.contact_id == this.contact.uid;
      });
      console.log(this.reponses);    
    });
  }

}
