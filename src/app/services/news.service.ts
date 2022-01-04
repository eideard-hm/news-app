import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Article, News } from '../interfaces/news.interface';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  params = new HttpParams()
    .set('country', 'us')
    .set('category', 'business')
    .set('apiKey', apiKey);

  constructor(private http: HttpClient) {}

  private executeQuery<T>(query: string, category: string = 'business') {
    return this.http.get<T>(`${apiUrl}${query}`, {
      params: {
        apiKey,
        country: 'us',
        category,
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  getTopHeadlines(): Observable<Article[]> {
    return this.executeQuery<News>('/top-headlines', 'business').pipe(
      map(({ articles }) => articles)
    );
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  getTopHeadlinesByCategory(category: string): Observable<Article[]> {
    return this.executeQuery('/top-headlines', category).pipe(
      map(({ articles }) => articles)
    );
  }
}
