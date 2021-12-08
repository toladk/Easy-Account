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
  selector: 'app-process-account',
  templateUrl: './process-account.component.html',
  styleUrls: ['./process-account.component.css']
})
export class ProcessAccountComponent implements OnInit {

  account = 'new';
  current = 0;
  batchNumber: string;
  index: string;
  loading: boolean;
  Inquiries: any;
  visible: boolean;
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

  ngOnInit(): void {

    this.index = 'First-content';
    this.loading = true;
    this.customerAccount.InquiryCompletedProcess().subscribe(
      data => {
        const InquiryCompletedProcess: any = data;
        this.Inquiries = InquiryCompletedProcess.details;
        this.loading = false;
      },
      _error => {
        this.loading = false;
      }
    );
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
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
    if (val === 'new') {
      this.account = 'new';
    } else if (val === 'existing'){
      this.account = 'existing';
    }
  }

}
