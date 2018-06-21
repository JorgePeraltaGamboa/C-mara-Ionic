import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions} from '@ionic-native/camera';
import { NewPage } from '../new/new';
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
  private myphoto: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private camera:Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  ToNewPage(){
    this.navCtrl.push(NewPage);
  }
  DeleteFoto(){
    this.myphoto="";
  }
  TomarFoto(){
    alert("Procesando fotografia");
    const options: CameraOptions={
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) =>{
      alert("No se pudo acceder a la cámara")
    });
  }

}
