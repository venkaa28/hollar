import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  signupCredentials: FormGroup;

  constructor(private fb: FormBuilder, private alertController: AlertController, private router: Router, private loadingController: LoadingController) { }

  ngOnInit() {
    this.signupCredentials = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
      //insert custom matching validator above]]
    });
  }

  async signup() {
    const loading = await this.loadingController.create();
    await loading.present();

    //Insert sign up authentication here
    await loading.dismiss();
    await this.router.navigateByUrl('/tabs', {replaceUrl: true});
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

  get confirmPassword(){
    return this.signupCredentials.get('confirmPassword');
  }


}
