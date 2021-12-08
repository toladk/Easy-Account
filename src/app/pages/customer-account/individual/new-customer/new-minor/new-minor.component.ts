import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { CustomerAccountService } from 'src/app/Services/customer-account.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzFormModule } from 'ng-zorro-antd/form';
import getISOWeek from 'date-fns/getISOWeek';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
declare let $: any;
import { differenceInCalendarDays, setHours } from 'date-fns';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-minor',
  templateUrl: './new-minor.component.html',
  styleUrls: ['./new-minor.component.css']
})
export class NewMinorComponent implements OnInit {
  // For date and lower
  today = new Date();
  timeDefaultValue = setHours(new Date(), 0);

  alphaPattern = '^[A-Za-z-+()]{1,115}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

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
  glheadcodes: any;
  isLoading: any;

  loadDetails: boolean;
  error: string;
  visible: boolean;
  bvnResponse: any;
  BvnDetails: any;
  resTittle: any;
  errorResponse: any;
  showsDetails = false;
  type: string;
  profResponds: any;
  me: any;
  myId: any;
  ImageFile: any;
  SignatureFile: any;
  fileInputLabel: any;
  fileInputLabel2: any;
  errorMessage: any;
  errorContent: any;
  date = null;
  isEnglish = false;

  public form = {

    FirstName: '',
    MiddleName: '',
    LastName: '',
    Email: '',
    Salutation: '',
    Gender: '',
    Address: '',
    MaritalStatus: 'SINGL',
    PhoneNumber: '',
    bvn: '',
    ImageFile: '',
    Dob: '',
    sector: '53000',
    subSector: '70050',
    solId: '',
    RelationshipType: '',
    SchemeCode: '',
    SchemeType: 'SBA',
    GlSubHeadCode: '',
    ParentCif: '',
    CifId: '',
    IntroducerCode: '',
    SignatureFile: '',
    Manager: '',
  };
  responsecode2: any;
  response2: any;
  resMessage2: any;
  BvnDetails2: any;
  disabled2: boolean;
  disabledbvn: boolean;
  BvnDetails3: any;
  showsbvn: boolean;
  responsecode3: any;
  response3: any;
  resMessage3: any;
  disableSubmitBotton = true;
  subResponsecode: any;
  isSuccess: any;
  isSuccess3: any;
  changedate = false;
  disabledv: boolean;
  showsDetailsv = false;
  sols: any;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private nzMessageService: NzMessageService,
    private msg: NzMessageService,
    private i18n: NzI18nService,
    private notification: NzNotificationService,
    private customerAccount: CustomerAccountService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {

    this.Jarwis.myProfile().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
        this.myId = this.me.emp_id;
      }
    );

    this.customerAccount.getSols().subscribe(
      data => { const getSols: any = data;
                this.sols = getSols;
                this.isLoading = true;
      },
    );
  }

  // For date and lower
  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, this.today) > 0

    onSelectSchemeCode(val): void {
    this.isLoading = true;
    const getSchemeCode: any =  val.target.value;
    this.customerAccount.GlSubHeadCode(getSchemeCode).subscribe(
      data => { const allSchemGlHeadCode: any = data;
                this.glheadcodes = allSchemGlHeadCode;
                this.isLoading = true;
      },
      error => this.handleError(error)
    );
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date): void {
    console.log('week: ', getISOWeek(result));
  }

  changeLanguage(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
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


  close(): void {
    this.visible = false;
  }
    again(): void{

    this.form.FirstName = '',
    this.form.MiddleName = '';
    this.form.LastName = '';
    this.form.Email = '';
    this.form.Salutation = '';
    this.form.Gender = '';
    this.form.Address = '';
    this.form.MaritalStatus = '';
    this.form.PhoneNumber = '';
    this.form.bvn = '';
    this.form.ImageFile = '';
    this.form.Dob = '';
    this.form.sector = '53000',
    this.form.subSector = '70050',
    this.form.solId = '',
    this.form.RelationshipType = '';
    this.form.SchemeCode = '';
    this.form.GlSubHeadCode = '';
    this.form.ParentCif = '';
    this.form.CifId = '';
    this.form.IntroducerCode = '';
    this.form.SignatureFile = '';
    this.form.Manager = '';
    this.error = '';

    this.current = 0;
    this.changeContent();
  }

  onGonBvn(): void{
    this.disabledbvn = true;
    this.loadDetails = true;
    if (this.form.bvn == '') {
      this.error = 'Empty field, Please inpute the Customer BVN';
      this.loadDetails = false;
      this.disabledbvn = false;
    } else {

      this.customerAccount.BvnValidation(this.form.bvn).subscribe(
        data => {
          this.disabledbvn = false;
          this.bvnResponse = data;
          this.BvnDetails3 = this.bvnResponse.bvnDetails;
          this.resMessage3 = this.bvnResponse.Message;
          // this.resTittle = this.bvnResponse.Message;
          this.isSuccess3 = this.bvnResponse.isSuccess;
          this.loadDetails = false;
          this.showsbvn = true;

          if (this.resMessage3 === 'Process Successful') {
            this.type = 'success';
            this.notification.create(
              this.type,
              this.resMessage3,
              'BVN Confirmed',
            );
            this.error = '';
          }
        },
        error => {
          this.error = 'Invalid credentials';
          this.loadDetails = false;
          this.disabledbvn = false;
          this.disabledbvn = false;
          this.responsecode3 = error.error.responseCode;
          this.response3 = error.error.ErrorResponse;
          this.resMessage3 = error.error.responseMessage;

          if (this.responsecode3 !== 0) {
            this.type = 'error';
            this.notification.create(
              this.type,
              this.resMessage3,
              'Failed',
            );
          }
        },
      );

    }
  }

  onGoParentCif(): void{
    this.disabled2 = true;
    this.loadDetails = true;
    if (this.form.ParentCif == '') {
      this.error = 'Empty field, Please inpute the Customer BVN';
      this.disabled = false;
      this.loadDetails = false;
      this.disabled2 = false;
    } else {

      this.customerAccount.customerInquiry(this.form.ParentCif, 'retail').subscribe(
        data => {
          this.disabled2 = false;
          this.bvnResponse = data;
          this.BvnDetails2 = this.bvnResponse.customerDetails;
          this.resMessage2 = this.bvnResponse.responseMessage;
          // this.resTittle = this.bvnResponse.Message;
          this.responsecode2 = this.bvnResponse.responseCode;
          this.loadDetails = false;
          this.showsDetails = true;

          if (this.responsecode2 === '0') {
            this.type = 'success';
            this.notification.create(
              this.type,
              this.resMessage2,
              'Parent ID Confirmed',
            );
            this.error = '';
          }
        },
        error => {
          this.error = 'Invalid credentials';
          this.loadDetails = false;
          this.disabled2 = false;
          this.showsDetails = false;
          this.responsecode2 = error.error.responseCode;
          this.response2 = error.error.ErrorResponse;
          this.resMessage2 = error.error.responseMessage;

          if (this.responsecode !== 0) {
            this.type = 'error';
            this.notification.create(
              this.type,
              this.resMessage2,
              this.response2,
            );
          }
        },
      );

    }
    this.onCheckValidation();
  }

  onGoRmcode(): void{
    this.disabledv = true;
    this.loadDetails = true;
    if (this.form.ParentCif == '') {
      this.error = 'Empty field, Please inpute the Customer BVN';
      this.disabled = false;
      this.disabledv = false;
      this.loadDetails = false;
      this.disabled2 = false;
    } else {

      this.customerAccount.getRmCode(this.form.Manager).subscribe(
        data => {
          this.disabledv = false;
          this.bvnResponse = data;
          this.BvnDetails2 = this.bvnResponse.customerDetails;
          this.resMessage2 = this.bvnResponse.responseMessage;
          // this.resTittle =wa this.bvnResponse.Message;
          this.responsecode2 = this.bvnResponse.responseCode;
          this.loadDetails = false;
          this.showsDetailsv = true;

          if (this.responsecode2 === '0') {
            this.type = 'success';
            this.notification.create(
              this.type,
              this.resMessage2,
              'Relationship Maneger ID Confirmed',
            );
            this.error = '';
          }
        },
        error => {
          this.error = 'Invalid credentials';
          this.loadDetails = false;
          this.disabledv = false;
          this.showsDetails = false;
          this.responsecode2 = error.error.responseCode;
          this.response2 = error.error.ErrorResponse;
          this.resMessage2 = error.error.responseMessage;

          if (this.responsecode !== 0) {
            this.type = 'error';
            this.notification.create(
              this.type,
              this.resMessage2,
              this.response2,
            );
          }
        },
      );

    }
    this.onCheckValidation();
  }


  onGo(): void{
    this.disabled = true;
    this.loadDetails = true;
    if (this.form.CifId == '') {
      this.error = 'Empty field, Please input Minor Customer ID';
      this.disabled = false;
      this.loadDetails = false;
    } else {

      this.customerAccount.customerInquiry(this.form.CifId, 'retail').subscribe(
        data => {
          this.disabled = false;
          this.bvnResponse = data;
          this.BvnDetails = this.bvnResponse.customerDetails;
          this.resMessage = this.bvnResponse.responseMessage;
          // this.resTittle = this.bvnResponse.Message;
          this.responsecode = this.bvnResponse.responseCode;
          this.loadDetails = false;
          // this.success = this.admessage;
          this.form.Email = this.BvnDetails.email;
          this.form.Salutation = this.BvnDetails.salutation;
          this.form.Gender = this.BvnDetails.gender;
          this.form.PhoneNumber = this.BvnDetails.phonenumber.slice(7);
          this.form.MiddleName = this.BvnDetails.middlename;
          this.form.FirstName = this.BvnDetails.firstname;
          this.form.LastName = this.BvnDetails.lastname;
          this.form.Dob = this.BvnDetails.dateofbirth;
          // this.showsDetails = true;

          if (this.responsecode === '0') {
            this.changedate = true;
            this.type = 'success';
            this.notification.create(
              this.type,
              this.resMessage,
              'Review customer informations',
            );

            this.current += 1;
            this.changeContent();
            this.error = '';
          }
        },
        error => {
          this.error = 'Invalid credentials';
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
    this.onCheckValidation();
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
      // const img: string = this.ImageFile;
      // this.form.ImageFile = img.slice(22, img.length);
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

          // const sign: string = this.SignatureFile;
          // this.form.SignatureFile = sign.slice(22,  sign.length);
      }
  }

  onCheckValidation(): void{

      if (this.form.FirstName == '' || this.form.Salutation == '' || this.form.PhoneNumber == '' ||
          this.form.Gender == '' || this.form.Address == '' || this.form.MaritalStatus == '' ||
          this.form.bvn == '' || this.form.Dob == '' || this.form.PhoneNumber == '' ||
          this.form.ParentCif == '' ) {

            this.disableSubmitBotton = true;

      } else {
        this.disableSubmitBotton = false;

      }

    }

    notValidForm(){
      console.log(this.form);
      this.type = 'warning';
      this.notification.create(
        this.type,
        'Oops',
        'Some required feild are empty, Please preview and check'
      );

      console.log( this.form);
    }

  onSubmitAccountForm(): void{
    console.log('checking', this.form)
    if (this.form.Salutation === '' || this.form.Gender === '' ||
      this.form.Address === '' || this.form.MaritalStatus === ''
      || this.form.Email === null ||
      this.form.SchemeType === '' || this.form.SchemeCode === ''
      && this.form.GlSubHeadCode === '' || this.form.solId === '' || this.form.ParentCif === '' ||
      this.form.bvn === '') {
        this.notification.warning('Create Account', 'Some fields are required to be filled');
    } else {
      this.disabled = true;

      if (this.ImageFile === undefined){

    } else {
      const img: string = this.ImageFile;
      this.form.ImageFile = img.slice(22, img.length);
    }

      if (this.SignatureFile === undefined){

    } else {
      const sign: string = this.SignatureFile;
      this.form.SignatureFile = sign.slice(22,  sign.length);
    }
      this.form.PhoneNumber = '+234(0)' + this.form.PhoneNumber;
      this.form.Dob = this.datePipe.transform(this.form.Dob, 'dd-MM-yyyy');
      this.customerAccount.AccountMinor(this.form).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );

    }

  }

  handleResponse(data): void{
    this.disabled = false;

    this.responsecode = data.responseCode;
    this.resMessage = data.errorResponse;
    this.isSuccess = data.isSuccess;

    if (this.isSuccess === true) {
      this.type = 'true';
      this.notification.create(
        this.type,
        'Operation Successful',
        '',
      );

      this.current += 1;
      this.changeContent();
    }

  }

  handleError(error): void{
    this.disabled = false;
    console.log(error);
    this.subResponsecode = error.error.responseCode;
    this.resMessage = error.error.errorResponse;
    this.isSuccess = error.error.isSuccess;
    this.notification.error('Minor', error.error.errorResponse || error.error.message || error.error.Message);

  //   if (this.isSuccess == false) {
  //     this.type = 'error';
  //     this.notification.create(
  //       this.type,
  //       'Operation failed',
  //       this.resMessage
  //     );
  //     this.current += 1;
  //     this.changeContent();
  //   }

  //   if (this.responsecode !== 3) {
  //     this.errorMessage = error.error.message;
  //     this.errorContent = error.error.errors;
  //     this.type = 'error';
  //     this.notification.create(
  //       this.type,
  //       'Operation not successfull',
  //       this.errorMessage
  //     );
  // }
}

reloaded(): void{
  location.reload();
}


}
