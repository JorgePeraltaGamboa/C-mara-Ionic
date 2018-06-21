import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions} from '@ionic-native/camera';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,private camera:Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPage');
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
