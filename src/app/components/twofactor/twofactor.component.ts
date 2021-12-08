import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-twofactor',
  templateUrl: './twofactor.component.html',
  styleUrls: ['./twofactor.component.css']
})
export class TwofactorComponent implements OnInit {
  [x: string]: any;

 twoFactorForm: FormGroup;
 error = '';
 loginResult: any;
 loginResult2: any;

 showLoginSub = true;
 showLoginSub2 = false;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private message: NzMessageService,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.twoFactorForm = this.formBuilder.group({
      username: ['', Validators.required],
      token: ['', Validators.required],
      token1: ['', Validators.required],
      token2: ['', Validators.required],
      token3: ['', Validators.required],
      token4: ['', Validators.required],
    });
  }

  onSubmit(){
    this.showLoginSub = false;
    this.showLoginSub2 = true;
    this.twoFactorForm.value.username = sessionStorage.getItem('username');
    // tslint:disable-next-line:max-line-length
    this.twoFactorForm.value.token = this.twoFactorForm.value.token1 + this.twoFactorForm.value.token2 + this.twoFactorForm.value.token3 + this.twoFactorForm.value.token4;
    delete this.twoFactorForm.value.token1;
    delete this.twoFactorForm.value.token2;
    delete this.twoFactorForm.value.token3;
    delete this.twoFactorForm.value.token4;
    this.Jarwis.twoFactorLogin(this.twoFactorForm.value).subscribe((result: any) => {
      this.loginResult = result.data;
      this.loginResult2 = result;
      if (this.loginResult.requires_two_factor === false){
        this.loginResult = this.handleResponse(this.loginResult);
      } else if (this.loginResult2.message === 'Invalid Token'){
        this.showLoginSub = true;
        this.showLoginSub2 = false;
        this.notification.success( 'Token', this.loginResult2.message );
      }
    }, error => this.handleError(error)
    );
  }

  handleResponse(loginResult){
    this.notification.success( 'Token', 'Login Successfully !!' );
    this.Token.handle(loginResult.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('app/dashboard').then(() => {window.location.reload();});
  }

  handleError(error){
    this.showLoginSub = true;
    this.showLoginSub2 = false;
    // this.error = error.error.message;
    // const type = 'error';
    // this.message.create(type, `Error: ${this.error}` );
    this.notification.error( 'Login', error.error.message || error.error.responseMessage);
  }

}
