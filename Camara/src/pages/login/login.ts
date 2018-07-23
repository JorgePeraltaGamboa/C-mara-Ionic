import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RestProvider } from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  hiden_input = [];
  i: number = 0;
  username: string = "";
  passwd: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public provider: RestProvider,
    public alertCtrl: AlertController) {
    while (this.i < 4) {
      this.hiden_input[this.i] = true;
      this.i += 1;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  ToSettings() {
    this.navCtrl.push(SettingsPage);
  }
  Validate() {
    var pass: boolean = true;
    if (this.username == undefined || this.username == "") {
      this.hiden_input[0] = false;
      pass = false;
    } else {
      this.hiden_input[0] = true;
    }
    if (this.passwd == undefined || this.passwd == "") {
      this.hiden_input[1] = false;
      pass = false;
    } else {
      this.hiden_input[1] = true;
    }
    if (pass) {
      this.Autenthicate();
    }
  }
  Autenthicate() {
    this.hiden_input[2] = true;
    this.provider.AuthenticateLogin(this.username, this.passwd).subscribe((data) => {
      if (data.success) {
        this.ToSettings();
      } else {
        if (data.message.toString() == "Usuario sin Privilegios") {
          this.hiden_input[3] = false;
        }else if (data.message.toString() == "Acceso denegado") {
          this.hiden_input[2] = false;
          this.username = "";
          this.passwd = "";
        }
        let alertAutFailed = this.alertCtrl.create({
          title: 'Mensaje',
          message: '<br><h3>' + data.message + '</h3>',
          buttons: ['Aceptar']
        });
        alertAutFailed.present();
      }
    });
  }

}
