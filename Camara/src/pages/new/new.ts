import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';              //Uso Cámara
//import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';                        //Conector con la API
import { RestProvider } from '../../providers/rest/rest';                 //Provider
import { RegisterPage } from '../register/register';
import 'rxjs/Rx';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the NewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new',
  templateUrl: 'new.html',
})
export class NewPage {
  private myphoto: string;
  firstphoto: string;
  nombre: string;
  Apepat: string;
  Apemat: string;
  f_nac: string;
  img: any;
  fecha = [];
  hiden_input = [];
  i: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, public http: Http,
    public provider: RestProvider, public loading: LoadingController, public alertCtrl: AlertController) {

      while (this.i < 5) {
        this.hiden_input[this.i] = true;
        this.i += 1;
      }
  }
  doBack() {
    this.navCtrl.push(RegisterPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPage');

  }
  DeleteFoto() {
    this.myphoto = "";
    document.getElementById("new-cancel-button").setAttribute("style", "text-align: center; display: none");
    document.getElementById("new-photo-button").setAttribute("style", "text-align: center; display: block");
  }
  RotateFoto(){
    //var widthS = document.getElementById("new-myphoto").offsetWidth;
    let img = document.getElementById("new-myphoto") as HTMLImageElement;
    
    //var heightS = document.getElementById("new-myphoto").offsetHeight;
    
    //alert(widthS);
    //alert(heightS);
    if (img.naturalWidth < img.naturalHeight) {
      
      document.getElementById("new-myphoto").removeAttribute("style");
      document.getElementById("new-myphoto").setAttribute("style", "transform:rotate(270deg); width: 70%; margin-left: auto;margin-right: auto;");
    }else{
      document.getElementById("new-myphoto").removeAttribute("style");
      document.getElementById("new-myphoto").setAttribute("style", "transform:rotate(00deg); width: 70%; margin-left: auto;margin-right: auto;");
      //alert(img.naturalWidth + " : " + img.naturalHeight);
    }
  }
  TomarFoto() {
    //document.getElementById("new-myphoto").setAttribute("src","x"); 
    document.getElementById("new-cancel-button").setAttribute("style", "text-align: center; display: block");
    document.getElementById("new-photo-button").setAttribute("style", "text-align: center; display: none");
    //this.RotateFoto();
    const options: CameraOptions = {
      cameraDirection: 1,
      correctOrientation: false,
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 500,
      targetHeight: 310
    }
    this.camera.getPicture(options).then((imageData) => {
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
      //document.getElementById("new-myphoto").setAttribute("src",'data:image/jpeg;base64,' + imageData);
    }, (err) => {
      //document.getElementById("new-myphoto").setAttribute("src",this.myphoto);
      this.DeleteFoto();
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: '',
        message: '<BR><H3>No se pudo acceder a la cámara</H3>',
        buttons: ['ACEPTAR']
      });
      alert.present();
    });
    
  }
  Validate() {
    var pass:boolean = true;

    if (this.nombre == undefined || this.nombre == "") {
      this.hiden_input[0] = false;
      pass = false;
    } else {
      this.hiden_input[0] = true;
    }
    if (this.Apepat == undefined || this.Apepat == "") {
      this.hiden_input[1] = false;
      pass = false;
    } else {
      this.hiden_input[1] = true;
    }
    if (this.Apemat == undefined || this.Apemat == "") {
      this.hiden_input[2] = false;
      pass = false;
    } else {
      this.hiden_input[2] = true;
    }
    if (this.f_nac == undefined) {
      
      this.hiden_input[3] = false;
      pass = false;
    } else {
      this.hiden_input[3] = true;
    }
    if (this.myphoto == undefined || this.myphoto == "") {
    
      this.hiden_input[4] = false;
      pass = false;
    } else {
      this.hiden_input[4] = true;
    }

    if(pass){
      this.PublishData();
    }
  }

  PublishData() {
    this.fecha = this.f_nac.split("-");
    this.f_nac = this.fecha[2] + "/" + this.fecha[1] + "/" + this.fecha[0];
    let message = "Cargando...";
    let loader = this.loading.create({
      content: message
    });
    loader.present();
    var data = new FormData();

    data.append("Name", this.nombre);
    data.append("MidleName", this.Apepat);
    data.append("LastName", this.Apemat);

    data.append("BirthDay", this.f_nac);
    var blob = new Blob([this.myphoto], { type: "image/jpeg" });
    data.append("file", blob, "foto.jpg");

    this.provider.addUser(data).subscribe((data) => {

      if (data.success) {
        //loader.dismiss();
        this.navCtrl.push(RegisterPage, { pin: data.message, nombre: this.nombre, apellidos: (this.Apepat + " " + this.Apemat) });
      } else {
        
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: '',
          message: '<BR><H3>'+data.message+'</H3>',
          buttons: ['ACEPTAR']
        });
        alert.present();
        loader.dismiss();
        this.navCtrl.push(RegisterPage);
      }
    }, (error) => {
      console.log(error);
      if (error.status == 404) {
        //message = "No hay citas actualmente..";
      }
      else if (error.status != 401 && error.status != 404) {
        //message = "Error al tratar de Actualizar..";
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
          message: '<BR><H3>Error en Servidor</H3>',
          buttons: ['ACEPTAR']
        });
        alert.present();
      }
      loader.dismiss();
    }, () => {
      console.log('complete');
      loader.dismiss();
    });
  }
}

