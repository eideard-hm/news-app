import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/news.interface';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input() article: Article;
  @Input() i: number;

  constructor() { }

  ngOnInit() {}

}
