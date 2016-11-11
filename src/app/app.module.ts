import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WhoToFollowComponent } from './who-to-follow/who-to-follow.component';
import { ThrottleComponent } from './throttle/throttle.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WhoToFollowComponent,
    ThrottleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'follow_up', component: WhoToFollowComponent },
      { path: 'throttle', component: ThrottleComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
