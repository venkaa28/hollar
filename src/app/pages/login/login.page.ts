import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(private fb: FormBuilder, private alertController: AlertController, private router: Router, private loadingController: LoadingController) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    //Insert authentication here
    await loading.dismiss();
    await this.router.navigateByUrl('/tabs', {replaceUrl: true});
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
