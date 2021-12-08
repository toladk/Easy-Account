import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AccountMandateService } from 'src/app/Services/account-mandate.service';
import { NzButtonSize } from 'ng-zorro-antd/button';

interface ItemData {
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-manage-mandate',
  templateUrl: './manage-mandate.component.html',
  styleUrls: ['./manage-mandate.component.css']
})
export class ManageMandateComponent implements OnInit {

  listOfData: ItemData[] = [];
  visible = false;
  individualAccount: any;
  corporateAccount: any;
  current = 0;
  loading: boolean;
  index = 'First-content';
  batchNumber: string;
  rowId: number;
  pendingMandate: any;
  approveAllMandate: any;
  rejectAllMandate: any;
  batchID: any;
  data: any[] = [];
  list: Array<{ loading: boolean; name: any }> = [];
  initLoading = true;
  pendingMandateByIdResponds: any;
  pendingMandateInfo: any;
  mandateDetailsById: any;
  isVisibleImage = false;
  isVisibleSignature = false;
  mandateDetailsById2: any;
  profResponds: any;
  me: any;
  firstname: any;
  lastname: any;
  job: any;
  Role: any;
  public admin: boolean;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private AccountMandate: AccountMandateService,
    private nzMessageService: NzMessageService,
    private notification: NzNotificationService,
  ) { }
  expandSet = new Set<number>();
  expandSet2 = new Set<number>();

  ngOnInit(): void {
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
        if (this.Role === 'admin') {
          this.admin = true;
        } else if (this.Role === 'authorizer') {
          this.admin = true;
        } else {
          this.admin = false;
        }
      }
    );

    this.allPendingMandate();

  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  cancel(): void {
    this.nzMessageService.info('Cancelled');
  }
  handleCancelImage(){
    this.isVisibleImage = false;
  }
  handleCancelSignature(){
    this.isVisibleSignature = false;
  }

  allPendingMandate(){
    this.index = 'First-content';
    this.loading = true;
    this.AccountMandate.PendingMandate().subscribe(
      data => {
        const PendingMandate: any = data;
        this.pendingMandate = PendingMandate.details;
        console.log('checking Mandate', this.pendingMandate);
        this.loading = false;
      },
      error => {
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

  getBatchID(sn: any, val: any): void{
    this.batchID = sn;

    if (val === 'pendingMandate') {
      this.getPendingMandateById((res: any) => {
        this.data = res.results;
        this.list = res.results;
        this.initLoading = false;
      });
    }
  }

  getPendingMandateById(callback: (res: any) => void): void {

    this.AccountMandate.getPendingMandateById(this.batchID).subscribe(
      data => {
        this.pendingMandateByIdResponds = data;
        this.pendingMandateInfo = this.pendingMandateByIdResponds.details;
      },
      (res: any) => callback(res)
    );
  }

  getPendingMandateDetailsByIdImage(id){
    this.isVisibleImage = true;
    this.AccountMandate.getPendingMandateDetailsById(id).subscribe((result: any) => {
      this.mandateDetailsById = result.details;
    });
  }
  getPendingMandateDetailsByIdSignature(id){
    this.isVisibleSignature = true;
    this.AccountMandate.getPendingMandateDetailsById(id).subscribe((result: any) => {
      this.mandateDetailsById2 = result.details;
    });
  }

  approveMandate(batch_number){
    let approveOrReject = "A"
    this.AccountMandate.approveMandate( approveOrReject, batch_number ).subscribe((result: any) => {
      this.approveAllMandate = result;
      this.allPendingMandate();
      this.notification.success( 'Approve Mandate', 'Mandate Approved Succesfully !!' )
    }, error => {
      this.notification.error( 'Approve Mandate', error.error.message || error.error.responseMessage || error.error.errorResponse );
    });
  }

  rejectMandate(batch_number){
    let approveOrReject = "R"
    this.AccountMandate.rejectMandate( approveOrReject, batch_number ).subscribe((result: any) => {
      this.rejectAllMandate = result;
      this.allPendingMandate();
      this.notification.success( 'Reject Mandate', 'Mandate Rejected Succesfully !!' );
    }, error => {
      this.notification.error( 'Reject Mandate', error.error.message || error.error.responseMessage || error.error.errorResponse );
    });
  }

}
