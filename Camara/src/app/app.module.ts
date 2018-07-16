import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewPage } from '../pages/new/new';
import { RegisterPage } from '../pages/register/register';
import { ExitPage } from '../pages/exit/exit';
import { LoginPage } from '../pages/login/login';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
//import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';
import { OptionsPage } from '../pages/options/options';

@NgModule({ 
  declarations: [
    MyApp,
    HomePage,
    NewPage,
    RegisterPage,
    ExitPage,
    LoginPage,
    OptionsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      monthNames:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
      monthShortNames: ['Ene', 'Feb', 'Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
      dayNames: ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado' ],
      dayShortNames: ['Dom', 'Lun', 'Mar','Mie','Jue','Vie','Sab'],
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewPage,
    RegisterPage,
    ExitPage,
    LoginPage,
    OptionsPage
  ],
  providers: [
    StatusBar,
    BluetoothSerial,
    Camera,
    RestProvider,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}