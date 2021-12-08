import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CustomerAccountService } from 'src/app/Services/customer-account.service';


@Component({
  selector: 'app-documentuploads',
  templateUrl: './documentuploads.component.html',
  styleUrls: ['./documentuploads.component.css']
})
export class DocumentuploadsComponent implements OnInit {

  uploadForm: FormGroup;
  fullAccountDetails: any;

  showButton = true;
  showButton2 = false;
  showButton3 = false;
  showInputAccountNo = true;
  showUpload = false;
  showUploadButton = true;
  showUploadButton2 = false;

  accountDetailsId: any;
  uploadedDocs = [];
  myFiles: string [] = [];

  uploadResult: any;

  constructor(
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private customerAccount: CustomerAccountService,
  ) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      accountNo: [''],
      id: [''],
      documents: [this.formBuilder.array([])],
    });

  }

  validateAccount(){
    this.showButton = false;
    this.showButton2 = true;
    delete this.uploadForm.value.id;
    delete this.uploadForm.value.permission;
    this.customerAccount.validateAccountDetails( this.uploadForm.value.accountNo ).subscribe((result: any) => {
      this.fullAccountDetails = result.details;
      this.showButton3 = true;
      this.showButton2 = false;
      this.notification.success('Validate Account No', 'Account Number Validated')
      this.showInputAccountNo = false;
      this.showUpload = true;

      this.accountDetailsId = this.fullAccountDetails.id;

    },error => {
      this.showButton = true;
      this.showButton2 = false;
      this.notification.error('Validate Account No', error.error.errorResponse);
    })
  }

  // Multiple Upload
  onFileSelect(event){
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
      console.log('checking files', this.myFiles);
      const reader = new FileReader();
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.uploadedDocs.push(event.target.result);
        console.log('checking', this.uploadedDocs);
      };
      reader.readAsDataURL(event.target.files[i]);
    }

  }

  uploadDocumentsData(){
    this.showUploadButton = false;
    this.showUploadButton2 = true;
    delete this.uploadForm.value.accountNo;

    this.uploadForm.value.id = this.accountDetailsId;

    const formData: any = new FormData();
    formData.append('id', this.uploadForm.value.id);
    for (let i = 0; i < this.myFiles.length; i++) {
      formData.append('documents', this.myFiles[i]);
    }

    this.customerAccount.uploadDocumentData(formData).subscribe((result: any) => {
      this.uploadResult = result;
      this.showUploadButton = true;
      this.showUploadButton2 = false;
      this.notification.success('Multiple Upload', 'Files Uploaded Successfully');
      location.reload();
    }, error => {
      this.showUploadButton = true;
      this.showUploadButton2 = false;
      this.notification.error('Multiple Upload', error.error.message || error.error.errorResponse)
    });

  }




}
