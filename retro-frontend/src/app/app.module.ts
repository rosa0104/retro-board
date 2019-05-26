import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RetroComponent} from './components/retro/retro.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';
import {BoardComponent} from './components/board/board.component';
import {RetroItemColumnComponent} from './components/retro-item-column/retro-item-column.component';
import {RetroItemComponent} from './components/retro-item/retro-item.component';
import {ActionItemComponent} from './components/action-item/action-item.component';
import {ActionItemColumnComponent} from './components/action-item-column/action-item-column.component';
import {environment} from 'src/environments/environment';
import {RetroItemFormComponent} from './components/retro-item-form/retro-item-form.component';
import {FormsModule} from '@angular/forms';
import {ActionItemFormComponent} from './components/action-item-form/action-item-form.component';
import {TokenInterceptor} from './http-outgoing.interceptor';
import {AuthServiceConfig, GoogleLoginProvider, SocialLoginModule} from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    RetroComponent,
    BoardComponent,
    RetroItemColumnComponent,
    RetroItemComponent,
    ActionItemComponent,
    ActionItemColumnComponent,
    RetroItemFormComponent,
    ActionItemFormComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    environment.production ? [] : InMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
    FormsModule
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

// Configs
export function getAuthServiceConfigs() {
  return new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('676214566646-j27ke057nn494ktol02l4f8bnkqhqmm4.apps.googleusercontent.com')
      }
    ]);
}
