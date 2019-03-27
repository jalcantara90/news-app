import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NewsService } from 'src/app/services/news.service';
import { Article } from 'src/app/interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {

  private newsSubscription: Subscription = new Subscription();
  @ViewChild(IonSegment) segment: IonSegment;
  public categories: string[] = [ 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology' ];
  public news: Article[] = [];

  constructor( private newsService: NewsService ) {}

  ngOnInit(): void {
    this.segment.value = this.categories[0];
    this.loadNews( this.segment.value );
  }

  ngOnDestroy(): void {
    this.newsSubscription.unsubscribe();
  }

  public changeCategory( event ) {
    this.news = [];
    this.loadNews( event.detail.value );
  }

  private loadNews( category: string, event? ) {
    this.newsSubscription = this.newsService.getTopHeadLinesByCategory( category )
      .subscribe( res => {
        if ( !res.articles.length ) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }

        this.news.push(...res.articles);

        if ( event ) {
          event.target.complete();
        }
      });
  }

  public loadData( event ) {
    this.loadNews( this.segment.value, event );
  }
}
