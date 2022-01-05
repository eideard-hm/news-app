import { NewsService } from './../../services/news.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from 'src/app/interfaces/news.interface';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  /*
    {static: true}: Para cargar el evento IonInfiniteScroll cuando el componente es inicializado
  */
  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

  public categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];
  public selectedCategory = this.categories[0];
  public articles: Article[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService
      .getTopHeadlinesByCategory(this.selectedCategory)
      .subscribe((data) => (this.articles = [...data]));
  }

  segmentChanged(category: any) {
    this.selectedCategory = category.detail.value;

    this.newsService
      .getTopHeadlinesByCategory(category.detail.value)
      .subscribe((data) => (this.articles = [...data]));
  }

  loadData() {
    this.newsService.getTopHeadlinesByCategory(this.selectedCategory, true)
    .subscribe(articles => {

      if(articles[articles.length -1].title === this.articles[this.articles.length -1].title){
        this.infiniteScroll.disabled = true;
        return;
      }

      this.articles = articles;
      this.infiniteScroll.complete();
    });

  }
}
