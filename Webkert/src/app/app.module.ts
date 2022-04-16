import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {IndexModule} from './routes/index/index.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {AngularFireModule} from '@angular/fire/compat';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getStorage, provideStorage} from '@angular/fire/storage';
import {environment} from '../environments/environment';
import {DBConfig, NgxIndexedDBModule} from 'ngx-indexed-db';

const dbConfig: DBConfig = {
  name: 'PCBuilder',
  version: 1,
  objectStoresMeta: [{
    store: 'builds',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      {name: 'build_name', keypath: 'build_name', options: { unique: false }},
      {name: 'products', keypath: 'products', options: { unique: false }},
      {name: 'total_price', keypath: 'total_price', options: { unique: false }},
      {name: 'total_wattage', keypath: 'total_wattage', options: { unique: false }},
      {name: 'modify_time', keypath: 'modify_time', options: { unique: false }},
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    IndexModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxIndexedDBModule.forRoot(dbConfig),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
