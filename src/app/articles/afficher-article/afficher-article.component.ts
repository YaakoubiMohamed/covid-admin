import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-afficher-article',
  templateUrl: './afficher-article.component.html',
  styleUrls: ['./afficher-article.component.css']
})
export class AfficherArticleComponent implements OnInit {
  article: any;

  constructor() { }

  ngOnInit(): void {
    this.article = JSON.parse(localStorage.getItem('article'));
  }

}
