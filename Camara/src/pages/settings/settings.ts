import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalStorageService } from 'angular-2-local-storage';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  bluestate: boolean;
  device: string;
  devices: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private bluetoothserial: BluetoothSerial,
    private _localStorage: LocalStorageService) {
    if (this._localStorage.get("bluetooth") == 'true') {
      this.bluestate = this._localStorage.get('bluetooth') == 'true';
    } else {
      this.bluestate = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  
  changeBluetooth() {
    if (this.bluestate) {
      this._localStorage.set("bluetooth", "true");
      this.bluetoothserial.list().then(success => {
        this.devices = success;
      }, error => {
        alert(JSON.stringify(error));
      });
    } else {
      this._localStorage.set("bluetooth", "false");
    }
  }
}
