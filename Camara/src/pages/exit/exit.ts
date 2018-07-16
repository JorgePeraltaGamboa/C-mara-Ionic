import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
/**
 * Generated class for the ExitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exit',
  templateUrl: 'exit.html',
})
export class ExitPage {
  url: string;
  cards: any;
  cardsFull: any;
  myInput:string;
  bluemac: string = "98:D3:31:F7:27:F7";

  constructor(public navCtrl: NavController, public navParams: NavParams, public provider: RestProvider, public loading: LoadingController,
    public alertCtrl: AlertController, private bluetoothserial: BluetoothSerial) {

  }
  
  doBack(){

    this.navCtrl.push(HomePage);
  }
  filterItems(searchTerm){
    return this.cardsFull.filter((item) => {
     return (item.Plate.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||  item.Cone.indexOf(searchTerm.toLowerCase()) > -1);
     });
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ExitPage');
    let message = "Cargando...";
    let loader = this.loading.create({
      content: message
    });
    loader.present();
    this.provider.getCards().subscribe(card_data => {
      
      //this.cards = card_data;
      this.cardsFull = card_data;
      this.cards = card_data;
      this.url = "http://villasbonaterra.sistemasags.com/Content/Photos/min"
    });
    loader.dismiss();
  }
  onInput($event){
    this.cards = this.filterItems(this.myInput);
  }
  onCancel($event){
    this.cards = this.cardsFull;
  }
  SendOn() {
    /*
    this.bluetoothserial.list().then(success=>{  
      alert(JSON.stringify(success));
    }, error=>{
      alert(JSON.stringify(error));
    });
  */
    this.bluetoothserial.isEnabled().then((result)=>{
      //alert("Enabled");
      this.bluetoothserial.isConnected().then((result)=>{
        this.bluetoothserial.write('3').then((success) => {
          //alert(JSON.stringify(success));
        }, (failure) => {
          alert(JSON.stringify(failure));
        });
      },(error=>{
        this.bluetoothserial.connectInsecure(this.bluemac).subscribe(result =>{
          //alert("Connected");
          this.bluetoothserial.write('3').then((success) => {
            //alert(JSON.stringify(success));
          }, (failure) => {
            alert(JSON.stringify(failure));
          });
        },error =>{
          alert(JSON.stringify(error));
        });
      }));
    },(error)=>{
      this.bluetoothserial.enable().then(result => {
        this.SendOn();
      });
    });
  }

  ExitVisitor(id,img_url) {
    //alert(id);
    let alertExit = this.alertCtrl.create({
      title: 'Confirmar salida',
      message: '<img src="' + this.url + img_url+'">',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            // Ha respondido que no así que no hacemos nada         
            console.log('Pues nel');
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.SendOn();
            this.provider.Exit(id).subscribe(res => {
              if(res.success){
                //location.reload();
                //this.navCtrl.setRoot(this.navCtrl.getActive().component);
                this.provider.getCards().subscribe(card_data => {
                  this.cards = "";
                  this.cards = card_data;
                  this.url = "http://villasbonaterra.sistemasags.com/Content/Photos/"
                });
              }else{
                alert(res.message);
              }
            });
          }
        }
      ]
    });
    alertExit.present();
  }

}
