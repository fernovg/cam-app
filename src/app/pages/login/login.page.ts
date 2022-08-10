import { Component, OnInit } from '@angular/core';
import { iosTransitionAnimation, NavController, ToastController } from '@ionic/angular';
import { AuthenticationService } from "../../services/autenticacion.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  request = {
    Usuario: "",
    Password: ""
  }
  
  loading:boolean = false;

  constructor(private auth:AuthenticationService,private navcontroller:NavController, 
    public toastController: ToastController) { }

  ngOnInit() {
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      color: "warning",
      mode: "ios",
      message: message,
      duration: 3000
    });
    toast.present();
  }

  logeo(){
    this.loading = true;
    console.log("Logear",this.request);
    this.auth.authenticate(this.request).subscribe({
      next:(userInfo)=>{
        this.loading = false;
        if (!userInfo.result) {
          this.presentToast(userInfo.message);
          return;
        }  
        this.navcontroller.navigateRoot("/usuario")     
      },error: error=>{
        console.log(error);        
      }
    })
    
  }

}
