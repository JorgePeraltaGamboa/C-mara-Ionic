import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NewPage } from '../new/new';
import { RegisterPage } from '../register/register';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the OptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {
  options: any;
  optionsFull: any;
  url: string;
  myInput: string;
  new_date: any;
  f: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public provider: RestProvider) {
    this.options = this.navParams.get("options");
    this.optionsFull = this.navParams.get("options");
    this.url = "http://villasbonaterra.sistemasags.com/Content/Photos/min";
  }
  NavNew(Id, Name, MidleName, LastName, Plate) {
    this.navCtrl.push(RegisterPage, { pin: Id, nombre: Name, apellidos: (MidleName + " " + LastName), plate: Plate })
  }
  doBack() {
    this.navCtrl.push(RegisterPage);
  }
  filterItems(searchTerm) {
    return this.optionsFull.filter((item) => {
      return (item.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        || item.LastName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        || item.MidleName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        || this.checkDate(item.BirthDay.toString(), searchTerm.toLowerCase())
      );
    });
  }
  checkDate(fecha, searchTerm) {
    this.new_date = searchTerm.split('/');
    this.f = fecha.toString();
    this.f = this.f.replace("T00:00:00", '');
    if ((this.new_date[0] != "" && this.new_date[1] != "" && this.new_date[2] != "") && (this.f.indexOf(this.new_date[0]) > -1
      || this.f.indexOf(this.new_date[1]) > -1
      || this.f.indexOf(this.new_date[2]) > -1)) {
      return true;
    } else { return false; }
  }
  onInput($event) {
    this.options = this.filterItems(this.myInput);
  }
  onCancel($event) {
    this.options = this.optionsFull;
  }
  toNewPage() {
    this.navCtrl.push(NewPage);
  }
  increaseImage(img_url) {
    let alertExit = this.alertCtrl.create({
      title: 'Confirmar salida',
      message: '<br><img src="' + this.url + img_url + '">',
      buttons: [
        {
          text: "Cerrar",
          role: "cancel"
        }
      ]
    });
    alertExit.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
  }

}
