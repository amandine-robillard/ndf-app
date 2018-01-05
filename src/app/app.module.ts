import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';

import { MyApp } from './app.component';
import { AuthentificationProvider } from '../providers/authentification/authentification';
import { ApiProvider } from '../providers/api/api';
import { LignesProvider } from '../providers/lignes/lignes';
import { MediaProvider } from '../providers/media/media';
import { NotesProvider } from '../providers/notes/notes';
import { TypeNoteProvider } from '../providers/type-note/type-note';

import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
		HttpModule,
    IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthentificationProvider,
    ApiProvider,
    LignesProvider,
    MediaProvider,
    NotesProvider,
    TypeNoteProvider,
		NativePageTransitions,
		Camera,
		FileTransfer
  ]
})
export class AppModule {}
