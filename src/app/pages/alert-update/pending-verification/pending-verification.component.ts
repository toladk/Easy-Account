import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import * as XLSX from 'ts-xlsx';
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

@Component({
  selector: 'app-pending-verification',
  templateUrl: './pending-verification.component.html',
  styleUrls: ['./pending-verification.component.css']
})
export class PendingVerificationComponent implements OnInit {

  profResponds: any;
  me: any;
  firstname: any;
  lastname: any;
  job: any;
  Role: any;
  public admin: boolean;
  public approvalItem: boolean;

  data: any[] = [];
  list: Array<{ loading: boolean; name: any }> = [];
  initLoading = true;

  loading: boolean;
  subloading = false;
  allPendingBatchAlertList = [];
  useBatchNumber: any;
  batchIdRespond: any;
  batchNumberDetails = [];
  rowId: number;
  rejectPendingAlert: any;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private AccountMandate: AccountMandateService,
    private message: NzMessageService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private customerAccount: CustomerAccountService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
  ) { }

  expandSet = new Set<number>();

  ngOnInit(): void {

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

    this.getAllPendingBatchAlert();

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
  onExpandChangeBatch(id: number, checked: boolean): void {

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

  // tslint:disable-next-line:adjacent-overload-signatures
  getBatchAlert(batchNumber: any, val: any): void{
    this.useBatchNumber = batchNumber;

    if (val === 'batchAlert') {
      this.getBatchAlertById((res: any) => {
        this.data = res.results;
        this.list = res.results;
        this.initLoading = false;
      });
    }
  }

    // tslint:disable-next-line:adjacent-overload-signatures
    getBatchAlertById(callback: (res: any) => void): void {
      this.subloading = true;
      this.customerAccount.getAllAlertByBatchNumber(this.useBatchNumber).subscribe(
        data => {
          this.batchIdRespond = data;
          this.batchNumberDetails = this.batchIdRespond.alertRecords;
          this.subloading = false;
        },
        (res: any) => callback(res)
      );
    }

  approveBatchAlert(batchNo): void{
    const approveOrReject = 'A';
    this.alertService.approvePendingBatchAlert(batchNo, approveOrReject).subscribe((result: any) => {
      this.rejectPendingAlert = result;
      this.notification.success('Approve', 'Batch approved successfully !!');
      this.getAllPendingBatchAlert();
    }, error => {
      this.notification.error('Approve', error.error.respMessage || error.error.message || error.error.errorResponse);
    });
  }

  rejectBatchAlert(batchNo): void{
    const approveOrReject = 'R';
    this.alertService.approvePendingBatchAlert(batchNo, approveOrReject).subscribe((result: any) => {
      this.rejectPendingAlert = result;
      this.notification.success('Reject', 'Batch rejected successfully !!');
      this.getAllPendingBatchAlert();
    }, error => {
      this.notification.error('Reject', error.error.respMessage || error.error.message || error.error.errorResponse);
    });
  }

}
