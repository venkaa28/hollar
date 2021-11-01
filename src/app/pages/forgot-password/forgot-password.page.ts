import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  forgotPassword: FormGroup;

  constructor(private fb: FormBuilder, private alertController: AlertController,
              private router: Router, private loadingController: LoadingController,
              public authService: AuthService) { }

  ngOnInit() {
    this.forgotPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.forgotPassword.get('email');
  }

  async requestResetLink() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.doResetPassword(this.forgotPassword.get('email').value)
      .then(async res => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Email Successfully Sent',
          buttons: ['OK']
        });
        alert.present().then( async () => {
          await this.router.navigateByUrl('/login', {replaceUrl: true});
        });
      }, async err => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Reset Password Email Failed',
          message: err.message,
          buttons: ['OK']
        });
        await alert.present();
      });

  }

}
