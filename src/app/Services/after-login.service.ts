import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { AuthService } from 'src/app/Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService implements CanActivate {
  getdata: any;

  constructor(private Token : TokenService,  private Jarwis: JarwisService, private Auth: AuthService ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    // this.Jarwis.myProfile().subscribe(
    //   data => {
    //     this.getdata = data;
    //     this.Token.handle(this.getdata.data.access_token);
    //     this.Auth.changeAuthStatus(true);
    //   });
    return this.Token.loggedIn();

  }
}
