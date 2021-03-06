import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { LocalStorageService } from 'angular-2-local-storage';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  bluemac: string = "98:D3:31:F7:27:F7";
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private bluetoothserial: BluetoothSerial,
    private _localStorage: LocalStorageService) {
    platform.ready().then(() => {
      if (this._localStorage.get('bluetooth') == null) {
        this._localStorage.set('bluetooth', 'false');
      } else if (this._localStorage.get('bluetooth') == 'true') {
        this.bluetoothserial.isEnabled().then((result) => {
          //alert("Enabled");
          this.Connect();
        }, (error) => {
          this.bluetoothserial.enable().then(result => { this.Connect(); });
        });
      }
      /*this.bluetoothserial.isEnabled().then((result)=>{
        //alert("Enabled");
        this.Connect();
      },(error)=>{
        this.bluetoothserial.enable().then(result =>{this.Connect();});
      });*/
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  Connect() {
    this.bluetoothserial.isConnected().then((result) => {
    }, (error => {
      this.bluetoothserial.connectInsecure(this.bluemac).subscribe(result => {
      }, error => {
        alert("Error al conectar bluetooth:" + JSON.stringify(error));
      });
    }));
  }
}

