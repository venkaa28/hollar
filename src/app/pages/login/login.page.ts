import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(private fb: FormBuilder, private alertController: AlertController,
              private router: Router, private loadingController: LoadingController,
              public authService: AuthService) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.doLogin(this.credentials.get('email').value, this.credentials.get('password').value)
      .then(async res => {
        await loading.dismiss();
        await this.router.navigateByUrl('/tabs', {replaceUrl: true});
      }, async err => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login Failed',
          message: err.message,
          buttons: ['OK']
        });
        await alert.present();
      });
  }

  get email() {
    return this.credentials.get('email');
  }

  get password(){
    return this.credentials.get('password');
  }

  async goToSignUP(){
    await this.router.navigateByUrl('/sign-up');
  }
}
