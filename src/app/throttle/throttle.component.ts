import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/bufferWhen';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-throttle',
  templateUrl: './throttle.component.html',
  styleUrls: ['./throttle.component.css']
})
export class ThrottleComponent implements OnInit {
  
  multipple_clicks: Array<number> = [];
  @ViewChild('clickBtn') clickBtn: ElementRef;
  click$: Observable<Event>;

  constructor() {
  }

  ngOnInit() {
    this.click$ = Observable.fromEvent(this.clickBtn.nativeElement, 'click')
    
    //  this.click$
    //  .delay(1000)
    //  .subscribe(v => console.log(v));
    
    this.click$.bufferWhen(() => this.click$.debounceTime(300))    
    .map(clicks => clicks.length)
    .filter(count => count >= 2)
    .subscribe(count => {
      this.multipple_clicks.push(count);
    });
  }

}

