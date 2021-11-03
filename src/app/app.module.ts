import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireFunctionsModule} from '@angular/fire/functions';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AuthService} from './services/auth.service';
import firebase from 'firebase';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {userReducer} from "./stores/userStore/userReducer";
import {connectionReducer} from "./stores/connectionStore/connectionsReducer";
import { UserEffects } from './stores/userStore/userEffects';
import { ConnectionsEffects } from './stores/connectionStore/connectionsEffects';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    StoreModule.forRoot({
      user: userReducer,
      connections: connectionReducer
    }),
    EffectsModule.forRoot([UserEffects, ConnectionsEffects])
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
