import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CustomerAccountService } from 'src/app/Services/customer-account.service';
import { NzButtonSize } from 'ng-zorro-antd/button';

interface ItemData {
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-authorize-individual',
  templateUrl: './authorize-individual.component.html',
  styleUrls: ['./authorize-individual.component.css']
})
export class AuthorizeIndividualComponent implements OnInit {

  listOfData: ItemData[] = [];
  visible = false;
  individualAccount: any;
  corporateAccount: any;
  current = 0;
  loading: boolean;
  index = 'First-content';
  batchNumber: string;
  rowId: number;
  disabled: boolean;
  response: any;
  resMessage: any;
  users: any;
  responsecode: any;

  public approval = {
    ApproveOrReject: null,
    Id: null,
  };
  responseCode: any;
  isSuccess: any;
  accountNumber: any;
  customerId: any;
  account = 'account';
  accountOpenings: any;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private message: NzMessageService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private customerAccount: CustomerAccountService,
  ) { }

  expandSet = new Set<number>();
  expandSet2 = new Set<number>();

  // IndividualApproveSingles
  // IndividualApproveBulk
  //
  // CorporateApproveSingle
  // CorporateApproveBulk

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.listOfData.push({
        name: `Edward King ${i}`,
        age: 32,
        address: `London`
      });
    }
    this.index = 'First-content';
    this.loading = true;
    this.customerAccount.IndividualAccountPendAuth().subscribe(
      data => {
        const IndividualAccountPend: any = data;
        this.individualAccount = IndividualAccountPend.details;
        this.loading = false;
      },
      _error => {
        this.loading = false;
      }
      );


    this.customerAccount.CorporateAccountPendAuth().subscribe(
      data => {
        const CorporateAccountPend: any = data;
        this.corporateAccount = CorporateAccountPend.details;
      },
      _error => {
        this.loading = false;
      }
    );

    this.customerAccount.AccountOpeningAuthorized().subscribe(
      data => {
        const AccountOpeningAuthorized: any = data;
        this.accountOpenings = AccountOpeningAuthorized.details;
      },
      _error => {
        this.loading = false;
      }
    );
  }

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

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  tab(val): void {
    this.current = val;
    this.changeContent();
    this.batchNumber = '';
    this.expandSet.delete(this.rowId);
  }

  done(): void {
    console.log('done');
  }

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
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
      case 5: {
        this.index = 'sixth-content';
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
      this.current = 2;
      this.changeContent();

      this.batchNumber = '';
    }
  }

  action(val, id, type){

    const Id = this.message.loading('Action in progress..', { nzDuration: 0 }).messageId;

    if (val === 'approve') {

      this.approval.ApproveOrReject = 'A';
      this.approval.Id = id;
      this.customerAccount.IndividualApproveSingles(this.approval).subscribe(
        data => this.handleResponse(data, type),
        error => this.handleError(error)
        );
    }
    if (val === 'reject') {
      this.approval.ApproveOrReject = 'R';
      this.approval.Id = id;

      this.customerAccount.IndividualApproveSingles(this.approval).subscribe(
        data => this.handleResponse(data, type),
        error => this.handleError(error)
        );
    }
  }

  action2(val, id, type){
    if (val === 'approve') {

      this.approval.ApproveOrReject = 'A';
      this.approval.Id = id;
      this.customerAccount.CorporateApproveSingle(this.approval).subscribe(
        data => this.handleResponse(data, type),
        error => this.handleError(error)
        );
    }
    if (val === 'reject') {
      this.approval.ApproveOrReject = 'A';
      this.approval.Id = id;
      this.customerAccount.CorporateApproveSingle(this.approval).subscribe(
        data => this.handleResponse(data, type),
        error => this.handleError(error)
        );
    }
  }

  handleResponse(data, type){
    this.disabled = false;
    this.message.remove();

    this.responseCode = data.responseCode;
    this.isSuccess = data.isSuccess;
    this.resMessage = data.errorResponse;
    this.accountNumber = data.accountNumber;
    this.customerId = data.customerId;

    this.accountOpenings = data.details;

    if(type === 'Customer Creation'){
      if (this.isSuccess === false) {
        this.modal.error({
          nzTitle: 'Process failed',
          nzContent: this.resMessage
        });

      } else {
        this.modal.success({
          nzTitle: 'Operation Successfull',
          nzContent: 'Customer ID: ' + this.customerId,
        });
      }
    }else{
      if (this.isSuccess === false) {
        this.modal.error({
          nzTitle: 'Process failed',
          nzContent: this.resMessage
        });

      } else {
        this.modal.success({
          nzTitle: 'Operation Successfull',
          nzContent: 'Account Number: ' + this.accountNumber,
        });
      }
    }

    this.ngOnInit();

  }

  handleError(error){
    this.disabled = false;
    this.message.remove();

    this.responseCode = error.error.responseCode;
    this.isSuccess = error.error.isSuccess;
    this.resMessage = error.error.errorResponse;
    this.accountNumber = error.error.accountNumber;
    this.customerId = error.error.customerId;

    if (this.isSuccess === false) {
      this.modal.error({
        nzTitle: 'Process failed',
        nzContent: this.resMessage
      });

    } else {
      this.modal.error({
        nzTitle: 'Process failed',
        nzContent: 'Something onusual went wrong',
      });
    }

  }
}
