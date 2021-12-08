import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm,  FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { CustomerAccountService } from 'src/app/Services/customer-account.service';
import { TokenService } from 'src/app/Services/token.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-pre-generated',
  templateUrl: './pre-generated.component.html',
  styleUrls: ['./pre-generated.component.css']
})
export class PreGeneratedComponent implements OnInit {

  public form = {
    accountType: null,
    numberOfAccounts: null,
    SchemeType: null,
    SchemeCode: null,
    staffId: null,
    solId: null,
    manager: null,
    introducerCode: null
}
  disabled: boolean;
  response: any;
  resMessage: any;
  users: any;
  responsecode: any;
  error: any;
  success: any;
  shemeTypes: any;
  shemecodes: any;
  selectedUser?: string;
  isLoading = false;
  profResponds: any;
  me: any;
  myId: any;
  type: string;
  isSuccess: any;
  batchNumber: any;
  loadDetails: boolean;
  disabled2: boolean;
  showsDetails3: boolean;
  current = 0;

  index = 'First-content';
  visible2: boolean;
  visible: boolean;
  showsDetails: boolean;
  isLoading2 = false;
  sols: any;
  bvnResponse: any;
  BvnDetails2: any;
  resMessage2: any;
  responsecode2: any;
  response2: any;
  disableSubmitBotton: boolean;

  constructor(
    private Jarwis: JarwisService,
    private http: HttpClient,
    private customerAccount: CustomerAccountService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private nzMessageService: NzMessageService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.Jarwis.myProfile().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
        this.myId = this.me.emp_id;
        this.form.staffId = this.myId;
      }
    );

    this.customerAccount.getSols().subscribe(
      data => { const getSols: any = data;
                this.isLoading = false;
                this.sols = getSols;
      },
    );

    this.customerAccount.SchemeTypes().subscribe(
      data => { this.isLoading = false;
                const allSchemTpes: any = data;
                this.shemeTypes = allSchemTpes;
      },
      error => {}
    );
  }

  onCheckValidation(): void{

    if (this.form.accountType === '' || this.form.numberOfAccounts === '' ||
        this.form.SchemeType === '' || this.form.SchemeCode === '') {

          this.disableSubmitBotton = true;
          // this.showsDetails3 = true;
    } else {
      this.disableSubmitBotton = false;
      this.showsDetails3 = false;
    }

  }

onGoParentCif(): void{
  this.disabled2 = true;
  this.loadDetails = true;
  if (this.form.manager === '') {
    this.error = 'Empty field, Please inpute the Customer BVN';
    this.disabled = false;
    this.loadDetails = false;
    this.disabled2 = false;
  } else {

    this.customerAccount.getRmCode(this.form.manager).subscribe(
      data => {
        this.disabled2 = false;
        this.bvnResponse = data;
        this.BvnDetails2 = this.bvnResponse.rmDetails;
        this.resMessage2 = this.bvnResponse.responseMessage;
        // this.resTittle = this.bvnResponse.Message;
        this.responsecode2 = this.bvnResponse.responseCode;
        this.loadDetails = false;

        if (this.BvnDetails2 != null) {
          this.showsDetails3 = true;
          if (this.responsecode2 === '0') {
            this.type = 'success';
            this.notification.create(
              this.type,
              this.resMessage2,
              'Valid RM Code',
            );
            this.error = '';
          }
        } else {
          this.showsDetails3 = false;
          if (this.responsecode2 === '0') {
            this.type = 'error';
            this.notification.create(
              this.type,
              this.resMessage2,
              'Invalid RM Code',
            );
            this.error = '';
          }
        }

      },
      error => {
        this.error = 'Invalid credentials';
        this.loadDetails = false;
        this.disabled2 = false;
        this.showsDetails = false;
        this.responsecode2 = error.error.responseCode;
        this.response2 = error.error.ErrorResponse;
        this.resMessage2 = error.error.responseMessage;

        if (this.responsecode !== 0) {
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
  // this.onCheckValidation();
}


  onSelectSchemeTypes(val): void {
    this.isLoading2 = true;
    const getSchemeType: any =  val;
    this.customerAccount.SchemeCodes(getSchemeType).subscribe(
      data => {
                this.isLoading2 = false;
                const allSchemCode: any = data;
                this.shemecodes = allSchemCode;
      },
      error => this.handleError(error)
    );
  }

  onSubmit(): void{
    this.disabled = true;
    this.form.staffId = this.myId;
    this.customerAccount.PREGeneration(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data): void{
    this.disabled = false;
    this.responsecode = data.responseCode;
    this.isSuccess = data.isSuccess;
    this.batchNumber =  data.batchNumber;


    console.log(this.responsecode);
    console.log(this.isSuccess);
    console.log(this.batchNumber);

    this.current += 1;
    this.changeContent();


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
    this.responsecode = error.error.ResponseCode;
    this.response = error.error.ErrorResponse;

    if (this.responsecode == 3) {
      this.type = 'error';
      this.notification.create(
        this.type,
        this.resMessage,
        this.response
      );
    }

    if (this.responsecode != 3) {
      this.type = 'error';
      this.notification.create(
        this.type,
        'Operation not successfull',
        'Something on usual went wrong'
      );
    }
  }





  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
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
      default: {
        this.index = 'error';
      }
    }
  }

  close(): void {
    this.visible = false;

    this.form.accountType = '';
    this.form.numberOfAccounts = '';
    this.form.SchemeType = '';
    this.form.SchemeCode = '';
    this.form.staffId = '';

    this.current = 0;
    this.changeContent();
  }
  again(): void{

    this.form.accountType = '';
    this.form.numberOfAccounts = '';
    this.form.SchemeType = '';
    this.form.SchemeCode = '';
    this.form.staffId = '';
    this.form.manager = '';
    this.form.solId = '';
    this.form.introducerCode = '';

    this.current = 0;
    this.changeContent();
  }

}
