import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { Article } from 'src/app/interfaces/news.interface';
import { NewsService } from './../../services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll: IonInfiniteScroll;

  public articles: Article[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService
      .getTopHeadlines()
      .pipe(tap(console.log))
      .subscribe((data) => this.articles.push(...data));
  }

  loadData() {
    this.newsService
      .getTopHeadlinesByCategory('business', true)
      .subscribe((articles) => {
        if (
          articles[articles.length - 1].title ===
          this.articles[this.articles.length - 1].title
        ) {
          this.infiniteScroll.disabled = true;
          return;
        }

        this.articles = articles;
        this.infiniteScroll.complete();
      });
  }
}
