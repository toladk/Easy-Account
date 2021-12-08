import { Component, OnInit } from '@angular/core';
import { CustomerAccountService } from 'src/app/Services/customer-account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-account-detail-inquiry',
  templateUrl: './account-detail-inquiry.component.html',
  styleUrls: ['./account-detail-inquiry.component.css']
})
export class AccountDetailInquiryComponent implements OnInit {

  accountInquiryForm: FormGroup;

  isLoadingOne = false;
  instructPage = true;
  detailPage = false;
  inquiryAccountDetail: any;

  constructor(
    private customerAccount: CustomerAccountService,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.accountInquiryForm = this.formBuilder.group({
      accountNumber: ['', Validators.required],
    });
  }

  clear(){
    this.accountInquiryForm.reset();
  }

  getInquiryAccount(){
    this.isLoadingOne = true;
    this.customerAccount.getInquiryAccount(this.accountInquiryForm.value.accountNumber).subscribe((result: any) => {
      this.inquiryAccountDetail = result.accountDetails;
      this.isLoadingOne = false;
      this.notification.success('Account Details', 'Account Details Fetch Successfully!!');
      this.clear();
      this.instructPage = false;
      this.detailPage = true;
    }, error => {
      this.isLoadingOne = false;
      this.notification.error('Account Details', error.error.message || error.error.responseMessage);
    });
  }

  goingBack(){
    this.instructPage = true;
    this.detailPage = false;
  }

}
