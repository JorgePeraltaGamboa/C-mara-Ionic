import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions} from '@ionic-native/camera';
import { NewPage } from '../new/new';
import { RestProvider } from '../../providers/rest/rest';

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
  private pin: string;
  nombre: string;
  apellidos: string;
  subject: string;    // Variable asunto
  street: string;     // Varaible calle
  streets: any;       // Arreglo de calles
  subjects : any;     // Arreglo de asuntos
  personal_data: any; // Arreglo de datos personles
  constructor(public navCtrl: NavController, public navParams: NavParams,private camera:Camera, public provider: RestProvider) {
    this.pin = this.navParams.get('pin');
    this.subjects = [];
    this.streets = [];
    this.provider.getSubjects().subscribe(data=>{
      this.subjects = data;
    });
    this.provider.getStreets().subscribe(data=>{
      this.streets = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  ToNewPage(){ 
    if(this.pin == undefined || this.pin.split(" ").join("")==""){
      this.navCtrl.push(NewPage);
    }else{
      this.provider.getId(this.pin).subscribe(personal_data =>{
        if (personal_data.success != null){
          alert("No existe dicho ID");
          this.navCtrl.push(NewPage);
        }else{
          this.nombre = personal_data.nombre;
          this.apellidos = personal_data.apellido1 +" "+ personal_data.apellido2;
        }
      });
    }
    
  }
  DeleteFoto(){
    this.myphoto="";
    document.getElementById("cancel-button").setAttribute("style","text-align: center; display: none");
    document.getElementById("photo-button").setAttribute("style","text-align: center; display: block");
  }
  TomarFoto(){
    alert("Procesando fotografia");
    document.getElementById("cancel-button").setAttribute("style","text-align: center; display: block");
    document.getElementById("photo-button").setAttribute("style","text-align: center; display: none");
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
  RegistrarVisita(){
    //alert(this.subject + "   " + this.street);
    
  }
}
