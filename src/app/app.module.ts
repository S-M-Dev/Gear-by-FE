import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { UserInfoService } from './core/services/user-info.service';
import { User } from './core/models/user.model';

export function initializeApp(userInfoService: UserInfoService): () => Promise<User | void> {
  return () => {
    if (userInfoService.getToken()) {
      return userInfoService.fetchUserInfo().toPromise();
    }

    return Promise.resolve();
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [UserInfoService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
