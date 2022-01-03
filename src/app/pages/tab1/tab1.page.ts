import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Article } from 'src/app/interfaces/news.interface';
import { NewsService } from './../../services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public articles: Article[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getTopHeadlines()
    .pipe(
      tap(console.log)
    )
    .subscribe(data => this.articles.push(...data));
  }

}
