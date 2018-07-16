import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NewPage } from '../new/new';
import { RestProvider } from '../../providers/rest/rest';
import { ExitPage } from '../exit/exit';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { OptionsPage } from '../options/options';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  private myphoto: string = "";
  img: any;
  private pin: string;
  nombre: string;
  apellidos: string;
  plate: string = "";
  cone: string;
  no_house: string;
  subject: string;    // Variable asunto
  street: string;     // Varaible calle
  streets: any;       // Arreglo de calles
  subjects: any;     // Arreglo de asuntos
  personal_data: any; // Arreglo de datos personles
  hiden_input = [];
  i: number = 0;
  selectOptions: any;
  bluemac: string = "98:D3:31:F7:27:F7";
  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, public provider: RestProvider,
    public loading: LoadingController, public alertCtrl: AlertController, private bluetoothserial: BluetoothSerial) {
    while (this.i < 9) {
      this.hiden_input[this.i] = true;
      this.i += 1;
    }
    this.pin = this.navParams.get('pin');
    this.nombre = this.navParams.get('nombre');
    this.apellidos = this.navParams.get('apellidos');
    this.plate = this.navParams.get('plate');
    this.subjects = [];
    this.streets = [];
    this.selectOptions = {
      title: '',
      subTitle: '',
      mode: 'md'
    };
    this.provider.getSubjects().subscribe(data => {
      this.subjects = data;
    });
    this.provider.getStreets().subscribe(data => {
      this.streets = data;
    });
  }
  doBack() {
    this.navCtrl.push(HomePage);
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
        this.bluetoothserial.write('1').then((success) => {
          //alert(JSON.stringify(success));
        }, (failure) => {
          alert(JSON.stringify(failure));
        });
      },(error=>{
        this.bluetoothserial.connectInsecure(this.bluemac).subscribe(result =>{
          //alert("Connected");
          this.bluetoothserial.write('1').then((success) => {
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
  SendOff() {
    
    this.bluetoothserial.isEnabled().then((result)=>{
      //alert("Enabled");
      this.bluetoothserial.isConnected().then((result)=>{
        this.bluetoothserial.write('0').then((success) => {
          //alert(JSON.stringify(success));
        }, (failure) => {
          alert(JSON.stringify(failure));
        });
      },(error=>{
        this.bluetoothserial.connectInsecure(this.bluemac).subscribe(result =>{
          //alert("Connected");
          this.bluetoothserial.write('0').then((success) => {
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
        this.SendOff();
      });
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  ToNewPage() {
    this.provider.getId(this.pin).subscribe((personal_data) => {
      if (personal_data.length == 0 || this.pin == undefined || this.pin.split(" ").join("") == "") {
        //alert("No existen coincidencias.");
        this.navCtrl.push(NewPage);
      } else {
        this.navCtrl.push(OptionsPage, { options: personal_data });
      }
    }, (error) => {
      let messaje = "";
      if (error.status == 0) {
        messaje = "Sin Internet";
      }
      else {
        messaje = error.status;
      }
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: '',
        message: '<BR><H3>' + messaje + '</H3>',
        buttons: ['ACEPTAR']
      });
      alert.present();
    });
  }
  checkDom() {
    if (this.street != null && this.no_house != null) {
      this.provider.CkeckRegister(this.street, this.no_house).subscribe((result) => {
        if (!result.success) {
          let alert = this.alertCtrl.create({
            title: 'Aviso!',
            subTitle: '',
            message: '<BR><H3>' + result.message + '</H3>',
            buttons: ['ACEPTAR']
          });
          alert.present();
        }
      }, (error) => {
        console.log(error);
        if (error.status == 404) {

        } else if (error.status != 401 && error.status != 404) {

        } else if (error.status == 0) {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: '',
            message: '<BR><H3>Sin conexión a Internet</H3>',
            buttons: ['ACEPTAR']
          });
          alert.present();
        } else {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: '',
            message: '<BR><H3>' + error.status + '</H3>',
            buttons: ['ACEPTAR']
          });
          alert.present();
        }
      });
    }
  }
  toUpperPIN(input) {
    this.pin = input.toUpperCase();
  }
  toUpperPlante(input) {
    this.plate = input.toUpperCase();
  }
  DeleteFoto() {
    this.myphoto = "";
    document.getElementById("cancel-button").setAttribute("style", "text-align: center; display: none");
    document.getElementById("photo-button").setAttribute("style", "text-align: center; display: block");
  }
  Validate() {
    var pass = true;
    if (this.pin == undefined || this.pin == "") {
      this.hiden_input[0] = false;
      pass = false;
    } else {
      this.hiden_input[0] = true;
    }
    if (this.nombre == undefined || this.nombre == "") {
      this.hiden_input[1] = false;
      pass = false;
    } else {
      this.hiden_input[1] = true;
    }
    if (this.apellidos == undefined || this.apellidos == "") {
      this.hiden_input[2] = false;
      pass = false;
    } else {
      this.hiden_input[2] = true;
    }
    if (this.subject == undefined || this.subject == "") {
      this.hiden_input[3] = false;
      pass = false;
    } else {
      this.hiden_input[3] = true;
    }
    if ((this.plate == undefined || this.plate == "") && (this.cone == undefined || this.cone == "")) {
      this.hiden_input[4] = false;
      pass = false;
    } else {
      this.hiden_input[4] = true;
    }
    if ((this.cone == undefined || this.cone == "") && (this.plate == undefined || this.plate == "")) {
      this.hiden_input[5] = false;
      pass = false;
    } else {
      this.hiden_input[5] = true;
    }
    if (this.street == undefined || this.street == "") {
      this.hiden_input[6] = false;
      pass = false;
    } else {
      this.hiden_input[6] = true;
    }
    if (this.no_house == undefined || this.no_house == "") {
      this.hiden_input[7] = false;
      pass = false;
    } else {
      this.hiden_input[7] = true;
    }
    /*
    if (this.myphoto == undefined || this.myphoto == "") {
      this.hiden_input[8] = false;
      pass = false;
    } else {
      this.hiden_input[8] = true;
    }
    */
    if (pass) {
      this.RegistrarVisita();
    }
  }
  TomarFoto() {
    document.getElementById("cancel-button").setAttribute("style", "text-align: center; display: block");
    document.getElementById("photo-button").setAttribute("style", "text-align: center; display: none");

    const options: CameraOptions = {
      cameraDirection: 1,
      correctOrientation: false,
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      this.DeleteFoto();
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: '',
        message: '<BR><H3>No se pudo acceder a la cámara</H3>',
        buttons: ['ACEPTAR']
      });
      alert.present();
      console.log(this.myphoto);
    });
  }
  RotateFoto() {
    let img = document.getElementById("reg-myphoto") as HTMLImageElement;
    if (img.naturalWidth < img.naturalHeight) {
      document.getElementById("reg-myphoto").removeAttribute("style");
      document.getElementById("reg-myphoto").setAttribute("style", "transform:rotate(270deg); width: 70%; margin-left: auto;margin-right: auto;");

    } else {
      document.getElementById("reg-myphoto").removeAttribute("style");
      document.getElementById("reg-myphoto").setAttribute("style", "transform:rotate(00deg); width: 70%; margin-left: auto;margin-right: auto;");
      //alert(img.naturalWidth + ":" + img.naturalHeight);
    }
  }
  RegistrarVisita() {

    //alert(this.subject + "   " + this.street + "   " + this.nombre+ "   " + this.apellidos + "   " + this.plate + "   " + this.cone    + "   " + this.no_house);
    let message = "Registrando...";
    let loader = this.loading.create({
      content: message
    });
    loader.present();

    this.plate = this.plate.toUpperCase();
    var data = new FormData();
    data.append("Pin", this.pin);
    data.append("Plate", this.plate);
    data.append("Cone", this.cone);
    data.append("IdStreet", this.street);
    data.append("NumberHouse", this.no_house);
    data.append("IdSubject", this.subject);

    /*
    var blob = new Blob([this.myphoto], { type: "image/jpeg" });
    data.append("file", blob, "foto.jpg");
    */

    this.provider.addRegister(data).subscribe((data) => {
      loader.dismiss();
      if (data.success) {
        //this.navCtrl.push(ExitPage);
        this.SendOn();
        this.navCtrl.push(RegisterPage);
      } else {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: '',
          message: '<BR><H3>' + data.message + '</H3>',
          buttons: ['ACEPTAR']
        });
        alert.present();
        this.navCtrl.push(RegisterPage);
      }
    }, (error) => {
      loader.dismiss();
      console.log(error);
      if (error.status == 404) {

      }
      else if (error.status != 401 && error.status != 404) {

      }
      else if (error.status == 0) {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: '',
          message: '<BR><H3>Sin conexión a Internet</H3>',
          buttons: ['ACEPTAR']
        });
        alert.present();
      } else {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: '',
          message: '<BR><H3>' + error.status + '</H3>',
          buttons: ['ACEPTAR']
        });
        alert.present();
      }
    });
  }
}
