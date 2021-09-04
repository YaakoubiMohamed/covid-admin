import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from '../classes/article';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[];

  constructor(private articleservice:ArticleService, private afs:AngularFirestore, private router:Router) { }

  ngOnInit(): void {
    /*
    this.articleservice.afficherArticles().subscribe(data =>{
      this.articles = data.map(item => {
        let uid = item.payload.doc.uid;
        let data = item.payload.doc.data;
        return { uid, ...(data as {})} as Article;
      });
    })
    */

    this.afs.collection('articles').snapshotChanges().subscribe(admin => {
      this.articles = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Article;
      });
      console.log(this.articles);           
    });
  }

  supp(id){
    this.articleservice.supprimerArticles(id);
  }

  Afficher(article)
  {
    localStorage.setItem('article',JSON.stringify(article));
    this.router.navigate(['/afficher-articles']);
  }
  modifier(article)
  {
    localStorage.setItem('article',JSON.stringify(article));
    this.router.navigate(['/modifier-articles']);
  }

}
