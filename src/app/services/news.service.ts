import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseTopHeadLines } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private headers = new HttpHeaders({
    'X-Api-Key': environment.apiKey
  });
  private pageHeadLinesNumber = 0;
  private categorySelected = '';
  private pageCategory = 0;

  constructor( private readonly http: HttpClient ) { }

  private buildQuery<T>( query: string ): Observable<T>  {
    query = environment.apiUrl + query;
    return this.http.get<T>( query, { headers: this.headers } );
  }

  public getTopHeadLines(): Observable<ResponseTopHeadLines> {
    this.pageHeadLinesNumber++;
    return this.buildQuery<ResponseTopHeadLines>(`/top-headlines?country=us&page=${this.pageHeadLinesNumber}`);
  }

  public getTopHeadLinesByCategory( category: string ): Observable<ResponseTopHeadLines> {
    if ( this.categorySelected === category ) {
      this.pageCategory++;
    } else {
      this.pageCategory = 1;
      this.categorySelected = category;
    }

    return this.buildQuery<ResponseTopHeadLines>(`/top-headlines?country=us&category=${category}&page=${this.pageCategory}`);
  }
}
