import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'app-running-text',
  templateUrl: './running-text.component.html',
  styleUrls: ['./running-text.component.css']
})
export class RunningTextComponent implements OnInit, OnDestroy {
  @Input('text') text: String;
  @ViewChild('dashboard') dashboard;
  @ViewChild('text_container') text_container;
  letters: Array<any> = [];
  mouseMoveStream: any;
  mouseMoveSubscription: any;
  constructor() {}

  ngOnInit() {
    
    this.mouseMoveStream = Observable.fromEvent<MouseEvent>(this.dashboard.nativeElement, 'mousemove')
    .map(event => {
      let offset = this.calculateOffset();
      return {
        offsetX: event.clientX - offset.left,
        offsetY: event.clientY - offset.top
      };
    })
    .flatMap(delta => {
      let letters = this.text.split('').map((letter, index) => {
        return { letter, delta, index };
      });
      return Observable.from(letters);
    })
    .flatMap(config => {
      return Observable.timer(config.index * 100)
      .map(() => {
        return {
          text: config.letter,
          top: config.delta.offsetY + 'px',
          left: config.delta.offsetX + config.index * 20 + 15 + 'px',
          index: config.index 
        };
      });
    });
    this.mouseMoveSubscription = this.mouseMoveStream.subscribe(letter => {
      this.letters[letter.index] = letter;
    }); 

  }

  ngOnDestroy() {
    this.mouseMoveSubscription.unsubscribe();
  }

  calculateOffset() {
    let {offsetLeft: left, offsetTop: top} = this.text_container.nativeElement;
    return {left, top};
  }

}
