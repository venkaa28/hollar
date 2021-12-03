import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  signupCredentials: FormGroup;
  private userDict = {};

  constructor(private fb: FormBuilder, private alertController: AlertController,
              private router: Router, private loadingController: LoadingController,
              public authService: AuthService) { }

  ngOnInit() {
    this.signupCredentials = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      //insert custom matching validator above]]
    });
  }

  async signup() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.userDict = {
      email: this.signupCredentials.get('email')?.value,
      firstName: this.signupCredentials.get('firstName')?.value,
      lastName: this.signupCredentials.get('lastName')?.value,
      password: this.signupCredentials.get('password')?.value,
      phoneNumber: this.signupCredentials.get('phoneNumber')?.value
    };

    this.authService.doRegister(this.userDict)
      .then(async res => {
        await loading.dismiss();
        await this.router.navigateByUrl('/tabs', {replaceUrl: true});
      }, async err => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Sign-Up Failed',
          message: err.message,
          buttons: ['OK']
        });
        await alert.present();
      });

  }

  async goToLogin(){
    await this.router.navigateByUrl('/login');
  }

  get firstName() {
    return this.signupCredentials.get('firstName');
  }

  get lastName(){
    return this.signupCredentials.get('lastName');
  }

  get phoneNumber(){
    return this.signupCredentials.get('phoneNumber');
  }

  get email() {
    return this.signupCredentials.get('email');
  }

  get password(){
    return this.signupCredentials.get('password');
  }


}
