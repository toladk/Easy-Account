
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AccountMandateService } from 'src/app/Services/account-mandate.service';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { CustomerAccountService } from 'src/app/Services/customer-account.service';
import {AlertService} from 'src/app/Services/alert.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ItemData {
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-single-account',
  templateUrl: './single-account.component.html',
  styleUrls: ['./single-account.component.css']
})
export class SingleAccountComponent implements OnInit {
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  numberPattern = '^[0-9]{10}$';
  alphaPattern = '[A-Za-z]{1,115}';
  nameSpacePattern = '^[a-zA-Z ]*$';

  deleteForm: FormGroup;

  public alertPayload = {
    accountNumber: '',
    phone_number: '',
    email: '',
    showBalance: '',
  };

  public phoneHeaher = {
    code: '+234',
    state: '(0)',
    number: '',
  };

  public deleteRow = {
    accountNumber: '',
    phoneNumber: null,
    email: null,
  };

  public search = {
    accountNumber: '',
  };

  listOfData: ItemData[] = [];
  visible = false;
  visibleDetails = false;
  visibleDeleteDetails = false;
  visiblePendingAlert = false;
  visiblePendingAlertDetails = false;
  isLoadingOneReject = false;
  isLoadingOneApprove = false;
  visiblePendingBatchAlert = false;
  individualAccount: any;
  corporateAccount: any;
  current = 0;
  index = 'Create-Alert';
  batchNumber: string;
  rowId: number;
  pendindMandate: any;
  error: string;
  disabled: boolean;
  loadDetails: boolean;
  accountResponse: any;
  accountDetails2: any;
  resMessage2: any;
  responsecode2: any;
  type: string;
  response2: any;
  disabledv = false;
  showsDetailsv = false;
  isLoadingOne = false;
  deleteInfo = false;
  alertRecords: any;
  alertRecords2 = [];
  responseCode: any;
  isSuccess: any;
  mandate: any;
  fileInputLabel3: string;
  fileInputLabel2: string;
  fileInputLabel: string;
  response: any;
  uploadFileInput: any;
  responsecode: number;
  account_name: any;
  errorResponse: any;
  id: string;
  searchTable = false;
  loadTable = true;
  accountemail: any;
  accountdetailphone_number: any;
  singleAlertDetailsDelete = [];
  allPendingAlertList = [];
  allPendingBatchAlertList = [];


  // For table and table dropdown
  allSingleAlertList = [];
  loading: boolean;
  batchID: any;
  data: any[] = [];
  list: Array<{ loading: boolean; name: any }> = [];
  initLoading = true;
  singleAlertIdResponds: any;
  singleAlertInfo: any;
  singleAlertDetails = [];
  pendingAlertDetails: any;
  rejectPendingAlert: any;
  batchNumberDetails: any;
  useBatchNumber: any;
  profResponds: any;
  me: any;
  firstname: any;
  lastname: any;
  job: any;
  Role: any;
  public admin: boolean;
  public approvalItem: boolean;


  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private AccountMandate: AccountMandateService,
    private nzMessageService: NzMessageService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private customerAccount: CustomerAccountService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
  ) { }

  expandSet = new Set<number>();
  expandSet2 = new Set<number>();

  ngOnInit(): void {
    this.deleteForm = this.formBuilder.group({
      accountNumber: ['', Validators.required]
    });

    this.getAllSingleAlert();

    for (let i = 0; i < 100; i++) {
      this.listOfData.push({
        name: `Edward King ${i}`,
        age: 32,
        address: `London`
      });
    }

    this.Jarwis.myProfile().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
        this.firstname = this.me.first_name;
        this.lastname = this.me.last_name;
        this.job = this.me.job_title;
        this.Role = this.me.role;
        console.log('checking Role', this.Role);
        if (this.Role === 'admin') {
          this.admin = true;
          this.approvalItem = true;
        } else if (this.Role === 'sac') {
          this.admin = true;
        } else if (this.Role === 'authorizer') {
          this.approvalItem = true;
        }
      }
    );

  }

  onSearch(){
    this.searchTable = true;
    this.loadTable = false;
    this.loading = true;
    const sortField: any = this.search.accountNumber;
    this.alertService.GetAccountAlertDetails(sortField).subscribe(
      data => {
        const GetAccountAlertDetails: any = data;
        this.alertRecords = GetAccountAlertDetails.alertRecords;

        this.responseCode = GetAccountAlertDetails.responseCode;
        this.isSuccess = GetAccountAlertDetails.isSuccess;
        this.errorResponse =  GetAccountAlertDetails.errorResponse;
        this.loading = false;
        if (this.isSuccess) {

          if ( this.alertRecords.length >= 0) {
            this.type = 'success';
            this.notification.create(
              this.type,
              'Operation Successful',
              'Details fetch successfully!!',
            );
            this.error = '';
          } else {
            this.type = 'error';
            this.notification.create(
              this.type,
              'Operation not Successful',
              'Invalid Account Number',
            );
          }
        }else{
          this.type = 'error';
          this.notification.create(
            this.type,
            'Invalid',
            this.errorResponse
          );
        }
      },
      error => {
        this.loading = false;
      }
    );

  }

  onDeleteRow( accountNumber: string,  phoneNumber: string,  email: string){

    this.deleteRow.accountNumber = accountNumber;
    this.deleteRow.phoneNumber = phoneNumber;
    this.deleteRow.email = email;

    this.modal.confirm({
      nzTitle: 'Are you sure?',
      nzContent: '<b style="color: red;">Delete Account</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.DeleteAlertDetails(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  DeleteAlertDetails(){
    this.loading = true;
    this.id = this.nzMessageService.loading('Action in progress..', { nzDuration: 0 }).messageId;
    this.alertService.DeleteAlertDetails(this.deleteRow).subscribe(
      data => {
        const DeleteAlertDetails: any = data;
        this.alertRecords = DeleteAlertDetails.alertRecords;

        this.responseCode = DeleteAlertDetails.responseCode;
        this.isSuccess = DeleteAlertDetails.isSuccess;
        this.errorResponse =  DeleteAlertDetails.errorResponse;


        this.loading = false;
        if (this.isSuccess) {
          this.nzMessageService.remove(this.id);
          if ( this.alertRecords.length >= 0) {
            this.type = 'success';
            this.notification.create(
              this.type,
              'Operation Successful',
              'Account Deleted Successfully!!',
            );
            this.getAllSingleAlert();
            this.getAccountDetailsToDelete();
            this.visibleDetails = false;
            this.error = '';
          } else {
            this.type = 'error';
            this.notification.create(
              this.type,
              'Operation not Successful',
              'Invalid Account Number',
            );
          }
        }else{
          this.nzMessageService.remove(this.id);
          this.type = 'error';
          this.notification.create(
            this.type,
            'Invalid',
            this.errorResponse
          );
        }
      },
      error => {
        this.nzMessageService.remove(this.id);
        this.loading = false;
      }
    );

  }

  onSearchCancel(){
    this.searchTable = false;
    this.loadTable = true;
    this.search.accountNumber = '';
    this.alertRecords = '';
  }


  open(): void {
    this.visible = true;
  }

  clear(): void {
    this.alertPayload.accountNumber = '';
    this.alertPayload.phone_number = '';
    this.alertPayload.email = '';
    this.alertPayload.showBalance = '';
    this.deleteRow.accountNumber = '';
    this.deleteRow.phoneNumber = '';
    this.deleteRow.email = '';
    this.search.accountNumber =  '';
    this.account_name = '';
    this.accountemail = '';
    this.accountdetailphone_number = '';
    this.phoneHeaher.number = '';
    this.current = 0;
    this.changeContent();
  }

  again(): void {
    this.clear();
    this.current = 0;
    this.changeContent();
  }

  close(): void {
    this.visible = false;
    this.clear();
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'Create-Alert';
        break;
      }
      case 1: {
        this.index = 'View-details';
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

  onAction(val1): void{
    if (val1 === 'yes'){
      this.alertPayload.showBalance = 'Y';
    }else{
      this.alertPayload.showBalance  = 'N';
    }
  }

  validAccountNumber(): void{
    this.id = this.nzMessageService.loading('Action in progress..', { nzDuration: 0 }).messageId;
    this.disabledv = true;
    if (this.alertPayload.accountNumber === '') {
      this.error = 'Empty field, Please inpute the Customer Account Number';
      this.disabledv = false;
      this.loadDetails = false;
      this.showsDetailsv = false;
    } else {

      this.customerAccount.AccountInquiry(this.alertPayload.accountNumber).subscribe(
        data => {
          this.accountResponse = data;
          this.resMessage2 = this.accountResponse.responseMessage;
          this.responsecode2 = this.accountResponse.responseCode;
          this.accountDetails2 = this.accountResponse.accountDetails;
          this.loadDetails = false;
          this.disabledv = false;

          if (this.responsecode2 === '0') {
          this.nzMessageService.remove(this.id);
          if ( this.accountDetails2 != null) {
            this.account_name = this.accountDetails2.account_name;
            this.accountemail = this.accountDetails2.email;
            this.accountdetailphone_number = this.accountDetails2.phone_number.slice(7);
            this.showsDetailsv = true;
            this.type = 'success';
            this.notification.create(
              this.type,
              this.resMessage2,
              'Valid Account Number',
            );
            this.error = '';
          } else {
            this.type = 'error';
            this.notification.create(
              this.type,
              this.resMessage2,
              'Invalid Account Number',
            );
          }
        }else {
          this.nzMessageService.remove(this.id);
          this.notification.create(
            'error',
            this.resMessage2,
            this.response2,
          );
        }
      },
        error => {
          this.nzMessageService.remove(this.id);
          this.error = 'Invalid credentials';
          this.disabledv = false;
          this.loadDetails = false;
          this.responsecode2 = error.error.responseCode;
          this.response2 = error.error.ErrorResponse;
          this.resMessage2 = error.error.responseMessage;

          if (this.responsecode2 !== 0) {
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


  onSubmitSingle(): void{
    this.disabled = true;
    this.id = this.nzMessageService.loading('Action in progress..', { nzDuration: 0 }).messageId;
    this.alertPayload.phone_number = this.phoneHeaher.code + this.phoneHeaher.state + this.accountdetailphone_number;
    this.alertPayload.email = this.accountemail;
    if (this.alertPayload.showBalance === ''){
      this.alertPayload.showBalance = 'N';
    } else if (this.alertPayload.showBalance === 'N') {
      this.alertPayload.showBalance = 'N';
    }else if (this.alertPayload.showBalance === 'Y') {
      this.alertPayload.showBalance = 'Y';
    }
    // console.log(this.alertPayload);
    this.alertService.AlertsProfile(this.alertPayload).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );

  }

  handleResponse(data): void{
    this.disabled = false;
    this.nzMessageService.remove(this.id);
    this.responseCode = data.responseCode;
    this.isSuccess = data.isSuccess;
    this.errorResponse =  data.errorResponse;

    if (this.isSuccess) {

      this.alertRecords = data.alertRecords;
      this.type = 'success';
      this.modal.success({
        nzTitle: 'Operation successfull',
        nzContent: '',
      });
      this.current += 1;
      this.changeContent();
    }
  }

  handleError(error): void{
    this.disabled = false;
    this.nzMessageService.remove(this.id);
    this.response = error.error.errorResponse;
    this.notification.error('Update Alert Profile', error.error.message || error.error.ResponseMessage || error.error.errorResponse);

    if (this.responsecode === 3) {
      this.type = 'error';
      this.notification.create(
        this.type,
        'Failed',
        this.response
      );
    }
  }










  closeDetails(){
    this.visibleDetails = false;
  }
  closeDeleteDetails(){
    this.visibleDeleteDetails = false;
  }

  openDeleteDetails(){
    this.visibleDeleteDetails = true;
  }

  getAccountDetailsToDelete(){
    this.isLoadingOne = true;
    this.customerAccount.getSingleAlertDetails(this.deleteForm.value.accountNumber).subscribe((result: any) => {
      this.singleAlertDetailsDelete = result.alertRecords;
      this.notification.success('Account Details', 'Account details fetch successfully!!');
      this.isLoadingOne = false;
      this.deleteForm.reset();
      this.deleteInfo = true;
    }, error => {
      this.isLoadingOne = false;
      this.notification.error('Account Details', error.error.message || error.error.responseMessage || error.error.Message);
    });
  }

  getAllSingleAlert(){
    this.loading = true;
    this.customerAccount.getSingleAlert().subscribe((result: any) => {
      this.alertRecords2 = result.alertRecords;
      this.notification.success('Single Alert', 'Single alert fetch successfully!!');
      this.loading = false;
    }, error => {
      this.notification.error('Single Alert', error.error.responseMessage || error.error.message || error.error.Message);
      this.loading = false;
    });
  }

  getSingleAlertDetails(accNo){
    this.visibleDetails = true;
    this.loading = true;
    this.customerAccount.getSingleAlertDetails(accNo).subscribe((result: any) => {
      this.singleAlertDetails = result.alertRecords;
      this.notification.success('Account Details', 'Account details fetch successfully!!');
      this.loading = false;
    }, error => {
      this.loading = false;
      this.notification.error('Account Details', error.error.message || error.error.responseMessage || error.error.Message);
    });
  }

  // onExpandChange(id: number, checked: boolean): void {

  //   if (checked) {
  //     this.expandSet.add(id);
  //     if (id !==  this.rowId) {
  //       this.expandSet.delete(this.rowId);
  //     }
  //     this.rowId = id;
  //   } else {
  //     this.expandSet.delete(id);
  //   }
  // }
  getSingleAlertID(sn: any, val: any): void{
    this.batchID = sn;

    if (val === 'singleAlert') {
      this.getAllAlertByBatchNumber((res: any) => {
        this.data = res.results;
        this.list = res.results;
        this.initLoading = false;
      });
    }
  }

  getAllAlertByBatchNumber(callback: (res: any) => void): void {

    this.AccountMandate.getPendingMandateById(this.batchID).subscribe(
      data => {
        this.singleAlertIdResponds = data;
        this.singleAlertInfo = this.singleAlertIdResponds.details;
      },
      (res: any) => callback(res)
    );
  }

  // get all pending alert
  allPendingAlert(): void{
    this.loading = true;
    this.alertService.getAllPendingAlert().subscribe((result: any) => {
      this.allPendingAlertList = result.alertRecords;
      console.log(this.allPendingAlertList);
      this.loading = false;
    });
  }

  openPendingAlert(): void{
    this.visiblePendingAlert = true;
    this.allPendingAlert();
  }

  closePendingAlert(): void{
    this.visiblePendingAlert = false;
  }

  onViewPendingAlertDetails(id): void{
    this.visiblePendingAlertDetails = true;
    this.alertService.getPendingAlertById(id).subscribe((result: any) => {
      this.pendingAlertDetails = result.alertRecord;
    });
  }

  closePendingAlertDetails(): void{
    this.visiblePendingAlertDetails = false;
  }

  rejectAlert(id): void{
    this.isLoadingOneReject = true;
    const approveOrReject = 'R';
    this.alertService.approvePendingAlert(id, approveOrReject).subscribe((result: any) => {
      this.rejectPendingAlert = result;
      this.notification.success('Reject', 'Alert rejected successfully !!');
      this.isLoadingOneReject = false;
      this.visiblePendingAlertDetails = false;
      this.visiblePendingAlert = false;
    }, error => {
      this.isLoadingOneReject = false;
      this.visiblePendingAlertDetails = false;
      this.visiblePendingAlert = false;
      this.notification.error('Reject', error.error.respMessage || error.error.message || error.error.errorResponse);
    });
  }

  approveAlert(id): void{
    this.isLoadingOneApprove = true;
    const approveOrReject = 'A';
    this.alertService.approvePendingAlert(id, approveOrReject).subscribe((result: any) => {
      this.rejectPendingAlert = result;
      this.notification.success('Approve', 'Alert approved successfully !!');
      this.isLoadingOneApprove = false;
      this.visiblePendingAlertDetails = false;
      this.visiblePendingAlert = false;
    }, error => {
      this.isLoadingOneApprove = false;
      this.visiblePendingAlertDetails = false;
      this.visiblePendingAlert = false;
      this.notification.error('Approve', error.error.respMessage || error.error.message || error.error.errorResponse);
    });
  }

  openPendingBatchAlert(): void{
    this.visiblePendingBatchAlert = true;
    this.getAllPendingBatchAlert();
  }

  closePendingBatchAlert(): void{
    this.visiblePendingBatchAlert = false;
  }

  getAllPendingBatchAlert(): void{
    this.loading = true;
    this.alertService.getPendingBatchAlert().subscribe((result: any) => {
      this.allPendingBatchAlertList = result.alertRecords;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.notification.error('Batch Alert', error.error.respMessage || error.error.message);
    });
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  onExpandChange(id: number, checked: boolean): void {

    if (checked) {
      this.expandSet.add(id);
      if (id !==  this.rowId) {
        this.expandSet.delete(this.rowId);
      }
      this.rowId = id;
    } else {
      this.expandSet.delete(id);
    }
  }

  getBatchNumber(batchNumber): void{
    this.useBatchNumber = batchNumber;
    this.loading = true;
    this.customerAccount.getAllAlertByBatchNumber(this.useBatchNumber).subscribe((result: any) => {
      this.batchNumberDetails = result.alertRecords;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.notification.error('Batch Alert', error.error.respMessage || error.error.message);
    });
  }

  approveBatchAlert(): void{
    const approveOrReject = 'A';
    this.alertService.approvePendingBatchAlert(this.useBatchNumber, approveOrReject).subscribe((result: any) => {
      this.rejectPendingAlert = result;
      this.notification.success('Approve', 'Batch approved successfully !!');
      this.visiblePendingBatchAlert = false;
    }, error => {
      this.visiblePendingBatchAlert = false;
      this.notification.error('Approve', error.error.respMessage || error.error.message || error.error.errorResponse);
    });
  }

  rejectBatchAlert(): void{
    const approveOrReject = 'R';
    this.alertService.approvePendingBatchAlert(this.useBatchNumber, approveOrReject).subscribe((result: any) => {
      this.rejectPendingAlert = result;
      this.notification.success('Approve', 'Batch approved successfully !!');
      this.visiblePendingBatchAlert = false;
    }, error => {
      this.visiblePendingBatchAlert = false;
      this.notification.error('Approve', error.error.respMessage || error.error.message || error.error.errorResponse);
    });
  }

}
