import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-useraudit',
  templateUrl: './useraudit.component.html',
  styleUrls: ['./useraudit.component.css']
})
export class UserauditComponent implements OnInit {

  baseEnv = `${environment.baseUrl}${environment.verssion}`;

  filterForm: FormGroup;

  auditUserList = [];

  isSpinning = false;
  auditUserDownload: any;

  constructor(
    private Jarwis: JarwisService,
    private notification: NzNotificationService,
    private formBuilder: FormBuilder,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      inputter: ['', Validators.required],
      authorizer: ['', Validators.required],
      data: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    this.getAuditUser();
  }

  getAuditUser(): void{
    this.Jarwis.getAuditUser().subscribe((result: any) => {
      this.auditUserList = result;
    }, error => {
      this.notification.error('error', error.error.respMessag || error.error.message);
    });
  }

  getFilterUser(): void{
    this.isSpinning = true;
    const startDate = this.datepipe.transform(this.filterForm.value.startDate, 'dd-MM-yyyy');
    const endDate = this.datepipe.transform(this.filterForm.value.endDate, 'dd-MM-yyyy');
    // tslint:disable-next-line:max-line-length
    this.Jarwis.getAuditUserFilter(this.filterForm.value.inputter, this.filterForm.value.authorizer, startDate, endDate).subscribe((result: any) => {
      this.auditUserList = result;
      this.notification.success('User Audit', 'User fetch succcessfully !!');
      this.isSpinning = false;
    }, error => {
      this.notification.error('error', error.error.respMessag || error.error.message);
      this.isSpinning = false;
    });
  }

  downloadFilterUser(): void{
    const startDate = this.datepipe.transform(this.filterForm.value.startDate, 'dd-MM-yyyy');
    const endDate = this.datepipe.transform(this.filterForm.value.endDate, 'dd-MM-yyyy');
    const downloadLink = `${this.baseEnv}audit/users/download?inputter=${this.filterForm.value.inputter}&authorizer=${this.filterForm.value.authorizer}&startDate=${startDate}&endDate=${endDate}`;
    window.open(downloadLink);
  }

}
