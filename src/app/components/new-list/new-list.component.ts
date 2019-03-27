import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss'],
})
export class NewListComponent implements OnInit {

  @Input() news: Article[] = [];
  @Input() inFab: boolean = false;

  constructor() { }

  ngOnInit() {}

}
