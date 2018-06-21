import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { ExitPage } from '../exit/exit';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  //myphoto:any;
  constructor(public navCtrl: NavController) {
  }
  ToNewPage(){
    this.navCtrl.push(RegisterPage);    
  }
  ToExitPage(){
    this.navCtrl.push(ExitPage);
  }
}
