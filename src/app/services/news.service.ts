import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Article, News } from '../interfaces/news.interface';

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  params = new HttpParams()
    .set('country', 'us')
    .set('category', 'business')
    .set('apiKey', apiKey);

  private urlApi = 'https://newsapi.org/v2';
  constructor(private http: HttpClient) {}

  getTopHeadlines(): Observable<Article[]> {
    const url = `${this.urlApi}/top-headlines`;
    return this.http
      .get<News>(url, { params: this.params })
      .pipe(map(({ articles }) => articles));
  }
}
