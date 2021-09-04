import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Contact } from './../classes/contact';
import { Article } from './../classes/article';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  patients: User[];
  contacts: Contact[];
  articles: Article[];
  nbpatients: number;
  nbarticles: number;
  nbcontacts: number;
  nbnegatif: number;
  nbpositif: number;
  dates: any[] = [];
  i: number;
  positive: any[] = [];
  posliste: any[] = [];
  negative: any[] = [];
  negaliste: any[] = [];
  j: number;
  k: any;


 

  constructor(private afs:AngularFirestore,) { }

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['January','February','March','April','May','June','July ','August','September','October','November','December',];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: this.posliste, label: 'Positive' },
    { data: this.negaliste, label: 'Negative' }
  ];

  ngOnInit(): void {
    this.articlesListe();
    this.contactListe();
    this.patientListe();
  }

  patientListe(){
    this.afs.collection('patients').snapshotChanges().subscribe(admin => {
      this.patients = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as User;
      });
      this.nbpatients = this.patients.length;
      this.i = 0;
      this.patients.forEach(element => {
        //console.log('createdAt',element.createdAt);
          this.nbnegatif = this.nbnegatif + 1;
          this.dates[this.i] = element.createdAt;
          this.i++;
        });
        this.i =0;
      while(this.i < 12){      
        this.j=0;  
        this.patients.forEach(element => {
          let date = element.createdAt;
          let pos = date.substring(date.indexOf('/')+1, date.lastIndexOf('/'));
          //console.log(pos,i+1);
          if((Number(pos) == this.i+1) && (element.etat == 'positive'))
          {
            this.j++;
            this.positive[this.i]=this.j;   
            //console.log(pos,this.i+1,this.positive[this.i],this.j);         
          }
          
        });
        if(this.positive[this.i] == undefined){
          this.posliste[this.i] = 0;
        }
        else if(this.positive[this.i] != undefined){
          this.posliste[this.i] = this.positive[this.i];
        }
        this.i++;
        //console.log(this.posliste);
      }
      this.i =0;
      while(this.i < 12){      
        this.k=0;  
        this.patients.forEach(element => {
          let date = element.updatedAt;
          let pos = date.substring(date.indexOf('/')+1, date.lastIndexOf('/'));
          //console.log(pos,i+1);
          if((Number(pos) == this.i+1) && (element.etat == 'negative'))
          {
            this.k++;
            this.negative[this.i]=this.k;   
            console.log(pos,this.i+1,this.negative[this.i],this.k);         
          }
          
        });
        if(this.negative[this.i] == undefined){
          this.negaliste[this.i] = 0;
        }
        else if(this.negative[this.i] != undefined){
          this.negaliste[this.i] = this.negative[this.i];
        }
        this.i++;
        console.log(this.negaliste);
      }


      
      
      this.nbpositif = this.patients.filter(item => {
        return item.etat == 'positive';
      }).length;
      this.nbnegatif = this.patients.filter(item => {
        return item.etat == 'negative';
      }).length;
      console.log(this.patients.length);           
    });
  }
  articlesListe(){
    this.afs.collection('articles').snapshotChanges().subscribe(admin => {
      this.articles = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Article;
      });
      this.nbarticles = this.articles.length;
      console.log(this.articles.length);           
    });
  }
  contactListe(){
    this.afs.collection('contacts').snapshotChanges().subscribe(admin => {
      this.contacts = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Contact;
      });
      this.nbcontacts = this.contacts.length;
      console.log(this.contacts.length);           
    });
  }
}
