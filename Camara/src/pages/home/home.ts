import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { ExitPage } from '../exit/exit';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  //myphoto:any;
  constructor(public navCtrl: NavController, public platform: Platform) {
    this.platform.registerBackButtonAction(()=>{
      
    });
  }
  ToNewPage(){
    this.navCtrl.push(RegisterPage);    
  }
  ToExitPage(){
    this.navCtrl.push(ExitPage);
  }
  ToLogin(){
    this.navCtrl.push(LoginPage);
  }  
}
