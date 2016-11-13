import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-custom-operators',
  templateUrl: './custom-operators.component.html',
  styleUrls: ['./custom-operators.component.css']
})
export class CustomOperatorsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    let numberStreams = Observable.of(1,2,3,4,5);    

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

    function multiplyBy(source, multiplier) {
      let result = Observable.create(observer => {
        source.subscribe(
          x => observer.next(x * multiplier),
          err => observer.error(err),
          () => observer.complete()
        );
      });
      return result;
    }    
    
    let multipliedStream = multiplyBy(numberStreams, 10);
    multipliedStream.subscribe(x => console.log(x));


  }

}
