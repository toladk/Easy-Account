import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import * as XLSX from 'ts-xlsx';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { CustomerAccountService } from 'src/app/Services/customer-account.service';
import { TokenService } from 'src/app/Services/token.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzSelectSizeType } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-bulk-account',
  templateUrl: './bulk-account.component.html',
  styleUrls: ['./bulk-account.component.css']
})
export class BulkAccountComponent implements OnInit {

current = 0;

index = 'First-content';
response: any;
resMessage: any;
responsecode: any;
error: any;
success: any;

public CustomerForm = {
  CustomerFile: null,
  staffId: null,
};


@ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
fileUploadForm: FormGroup;
fileInputLabel: string;

myFiles: string [] = [];
sMsg = '';

arrayBuffer: any;
file: File;


disabled = false;
  profResponds: any;
  me: any;
  myId: any;
  isSuccess: any;
  batchNumber: any;
  type: string;
  account = 'account';
  myFile: string | ArrayBuffer;
constructor(
    private Jarwis: JarwisService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private customerAccount: CustomerAccountService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private nzMessageService: NzMessageService,
    private modal: NzModalService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.Jarwis.myProfile().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
        this.myId = this.me.emp_id;
      }
    );

    this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });
  }

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

      case 4: {
        this.index = 'fifth-content';
        break;
      }

      default: {
        this.index = 'error';
      }
    }
  }

  swichAccount(val): void{
    if (val === 'account') {
      this.account = 'account';
      this.current = 0;
      this.changeContent();

      this.batchNumber = '';

    } else if (val === 'customer'){
      this.account = 'customer';
      this.current = 3;
      this.changeContent();

      this.batchNumber = '';
    }
  }

  onFileSelect(event): void {
    const af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = event.target.files[0];
      console.log(file);

      if (!_.includes(af, file.type)) {

        this.type = 'error';
        this.notification.create(
          this.type,
          'Operation Failed',
          'Only EXCEL Docs Allowed!'
        );

      } else {
        this.fileInputLabel = file.name;
        this.fileUploadForm.get('myfile').setValue(file);
      }
    }
  }

  getFileDetails(e) {
    console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
    this.file = e.target.files[0];
    console.log (this.file);
  }


  uploadFiles() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        const data = new Uint8Array(this.arrayBuffer);
        const arr = new Array();
        for (let i = 0; i !== data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
        const bstr = arr.join('');
        const workbook = XLSX.read(bstr, {type: 'binary'});
        const first_sheet_name = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[first_sheet_name];
        console.log(XLSX.utils.sheet_to_json(worksheet, {raw: true}));
    };
    fileReader.readAsArrayBuffer(this.file);
    console.log (fileReader);
    console.log (this.file);

  }


  onSubmitAccountForm(){

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

      const formData = new FormData();
      formData.append('accountFile', this.fileUploadForm.get('myfile').value);
      formData.append('staffId', this.myId);

      this.customerAccount.BulkAccountOpening(formData).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }

  }

  onSubmitAccountFormSavingsCurrent(){

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
      const formData = new FormData();
      formData.append('savingsCurrentAccountFile', this.fileUploadForm.get('myfile').value);
      formData.append('staffId', this.myId);

      this.customerAccount.BulkAccountOpeningSavingsCurrent(formData).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
      );
    }

  }

  onSubmitAccountFormCorporate(){

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
      const formData = new FormData();
      formData.append('corporateAccountFile', this.fileUploadForm.get('myfile').value);
      formData.append('staffId', this.myId);

      this.customerAccount.BulkAccountOpeningCorporate(formData).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
      );
    }

  }

  onSubmitCustomerForm(){

    this.disabled = true;
    this.CustomerForm.staffId = this.myId;
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
      const formData = new FormData();
      formData.append('customerFile', this.fileUploadForm.get('myfile').value);
      formData.append('staffId', this.myId);

      this.customerAccount.BulkCustomer(formData).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
      );
    }
  }

  onSubmitAccountUpdate(){
    this.disabled = true;
    this.CustomerForm.staffId = this.myId;
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
      const formData = new FormData();
      formData.append('customerAccountFile', this.fileUploadForm.get('myfile').value);
      formData.append('staffId', this.myId);

      this.customerAccount.BulkAccountUpdate(formData).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
      );
    }
  }

  handleResponse(data): void{
    this.disabled = false;
    this.responsecode = data.responseCode;
    this.isSuccess = data.isSuccess;
    this.batchNumber =  data.batchNumber;


    console.log(data);
    // console.log(this.isSuccess);
    // console.log(this.batchNumber);

    this.uploadFileInput.nativeElement.value = '';
    this.fileInputLabel = undefined;

    // this.current += 1;
    // this.changeContent();


    if (this.isSuccess === true) {
      this.type = 'success';
      this.notification.create(
        this.type,
        'Operation successfull',
        'Batch Number Generated'
      );
    }
  }
  handleError(error): void{
    this.disabled = false;
    console.log(error.error);
    this.batchNumber = error.error.batchNumber;
    this.isSuccess = error.error.isSuccess;
    this.responsecode = error.error.responseCode;
    this.response = error.error.errorResponse;

    this.uploadFileInput.nativeElement.value = '';
    this.fileInputLabel = undefined;

    if (this.responsecode === 4) {
      this.type = 'error';
      this.notification.create(
        this.type,
        'Operation not successful',
        this.response
      );

      this.modal.error({
        nzTitle: 'Operation not successful',
        nzContent: this.response
      });
    } else if (this.responsecode === 3) {
      this.type = 'error';
      this.notification.create(
        this.type,
        'Operation Faid',
        this.response
      );
    }
    else{
      this.type = 'error';
      this.modal.error({
        nzTitle: 'Operation not successful',
        nzContent: this.response,
      });

    }
  }

  downloadFileSampleBulkRetail(){
    const link = document.createElement('a');
    link.href = '../../../../assets/upload_formats/BulkAccountsUploadRetail.xlsx';
    link.setAttribute('download', 'BulkAccountsUploadRetail.xlsx');
    document.body.appendChild(link);
    link.click();
  }
  downloadFileSampleBulkCorporate(){
    const link = document.createElement('a');
    link.href = '../../../../assets/upload_formats/BulkAccountsUploadCorporate.xlsx';
    link.setAttribute('download', 'BulkAccountsUploadCorporate.xlsx');
    document.body.appendChild(link);
    link.click();
  }
  downloadFileSampleBulkRetailSavings(){
    const link = document.createElement('a');
    link.href = '../../../../assets/upload_formats/BulkAccountsUploadRetailSavingsCurrent.xlsx';
    link.setAttribute('download', 'BulkAccountsUploadRetailSavingsCurrent.xlsx');
    document.body.appendChild(link);
    link.click();
  }
  downloadFileSampleBulkCustomerAccountInfoUpdate(){
    const link = document.createElement('a');
    link.href = '../../../../assets/upload_formats/BulkCustomerAccountInfoUpdate.xlsx';
    link.setAttribute('download', 'BulkCustomerAccountInfoUpdate.xlsx');
    document.body.appendChild(link);
    link.click();
  }

  downloadFileSampleBulkCustomerInfoUpdate(){
    const link = document.createElement('a');
    link.href = '../../../../assets/upload_formats/BulkCustomerInfoUpdate.xlsx';
    link.setAttribute('download', 'BulkCustomerInfoUpdate.xlsx');
    document.body.appendChild(link);
    link.click();
  }

}
