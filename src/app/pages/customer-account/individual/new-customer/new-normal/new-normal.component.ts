import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CustomerAccountService } from 'src/app/Services/customer-account.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

declare let $: any;
interface ItemData {
  id: string;
  name: string;
  relationship: string;
  verification: string;
  action: boolean;
}

@Component({
  selector: 'app-new-normal',
  templateUrl: './new-normal.component.html',
  styleUrls: ['./new-normal.component.css']
})
export class NewNormalComponent implements OnInit {

      normalForm: FormGroup;

      current = 0;
      index = 'First-content';
      image: string | ArrayBuffer;
      img: string | ArrayBuffer;
      disabled = false;
      response: any;
      resMessage: any;
      users: any;
      responsecode: any;
      success: string;
      success2: string;
      glheadcodes: any;
      isLoading: any;

      loadDetails: boolean;
      error: string;
      error2: string;
      visible: boolean;
      bvnResponse: any;
      BvnDetails: any;
      resTittle: any;
      errorResponse: any;
      showsDetails: boolean;
      type: string;
      profResponds: any;
      me: any;
      myId: any;
      ImageFile: any;
      SignatureFile: any;
      fileInputLabel: any;
      fileInputLabel2: any;

    validateForm!: FormGroup;
    listOfControl: Array<{ id: number; controlInstance: string; relationship: string; verification: string; action: boolean }> = [];

    offsetTop = 10;
    nzOffsetBottom = 10;
    public form = {
      SchemeType: '',
      AccountName: '',
      SolId: '',
      ImageFile: '',
      SchemeCode: '',
      GlSubHeadCode: '',
      CifId: '',
      IntroducerCode: '',
      SignatureFile: '',
      Manager: '',
      InitialDeposit: '',
      Signatories: [ ],
    };
    shemecodes: any;
    shemeTypes: any;
    LastName: any;
    FirstName: any;
    Name: string;
    sols: any;
    disableSubmitBotton: boolean;
  disabled2: boolean;
  BvnDetails2: any;
  resMessage2: any;
  responsecode2: any;
  showsDetails3: boolean;
  response2: any;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private nzMessageService: NzMessageService,
    private msg: NzMessageService,
    private notification: NzNotificationService,
    private customerAccount: CustomerAccountService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.normalForm = this.fb.group({
      SchemeType: ['', Validators.required],
      AccountName: ['', Validators.required],
      SolId: ['', Validators.required],
      ImageFile: ['', Validators.required],
      SchemeCode: ['', Validators.required],
      GlSubHeadCode: ['', Validators.required],
      CifId: ['', Validators.required],
      IntroducerCode: ['', Validators.required],
      SignatureFile: ['', Validators.required],
      Manager: ['', Validators.required],
      InitialDeposit: ['', Validators.required],
    });

    this.customerAccount.SchemeTypes().subscribe(
      data => { const allSchemTpes: any = data;
                this.shemeTypes = allSchemTpes;
                this.isLoading = true;
      },
    );

    this.customerAccount.getSols().subscribe(
      data => { const getSols: any = data;
                this.sols = getSols;
                this.isLoading = true;
      },
    );

    this.Jarwis.myProfile().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
        this.myId = this.me.emp_id;
      }
    );

    this.validateForm = this.fb.group({});
    this.addField();

  }

    setOffsetTop(): void {
      this.offsetTop += 10;
    }

    setOffsetBottom(): void {
      this.nzOffsetBottom += 10;
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
      case 3: {
        this.index = 'fourth-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }


    addField(e?: MouseEvent): void {
      if (e) {
        e.preventDefault();
      }
      const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;
      const signatory = {
        customerId: null,
        relationshipType: null
      };
      const newSignatories = this.form.Signatories.push(signatory);
      console.log(this.form);
      const control = {
        id,
        controlInstance: `passenger${id}`,
        relationship: `relationship${id}`,
        verification: `Not Verified`,
        action: false,
      };
      const index = this.listOfControl.push(control);
      console.log(this.listOfControl[this.listOfControl.length - 1]);
      this.validateForm.addControl(this.listOfControl[index - 1].controlInstance, new FormControl(null, Validators.required));
      this.validateForm.addControl(this.listOfControl[index - 1].relationship, new FormControl(null, Validators.required));
      this.validateForm.addControl(this.listOfControl[index - 1].verification, new FormControl(null, Validators.required));
      this.validateForm.addControl(String(this.listOfControl[index - 1].action), new FormControl(null, Validators.required));
    }

    removeField(i: { id: number; controlInstance: string; relationship: string; verification: string; action: boolean }, e: MouseEvent): void {
      e.preventDefault();
      if (this.listOfControl.length > 1) {
        const index = this.listOfControl.indexOf(i);
        this.listOfControl.splice(index, 1);
        console.log(this.listOfControl);
        this.validateForm.removeControl(i.controlInstance);
        this.validateForm.removeControl(i.relationship);
        this.validateForm.removeControl(i.verification);
      }

      const newSignatories2 = this.form.Signatories.pop();
      console.log(this.form);
    }

    verityField(id, v, r): void {
        console.log(v);
        console.log(r);
        // this.disabled = true;
        for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
        this.listOfControl[id].action = true;
        console.log(this.listOfControl[id]);


        this.customerAccount.customerInquiry(this.validateForm.value[v], 'retail').subscribe(
        data => {
          // this.disabled = false;
          this.bvnResponse = data;
          this.BvnDetails = this.bvnResponse.customerDetails;
          this.resMessage = this.BvnDetails.responseMessage;
          // this.resTittle = this.bvnResponse.Message;
          this.responsecode = this.bvnResponse.responseCode;
          this.loadDetails = false;
          this.Name = this.BvnDetails.firstname + ' ' + this.BvnDetails.middlename + ' ' + this.BvnDetails.lastname;
          if (this.responsecode === '0') {
            this.listOfControl[id].action = false;
            this.success2 = 'Valid Customer';
            this.listOfControl[id].verification = 'Verified';
            this.form.Signatories[id].customerId = this.validateForm.value[v];
            this.form.Signatories[id].relationshipType = this.validateForm.value[r];
            this.type = 'success';
            this.notification.create(
              this.type,
              this.resMessage,
              'Customer Valid',
            );

          }else{
            this.listOfControl[id].action = false;
            this.error2 = 'Invalid Customer';
            this.listOfControl[id].verification = 'Not Verified';
            this.type = 'error';
            this.notification.create(
              this.type,
              this.resMessage,
              'Customer Vaid',
            );
          }
        },
      error => {
            this.listOfControl[id].action = false;
            this.error2 = 'Invalid credentials';
            this.loadDetails = false;
            this.disabled = false;
            this.responsecode = error.error.responseCode;
            this.response = error.error.ErrorResponse;
            this.resMessage = error.error.responseMessage;
            if (this.responsecode !== 0) {
            this.type = 'error';
            this.notification.create(
              this.type,
            this.resMessage,
            this.response,
          );
          }
          },
        );

    }

    submitForm(): void {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      console.log(this.form);
    }
    onSelectSchemeTypes(val): void {
      this.isLoading = true;
      // const getSchemeCode: any =  val.target.value;
      const getSchemeType: any =  val.target.value;
      this.customerAccount.SchemeCodes(getSchemeType).subscribe(
        data => { const allSchemCode: any = data;
                  this.shemecodes = allSchemCode;
                  this.isLoading = true;
                  this.onCheckValidation();
        },
        error => this.handleError(error)
      );
    }

    onSelectSchemeCode(): void {
      this.isLoading = true;
      // const getSchemeCode: any =  val.target.value;
      this.customerAccount.GlSubHeadCode(this.normalForm.value.SchemeCode).subscribe(
        data => { const allSchemGlHeadCode: any = data;
                  this.glheadcodes = allSchemGlHeadCode;
                  this.isLoading = true;
                  this.onCheckValidation();
        },
        error => this.handleError(error)
      );
    }

    close(): void {
      this.visible = false;
    }
    again(): void{

      this.form.SchemeType = '';
      this.form.AccountName = '';
      this.form.SolId = '';
      this.form.ImageFile = '';
      this.form.SchemeCode = '';
      this.form.GlSubHeadCode = '';
      this.form.CifId = '';
      this.form.IntroducerCode = '';
      this.form.SignatureFile = '';
      this.form.Manager = '';
      this.success2 = '';
      this.success = '';
      this.error = '';
      this.current = 0;
      this.changeContent();
    }

    onGo(): void{
      this.disabled = true;
      this.error = '';
      this.loadDetails = true;
      if (this.form.CifId == null) {
        this.error = 'Empty field, Please inpute the Customer BVN';
        this.disabled = false;
        this.loadDetails = false;
      } else {

        this.customerAccount.customerInquiry(this.form.CifId, 'retail').subscribe(
          data => {
            this.disabled = false;
            this.bvnResponse = data;
            this.BvnDetails = this.bvnResponse.customerDetails;
            this.resMessage = this.BvnDetails.responseMessage;
            // this.resTittle = this.bvnResponse.Message;
            this.responsecode = this.bvnResponse.responseCode;
            this.loadDetails = false;
            this.showsDetails = true;

            if (this.responsecode === '0') {
              this.success = 'Valid Customer ID';
              this.type = 'success';
              this.onCheckValidation();
              this.notification.success( 'Valid Customer', 'Customer Verified Successfully !!');

              this.current += 1;
              this.changeContent();
            }
          },
          error => {
            this.error = 'Invalid Customer ID';
            this.loadDetails = false;
            this.disabled = false;
            this.responsecode = error.error.responseCode;
            this.response = error.error.ErrorResponse;
            this.resMessage = error.error.responseMessage;

            if (this.responsecode !== 0) {
              this.type = 'error';
              this.notification.create(
                this.type,
                this.resMessage,
                this.response,
              );
            }
          },
        );

      }
    }


    onGoParentCif(): void{
      this.disabled2 = true;
      this.loadDetails = true;
      if (this.normalForm.value.Manager === '') {
        this.error = 'Empty field, Please inpute the Customer BVN';
        this.disabled = false;
        this.loadDetails = false;
        this.disabled2 = false;
      } else {

        this.customerAccount.getRmCode(this.normalForm.value.Manager).subscribe(
          data => {
            this.disabled2 = false;
            this.bvnResponse = data;
            this.BvnDetails2 = this.bvnResponse.rmDetails;
            this.resMessage2 = this.bvnResponse.responseMessage;
            // this.resTittle = this.bvnResponse.Message;
            this.responsecode2 = this.bvnResponse.responseCode;
            this.loadDetails = false;
            this.showsDetails3 = true;

            if (this.responsecode2 === '0') {
              this.type = 'success';
              this.notification.success('Rm Code', this.resMessage2);
              this.error = '';
            }
          },
          error => {
            this.loadDetails = false;
            this.disabled2 = false;
            this.showsDetails = false;
            this.responsecode2 = error.error.responseCode;
            this.response2 = error.error.ErrorResponse;
            this.resMessage2 = error.error.responseMessage;

            if (this.responsecode !== 0) {
              this.type = 'error';
              this.notification.error('Rm Code', this.resMessage2 || this.response2 || this.responsecode2 );
            }
          },
        );

      }
      this.onCheckValidation();
    }


    onCheckValidation(): void{

      if (this.form.SchemeType === '' || this.form.SolId === '' ||
           this.form.SchemeCode === '' || this.form.GlSubHeadCode === '' ||
          this.form.CifId === '' || this.form.Manager === '' ) {

            this.disableSubmitBotton = true;

      } else {
        this.disableSubmitBotton = false;
      }

    }

    notValidForm(){
      this.type = 'warning';
      this.notification.create(
        this.type,
        'Oops',
        'Some required feild are empty, Please preview and check'
      );

      console.log( this.form);
    }

    onFileSelect(event): void{

      if (event.target.files.length > 0) {

        const file = event.target.files[0];
        this.fileInputLabel = file.name;
        const reader1 = new FileReader();

        const vm = this;

        reader1.onloadend = () => {
          this.ImageFile = reader1.result;
        };
        reader1.readAsDataURL(file);
      }

    }

    onFileSelect2(event): void{

      if (event.target.files.length > 0) {

        const files = event.target.files[0];
        this.fileInputLabel2 = files.name;
        const reader = new FileReader();

        const vm = this;

        reader.onloadend = () => {
          this.SignatureFile = reader.result;
        };
        reader.readAsDataURL(files);
      }
    }

    onSubmitAccountForm(): void{
      if (this.normalForm.value.GlSubHeadCode === '' || this.normalForm.value.Manager === '' ||
        this.normalForm.value.SolId === '' || this.normalForm.value.SchemeType === '' || this.normalForm.value.SchemeCode === '' ||
        this.normalForm.value.IntroducerCode === '') {
          this.notification.warning('Create Account', 'Some fields are required to be filled');
      } else {
          this.disabled = true;

          if (this.ImageFile === undefined){

        } else {
          const img: string = this.ImageFile;
          this.normalForm.value.ImageFile = img.slice(22, img.length);
        }

          if (this.SignatureFile === undefined){

        } else {
          const sign: string = this.SignatureFile;
          this.normalForm.value.SignatureFile = sign.slice(22,  sign.length);
        }

        // tslint:disable-next-line:forin
        // for (const i in this.validateForm.controls) {
        //   this.validateForm.controls[i].markAsDirty();
        //   this.validateForm.controls[i].updateValueAndValidity();
        // }
          console.log(this.normalForm.value);
          this.normalForm.value.CifId = this.form.CifId;
          console.log('checking Cif', this.normalForm.value.CifId)
          this.customerAccount.OpeningAccountNormal(this.normalForm.value).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
        );

      }

    }

    handleResponse(data): void{
      this.disabled = false;
      // this.current += 1;
      // this.changeContent();

      this.responsecode = data.responseCode;
      this.resMessage = data.errorResponse;
      this.errorResponse = data.isSuccess;
      this.notification.success('Individual', 'Account Opened Successfully' );
      location.reload();

    }

    handleError(error): void{
      this.disabled = false;
      this.responsecode = error.error.responseCode;
      this.response = error.error.errorResponse;
      this.notification.error('Individual', error.error.errorResponse || error.error.message || error.error.Message);
      // this.current += 1;
      // this.changeContent();

      // if (this.responsecode === 3) {
      //   this.type = 'error';
      //   this.notification.create(
      //     this.type,
      //     this.resMessage,
      //     this.response
      //   );
      // }

      // if (this.responsecode !== 3) {
      //   this.type = 'error';
      //   this.notification.create(
      //     this.type,
      //     'Operation not successfull',
      //     'Something on usual went wrong'
      //   );

      // }
    }
  }

