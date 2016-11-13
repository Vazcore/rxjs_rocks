import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-who-to-follow',
  templateUrl: './who-to-follow.component.html',
  styleUrls: ['./who-to-follow.component.css']
})
export class WhoToFollowComponent implements OnInit {

  url: string = 'https://api.github.com/users';
  requestOnStartStream: Observable<string>; 
  requestStream: any;
  responseStream: any;
  requestOnRefreshStream: any;
  users: Array<any> = [];
  suggetstions: Array<Observable<any>> = [];
  closeSubjects: Array<Subject<any>> = [];
  @ViewChild('refreshBtn') refreshBtn: ElementRef;

  constructor(private http: Http) {}

  ngOnInit() {

    this.requestOnStartStream = Observable.of(this.url);

    // #1

    // this.responseStream = this.requestStream
    // .map(url => { 
    //   return this.http.get(url)
    //             .map(response => response.json()); 
    // })     
    // .subscribe(obsResults => {
    //   obsResults.subscribe(users => {
    //     this.users = users;
    //   })
    // });
    
    let refreshClickStream = Observable.fromEvent(this.refreshBtn.nativeElement, 'click');

    this.requestOnRefreshStream = refreshClickStream
    .map(() => {
      let offset = Math.floor(Math.random() * 500);
      return this.url + '?since=' + offset;
    });

    this.requestStream = Observable.merge(this.requestOnStartStream, this.requestOnRefreshStream);
    
    this.responseStream = this.requestStream
      .flatMap(url => this.http.get(url))
      .map(response => response.json());

    // #2

    // this.suggetstions[0] = this.responseStream
    // .map(function(listUsers) {    
    //   return listUsers[Math.floor(Math.random()*listUsers.length)];
    // }).subscribe(user => {
    //   this.users[0] = user;
    // });

    // this.suggetstions[1] = this.responseStream
    // .map(function(listUsers) {    
    //   return listUsers[Math.floor(Math.random()*listUsers.length)];
    // }).subscribe(user => {
    //   this.users[1] = user;
    // });

    this.createSuggestion(); // Stream suggestion 1
    this.createSuggestion(); // Stream suggestion 2
  }

  createSuggestion() {
    let closeSubject = new Subject<any>();
    this.closeSubjects.push(closeSubject);
    let index = this.closeSubjects.length - 1;
    
    let suggestion = closeSubject.startWith('start')
    .combineLatest( 
      this.responseStream, 
      (click, users) => {
        let userList = Array.apply(this, users);        
        return userList[Math.floor(Math.random()*userList.length)];
      }
    );
    
    this.suggetstions.push(suggestion);

    suggestion.subscribe(user => {
      this.users[index] = user;
    });
  }

  closeSuggestion(index) {
    if (this.closeSubjects[index]) {
      this.closeSubjects[index].next('next');
    } 
  }

}
