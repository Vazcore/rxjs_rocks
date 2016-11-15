import { Component, OnInit } from '@angular/core';

class Click {
  private handlers: Array<{context: any, fn: any}>;
  constructor() {
    this.handlers = [];
  }
  subscribe(fn, context?) {
    context = context || window;
    this.handlers.push({context, fn});
  }
  unsubscribe(context) {
    this.handlers = this.handlers.filter(handler => {
      if (handler.context !== context) return handler; 
    });
  }
  fire(message) {
    for (let handler of this.handlers) {
      handler.fn.call(handler.context, message);
    }
  }
}

class Observer {
  private messsages: Array<string>;
  private id;
  public subscribed: boolean = false;
  constructor(id: number) {
    this.messsages = [];
    this.id = id;
  }
  log(msg) {
    this.messsages.push(this.toString() + ':' + msg);
  }
  getMessages(): Array<string> {
    return this.messsages;
  }
  toString() {
    return "Observer #" + this.id;
  }
  getLastMessage(): string {
    return this.messsages.length > 0 ? this.messsages[this.messsages.length-1] : null;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  observer1: Observer;
  observer2: Observer;
  subject: Click;

  constructor() {
    this.subject = new Click();
    this.observer1 = new Observer(1);
    this.observer2 = new Observer(2);
  }

  ngOnInit() {}

  fireEvent(msg: string) {
    this.subject.fire(msg);
  }

  switchSubscribtion(observer: Observer) {
    observer.subscribed = !observer.subscribed;
    if (observer.subscribed) {
      this.subject.subscribe(observer.log, observer);
    } else {
      this.subject.unsubscribe(observer);
    }
  }

}
