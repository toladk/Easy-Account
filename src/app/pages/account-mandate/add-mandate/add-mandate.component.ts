import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import * as XLSX from 'ts-xlsx';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { CustomerAccountService } from 'src/app/Services/customer-account.service';
import { AccountMandateService } from 'src/app/Services/account-mandate.service';
import { TokenService } from 'src/app/Services/token.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import { differenceInCalendarDays, setHours } from 'date-fns';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-mandate',
  templateUrl: './add-mandate.component.html',
  styleUrls: ['./add-mandate.component.css']
})
export class AddMandateComponent implements OnInit {
  startDate = new Date().toISOString().slice(0, 16);

  // For date and lower
  today = new Date();
  timeDefaultValue = setHours(new Date(), 0);

  hideImagePreview = false;
  hideSignaturePreview = false;

  mandateForm: FormGroup;

  current = 0;
  submitingAll = false;

  index = 'First-content';
  response: any;
  resMessage: any;
  responsecode: any;
  error: any;
  success: any;
  showName = false;

  public CustomerForm = {
    CustomerFile: null,
    staffId: null,
  };

  public mandate = {
    accountNumber: null,
    imageFile: null,
    signatureFile: null,
  };


  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  fileInputLabel2: string;
  fileInputLabel3: string;

  myFiles: string [] = [];
  sMsg = '';

  arrayBuffer: any;
  file: File;
  veriBut = true;


  disabled = false;
  profResponds: any;
  me: any;
  myId: any;
  isSuccess: any;
  batchNumber: any;
  type: string;
  account = 'account';
  myFile: string | ArrayBuffer;
  ImageFile: string | ArrayBuffer;
  SignatureFile: string | ArrayBuffer;
  cardImageBase64: any;
  isImageSaved: boolean;
  disabledv: boolean;
  loadDetails: boolean;
  accountResponse: any;
  accountDetails2: any;
  resMessage2: any;
  responsecode2: any;
  showsDetailsv: boolean;
  showsDetails: boolean;
  response2: any;
  encodedSignature: string;
  accountNumberName: any;
  validateCheckingItem = '';
  constructor(
    private Jarwis: JarwisService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private customerAccount: CustomerAccountService,
    private AccountMandate: AccountMandateService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private nzMessageService: NzMessageService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.mandateForm = this.formBuilder.group({
      accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      accountName: [''],
      imageFile: [null],
      signatureFile: [null],
      signatureExpiryDate: ['12-30-2099'],
      imageExpiryDate: ['12-30-2099'],
      remarks: [''],
    });


    this.Jarwis.myProfile().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
        this.myId = this.me.emp_id;
      }
    );

    this.fileUploadForm = this.formBuilder.group({
      myfile: [''],
      remarks: ['']
    });
  }

  // For date and lower
  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, this.today) < 0

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  tab(val): void {
    this.current = val;
    this.changeContent();
    this.batchNumber = '';
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


  clear(){
    this.mandateForm.reset();
  }

  validAccoundNumber(): void{
    this.disabledv = true;
    this.loadDetails = true;
    this.veriBut = false;
    if (this.mandateForm.value.accountNumber === '') {
      this.error = 'Empty field, Please inpute the Customer Account number';
      this.veriBut = true;
      this.loadDetails = true;
      this.disabledv = false;
    } else {

      this.customerAccount.AccountInquiry(this.mandateForm.value.accountNumber).subscribe(
        data => {
          this.disabledv = false;
          this.accountResponse = data;
          this.accountDetails2 = this.accountResponse.accountDetails;
          this.resMessage2 = this.accountResponse.responseMessage;
          this.responsecode2 = this.accountResponse.responseCode;
          this.loadDetails = false;
          this.showsDetailsv = true;

          this.accountNumberName = this.accountDetails2.account_name;
          this.showName = true;
          this.validateCheckingItem = this.accountResponse.accountDetails.email;

          if (this.responsecode2 === '0') {
            this.type = 'success';
            this.notification.create(
              this.type,
              this.resMessage2,
              'Valid Account Number',
            );
            this.error = '';
          }
        },
        error => {
          this.error = error.error.responseMessage;
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
  }

  onFileSelect3(event): void{
    if (event.target.files.length > 0) {

      const file = event.target.files[0];
      this.fileInputLabel3 = file.name;
      const reader1 = new FileReader();

      reader1.onload = () => {
        this.ImageFile = reader1.result;
      };
      reader1.readAsDataURL(file);
      this.hideImagePreview = true;
    }

    const file = (event.target as HTMLInputElement).files[0];
    this.mandateForm.patchValue({
      imageFile: file
    });
    this.mandateForm.get('imageFile').updateValueAndValidity()

  }

  onFileSelect2(event): void{

    if (event.target.files.length > 0) {

      const files = event.target.files[0];
      this.fileInputLabel2 = files.name;
      const reader = new FileReader();

      reader.onload = () => {
        this.SignatureFile = reader.result;
      };
      reader.readAsDataURL(files);
      this.hideSignaturePreview = true;
    }

    const file = (event.target as HTMLInputElement).files[0];
    this.mandateForm.patchValue({
      signatureFile: file
    });
    this.mandateForm.get('signatureFile').updateValueAndValidity()
    console.log('checking form2', this.mandateForm.get('signatureFile').updateValueAndValidity())
  }


  onFileSelect(event): void {
    // const af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = event.target.files[0];

      this.fileInputLabel = file.name;
      this.fileUploadForm.get('myfile').setValue(file);
    }
  }
  onSubmitBulkMandate(){

    this.disabled = true;
    if (!this.fileUploadForm.get('myfile').value) {
      this.disabled = false;
      this.type = 'error';
      this.notification.create(
        this.type,
        'Operation not successfull',
        'Please fill valid details!'
      );
      return false;
    } else{

      const formData: FormData = new FormData();
      formData.append('mandateFile', this.fileUploadForm.get('myfile').value);
      formData.append('staffId', this.myId);
      formData.append('remarks', this.fileUploadForm.get('remarks').value);

      this.AccountMandate.CreateBulkMandate(formData).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }

  }

  onSubmitSingleMandate(): void{
    // this.mandate.imageFile = this.ImageFile;
    // this.mandate.signatureFile = this.SignatureFile;

    // const img: any = this.ImageFile;
    // this.mandate.imageFile = img.slice(22, img.length);

    // const sign: any = this.SignatureFile;
    // this.mandate.signatureFile = sign.slice(22,  sign.length);

    // tslint:disable-next-line:max-line-length
    if (this.mandateForm.value.signatureExpiryDate === '' || this.mandateForm.value.imageExpiryDate === '' || this.mandateForm.value.remarks === ''){
      this.notification.warning('Single Mandate', 'All fields are required!!');
    } else {
      this.disabled = true;
      // this.mandateForm.value.signatureExpiryDate = this.datePipe.transform(this.mandateForm.value.signatureExpiryDate, 'dd-MM-yyyy');
      // this.mandateForm.value.imageExpiryDate = this.datePipe.transform(this.mandateForm.value.imageExpiryDate, 'dd-MM-yyyy');

      let formData: any = new FormData();
      formData.append("accountNumber", this.mandateForm.get('accountNumber').value);
      formData.append("accountName", this.accountNumberName);
      formData.append("imageFile", this.mandateForm.get('imageFile').value);
      formData.append("signatureFile", this.mandateForm.get('signatureFile').value);
      formData.append('signatureExpiryDate', this.datePipe.transform(this.mandateForm.get('signatureExpiryDate').value, 'yyyy-MM-dd'));
      formData.append("imageExpiryDate", this.datePipe.transform(this.mandateForm.get('imageExpiryDate').value, 'yyyy-MM-dd'));
      formData.append("remarks", this.mandateForm.get('remarks').value);
      console.log('checking', formData)

      this.AccountMandate.CreateMandate(formData).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }
  }

  handleResponse(data): void{
    console.log('checking form', data)
    this.disabled = false;
    this.responsecode = data.responseCode;
    this.isSuccess = data.isSuccess;
    this.batchNumber =  data.batchNumber;
    this.validateCheckingItem = '';
    this.clear();

    // this.uploadFileInput.nativeElement.value = '';
    // this.fileInputLabel = undefined;

    if (this.isSuccess === true) {
      this.type = 'success';
      this.modal.success({
        nzTitle: 'Operation successfull',
        nzContent: 'Batch Number: ' + this.batchNumber,
      });
      this.mandate.accountNumber = '';
      this.fileInputLabel3 = '';
      this.fileInputLabel2 = '';
      this.fileInputLabel = '';
      this.hideImagePreview = false;
      this.hideSignaturePreview = false;
      this.showName = false;
    }
    window.location.reload();
  }

  handleError(error): void{
    this.disabled = false;
    this.response = error.error.errorResponse;
    this.notification.error('Add Single Mandate', error.error.errors.signatureFile || error.error.errors.imageFile || error.error.errorResponse);

    this.uploadFileInput.nativeElement.value = '';
    this.fileInputLabel = undefined;

    if (this.responsecode === 3) {
      this.type = 'error';
      this.notification.create(
        this.type,
        this.resMessage,
        this.response,
      );
    }

    if (this.responsecode !== 3) {
      this.type = 'error';
      this.notification.create(
        this.type,
        'Operation not successfull',
        this.response
      );
    }
  }

}
