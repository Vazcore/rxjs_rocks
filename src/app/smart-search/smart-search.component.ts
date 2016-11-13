import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { WikiService } from '../wiki.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';


@Component({
  selector: 'app-smart-search',
  templateUrl: './smart-search.component.html',
  styleUrls: ['./smart-search.component.css']
})

export class SmartSearchComponent {

  items:Array<string>;
  term$ = new Subject<string>();
  
  constructor(private wikiService:WikiService) {
    
    this.term$
        .debounceTime(500)
        .distinctUntilChanged()
        .switchMap(term => this.wikiService.search(term))
        .subscribe(results => this.items = results);
  }

}
