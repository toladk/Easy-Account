import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showLoginSub = true;
  showLoginSub2 = false;

  public form = {
    username : null,
    // email : null,
    password : null
  }

  public error = null;
  id: string;

  public loggedIn: boolean;
  loginResult: any;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private message: NzMessageService,
    private notification: NzNotificationService
              ) { }

  ngOnInit(): void {
    // this.Auth.authStatus.subscribe(Value => this.loggedIn = Value);
  }

  onSubmit(){
    this.showLoginSub = false;
    this.showLoginSub2 = true;
    sessionStorage.setItem('username', this.form.username);
    // this.id = this.message.loading('Action in progress..', { nzDuration: 0 }).messageId;
    this.Jarwis.login(this.form).subscribe((result: any) => {
      this.loginResult = result.data;
      if (this.loginResult.requires_two_factor === false){
        this.loginResult = this.handleResponse(this.loginResult);
      } else {
        this.router.navigateByUrl('/two-factor');
      }
    }, error => this.handleError(error)
    );
  }

  handleResponse(loginResult){
    this.notification.success( 'Login', 'Login Successfully !!' );
    this.message.remove(this.id);
    // this.Token.handle(data.access_token);
    this.Token.handle(loginResult.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('app/dashboard').then(() => {window.location.reload();});
    // const type = 'success';
    // this.message.create(type, `Login Successfull`);
  }

  handleError(error){
    this.message.remove(this.id);
    this.notification.error( 'Login', error.error.message || 'Login Failed');
    this.showLoginSub = true;
    this.showLoginSub2 = false;
    // this.error = error.error.message;
    // const type = 'error';
    // this.message.create(type, `Error: ${this.error}` );
  }


  logout( Event : MouseEvent) {
    Event.preventDefault();
    this.Auth.changeAuthStatus(false);
    this.Token.remove();
    this.router.navigateByUrl('/login');
    sessionStorage.removeItem('username');
  }

}
