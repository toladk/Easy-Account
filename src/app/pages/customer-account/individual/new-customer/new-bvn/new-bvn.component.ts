import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
// import { NzFormModule } from 'ng-zorro-antd/form';

declare let $ : any;

@Component({
  selector: 'app-new-bvn',
  templateUrl: './new-bvn.component.html',
  styleUrls: ['./new-bvn.component.css']
})
export class NewBvnComponent implements OnInit {

  current = 0;

  index = 'First-content';
  image: string | ArrayBuffer;
  img: string | ArrayBuffer;
  disabled: boolean;
  response: any;
  resMessage: any;
  users: any;
  responsecode: any;
  success: any;

  public form = {

    Email: null,
    Salutation: null,
    Gender: null,
    Address: null,
    MaritalStatus: null,
    APPID: null,
    BVN: null,
    LimitAmount: null,
    ImageFile: null,
    InitialDeposit: null,
    RequestCard: null,
    SchemeType: null,
    SchemeCode: null,
    GlSubHeadCode: null,
    ProfileAlert: null,
    CardType: null,
    StaffId: null,
    CifId: null,
    SignatureFile: null,
  }
  loadDetails: boolean;
  error: string;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private nzMessageService: NzMessageService,
    private msg: NzMessageService,
    private notification: NzNotificationService,
    // private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.wizardScript();
  }

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

  uploadFile(event): void{
    const files = event.target.files[0];
    const reader = new FileReader();
    const vm = this;

    reader.onloadend = () => {
      this.image = reader.result;
      this.img = this.image;

    };
    reader.readAsDataURL(files);
  }

  // onClickSubmit(form: NgForm): void{

  //   this.disabled = true;
  //   form.value.item_img = this.image;
  //   form.value.pieces = 1;
  //   this.Products.addItemDetails(form.value).subscribe(
  //     data => this.handleResponse(data),
  //     error => this.handleError(error),
  //   );
  // }


  onSubmit(){

    this.form.ImageFile = this.image;
    console.log(this.form);
    this.disabled = true;
    this.loadDetails = true;
    if (this.form.BVN == null) {
      this.error = 'Empty field, Please inpute the user A.D';
      this.disabled = false;
      this.loadDetails = false;
    } else {

      console.log(this.form);
    // this.Jarwis.createUser(this.form).subscribe(
    //   data => this.handleResponse(data),
    //   error => this.handleError(error)
    // );
  }
}

  handleResponse(data){
    this.disabled = false;
    this.current += 1;
    this.changeContent();

    this.response = data.ResponseCode;
    this.resMessage = data.Message;
    this.users = data.Details;

  }

  handleError(error){
    this.disabled = false;
    this.responsecode = error.error.ResponseCode;
    this.response = error.error.ErrorResponse;
    this.current += 1;
    this.changeContent();

  }


  wizardScript(): void{
    $(function(){
      'use strict'

      $('#wizard1').steps({
        headerTag: 'h3',
        bodyTag: 'section',
        autoFocus: true,
        titleTemplate: '<span class="number">#index#</span> <span class="title">#title#</span>'
      });

      $('#wizard2').steps({
        headerTag: 'h3',
        bodyTag: 'section',
        autoFocus: true,
        titleTemplate: '<span class="number">#index#</span> <span class="title">#title#</span>',
        onStepChanging: function (event, currentIndex, newIndex) {
          if(currentIndex < newIndex) {
            // Step 1 form validation
            if(currentIndex === 0) {
              var fname = $('#fistname').parsley();
              var lname = $('#lastname').parsley();

              if(fname.isValid() && lname.isValid()) {
                return true;
              } else {
                fname.validate();
                lname.validate();
              }
            }

            // Step 2 form validation
            if(currentIndex === 1) {
              var email = $('#email').parsley();
              if(email.isValid()) {
                return true;
              } else { email.validate(); }
            }
          // Always allow step back to the previous step even if the current step is not valid.
          } else { return true; }
        }
      });

      $('#wizard3').steps({
        headerTag: 'h3',
        bodyTag: 'section',
        autoFocus: true,
        titleTemplate: '<span class="number">#index#</span> <span class="title">#title#</span>',
        stepsOrientation: 1
      });
    });
  }

}
