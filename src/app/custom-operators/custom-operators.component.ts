import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-custom-operators',
  templateUrl: './custom-operators.component.html',
  styleUrls: ['./custom-operators.component.css']
})
export class CustomOperatorsComponent implements OnInit {

  constructor() { }

  // createSequenceObserver(...params: Array<number>): Observable<number> {
  //   return Observable.create((observer) => {
  //     for (let number of params) {
  //       observer.next(number);
  //     }
  //     observer.complete();
  //   });
  // }
  
  ngOnInit() {

    let numberStream = Observable.of(1,2,3,4,5)
    .subscribe(el => console.log(el)); 
    

    // function multiplyBy(multiplier) {
    //   let source = this;
    //   let result = Observable.create(observer => {
    //     source.subscribe(
    //       x => observer.next(x * multiplier),
    //       err => observer.error(err),
    //       () => observer.complete()
    //     );
    //   });
    //   return result;
    // }    
    // Observable.prototype.multiplyBy = multiplyBy;
    
    // let multipliedStream = numberStreams.multiplyBy(10);

    // function multiplyBy(source, multiplier) {
    //   let result = Observable.create(observer => {
    //     source.subscribe(
    //       x => observer.next(x * multiplier),
    //       err => observer.error(err),
    //       () => observer.complete()
    //     );
    //   });
    //   return result;
    // }    
    
    // let multipliedStream = multiplyBy(numberStreams, 10);
    // multipliedStream.subscribe(x => console.log(x));


  }

}
