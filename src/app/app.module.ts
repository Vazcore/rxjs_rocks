import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule  } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { WikiService } from './wiki.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WhoToFollowComponent } from './who-to-follow/who-to-follow.component';
import { ThrottleComponent } from './throttle/throttle.component';
import { SmartSearchComponent } from './smart-search/smart-search.component';
import { CustomOperatorsComponent } from './custom-operators/custom-operators.component';
import { RunningTextComponent } from './running-text/running-text.component';
import { RunningComponent } from './running/running.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WhoToFollowComponent,
    ThrottleComponent,
    SmartSearchComponent,
    CustomOperatorsComponent,
    RunningTextComponent,
    RunningComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'follow_up', component: WhoToFollowComponent },
      { path: 'throttle', component: ThrottleComponent },
      { path: 'smart_search', component: SmartSearchComponent },
      { path: 'custom_operators', component: CustomOperatorsComponent },
      { path: 'running_text', component: RunningComponent }
    ])
  ],
  providers: [
    WikiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
