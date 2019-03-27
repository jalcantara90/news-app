import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { ResponseTopHeadLines, Article } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

  private newsSubscription: Subscription = new Subscription();
  public news: Article[] = [];
  constructor( private newsService: NewsService ) {}

  ngOnInit(): void {
    this.loadNews();
  }

  ngOnDestroy(): void {
    this.newsSubscription.unsubscribe();
  }

  loadNews( event? ) {

    this.newsSubscription = this.newsService.getTopHeadLines()
      .subscribe(
        ( res: ResponseTopHeadLines ) => {

          if ( !res.articles.length ) {
            event.target.disabled = true;
            event.target.complete();
            return;
          }

          this.news.push(...res.articles);

          if ( event ) {
            event.target.complete();
          }
        }
      );
  }

  loadData( event ) {
    this.loadNews( event );
  }
}
