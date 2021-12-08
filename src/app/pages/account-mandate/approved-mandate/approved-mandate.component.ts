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
  selector: 'app-approved-mandate',
  templateUrl: './approved-mandate.component.html',
  styleUrls: ['./approved-mandate.component.css']
})
export class ApprovedMandateComponent implements OnInit {

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
  allApprovedMandateList = [];
  approvedMandateByIdResponds: any;
  approvedMandateInfo: any;
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

    this.allApprovedMandate();

  }

  allApprovedMandate(){
    this.AccountMandate.getAllApprovedMandate().subscribe((result: any) => {
      this.allApprovedMandateList = result.details;
      this.notification.success( 'Approved Mandate', 'Mandate Fetch Successfully' );
    }, error => {
      this.notification.error( 'Approved Mandate', error.error.message || error.error.ResponseMessage );
    });
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
      this.getApprovedMandateById((res: any) => {
        this.data = res.results;
        this.list = res.results;
        this.initLoading = false;
      });
    }
  }

  getApprovedMandateById(callback: (res: any) => void): void {

    this.AccountMandate.getPendingMandateById(this.batchID).subscribe(
      data => {
        this.approvedMandateByIdResponds = data;
        this.approvedMandateInfo = this.approvedMandateByIdResponds.details;
      },
      (res: any) => callback(res)
    );
  }

}
