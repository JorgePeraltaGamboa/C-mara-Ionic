import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

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
  username: string ="";
  passwd: string ="";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    while (this.i < 2) {
      this.hiden_input[this.i] = true;
      this.i += 1;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
    alert(this.username);
    alert(this.passwd);
  }

}
