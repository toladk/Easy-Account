import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    email : null,
    name : null,
    password : null,
    password_confirmation : null
  };

  public error = null;
  steps: any;

  constructor(private Jarwis: JarwisService,
              private router: Router,
              private Token: TokenService,
    ) { }
  ngOnInit(): void {
    this.steps = 'basic';
    }

  step(val): void{
    this.steps = val;
  }
  onSubmit(): void{
  this.Jarwis.signup(this.form).subscribe(
     data => this.handleResponse(data),
     error => this.handleError(error)
     );
  }

  handleResponse(data): void{
    this.Token.handle(data.access_token);
    this.router.navigateByUrl('/profile');
  }

  handleError(error): void{
    this.error = error.error.errors;
  }

}
