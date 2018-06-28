import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';              //Uso Cámara
//import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';                        //Conector con la API
import { RestProvider } from '../../providers/rest/rest';                 //Provider
import { FormBuilder, FormGroup, Validators } from '@angular/forms';      //Validar Formularios
import { RegisterPage } from '../register/register';
import 'rxjs/Rx';
import { LoadingController } from 'ionic-angular';
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
  nombre: string;
  Apepat: string;
  Apemat: string;
  f_nac: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, public http: Http,
    public provider: RestProvider, public loading: LoadingController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPage');

  }
  DeleteFoto() {
    this.myphoto = "";
    document.getElementById("new-cancel-button").setAttribute("style", "text-align: center; display: none");
    document.getElementById("new-photo-button").setAttribute("style", "text-align: center; display: block");
  }
  TomarFoto() {
    alert("Procesando fotografia");
    document.getElementById("new-cancel-button").setAttribute("style", "text-align: center; display: block");
    document.getElementById("new-photo-button").setAttribute("style", "text-align: center; display: none");
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      alert("No se pudo acceder a la cámara")
    });
  }
  Validate() {
    if (this.nombre == undefined || this.nombre == "") {
      document.getElementById("name-block").setAttribute('style', 'display:block');
      document.getElementById("apepat-block").setAttribute('style', 'display:none');
      document.getElementById("apemat-block").setAttribute('style', 'display:none');
      document.getElementById("date-block").setAttribute('style', 'display:none');
      document.getElementById("photo-block").setAttribute('style', 'display:none');
    } else if (this.Apepat == undefined || this.Apepat == "") {
      document.getElementById("apepat-block").setAttribute('style', 'display:block');
      document.getElementById("name-block").setAttribute('style', 'display:none');
      document.getElementById("apemat-block").setAttribute('style', 'display:none');
      document.getElementById("date-block").setAttribute('style', 'display:none');
      document.getElementById("photo-block").setAttribute('style', 'display:none');
    } else if (this.Apemat == undefined || this.Apemat == "") {
      document.getElementById("apemat-block").setAttribute('style', 'display:block');
      document.getElementById("apepat-block").setAttribute('style', 'display:none');
      document.getElementById("name-block").setAttribute('style', 'display:none');
      document.getElementById("date-block").setAttribute('style', 'display:none');
      document.getElementById("photo-block").setAttribute('style', 'display:none');
    } else if (this.f_nac == undefined) {
      document.getElementById("date-block").setAttribute('style', 'display:block');
      document.getElementById("apemat-block").setAttribute('style', 'display:none');
      document.getElementById("apepat-block").setAttribute('style', 'display:none');
      document.getElementById("name-block").setAttribute('style', 'display:none');
      document.getElementById("photo-block").setAttribute('style', 'display:none');
    } else {
      this.PublishData();
      document.getElementById("name-block").setAttribute('style', 'display:none');
      document.getElementById("apepat-block").setAttribute('style', 'display:none');
      document.getElementById("apemat-block").setAttribute('style', 'display:none');
      document.getElementById("date-block").setAttribute('style', 'display:none');
      document.getElementById("photo-block").setAttribute('style', 'display:none');
    }
  }

  PublishData() {
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
        this.navCtrl.push(RegisterPage, { pin: data.message });
      } else {
        alert(data.message);
        this.navCtrl.push(RegisterPage);
      }
    }, (error) => {
      console.log(error);
      if (error.status == 404) {
        //message = "No hay citas actualmente..";
      }
      if (error.status != 401 && error.status != 404) {
        //message = "Error al tratar de Actualizar..";
      }
    });
    loader.dismiss();
  }
}

