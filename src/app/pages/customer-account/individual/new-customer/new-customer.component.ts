import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { CustomerAccountService } from 'src/app/Services/customer-account.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HiloOpenCloseSeriesService } from '@syncfusion/ej2-angular-charts';

declare let $: any;

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  numberPattern = '^[0-9]*$';

  current = 0;
  index = 'First-content';
  image: string | ArrayBuffer;
  img: string | ArrayBuffer;
  disabled: boolean;
  disabled2 = false;
  response: any;
  resMessage: any;
  users: any;
  responsecode: any;
  success: any;

  public approval = {
    approveOrReject: null,
	  id: null,
    comment: null
  };

  data = [
    {
      name: 'Lily'
    },
    {
      name: 'Lily'
    }
  ];

  visible = false;
  corporatevisible = false;
  viewVisible = false;
  childrenVisible = false;

  public form = {
    Email: '',
    Salutation: '',
    Gender: '',
    Address: '',
    MaritalStatus: '',
    BVN: '',
    Manager: '',
    firstname: '',
    lastname: '',
    middlename: '',
    dob: '',
    phone: '',
    bvn: '',
    isStaff: '',
    employeeId: '',
    State: '',
    City: '',
  };

  public corporateForm = {
    corporateName: '',
    dateOfIncorporation: '',
    keyContactPersonName: '',
    primaryRmId: '',
    sector: '',
    subSector: '',
    taxId: '',
    registrationNumber: '',
    segment: '',
    subSegment: '',
    address: '',
    city: '',
    state: '',
    phoneNumber: '',
    email: '',
    IntroducerCode: '',
  };

  loadDetails: boolean;
  error: string;
  bvnResponse: any;
  BvnDetails: any;
  resTittle: any;
  errorResponse: any;
  showsDetails: boolean;
  type: string;
  profResponds: any;
  me: any;
  myId: any;
  disableSubmitBotton = true;
  BvnDetails2: any;
  resMessage2: any;
  responsecode2: any;
  response2: any;
  disabled3 = false;

  showsDetails3 = false;
  showsDetails4 = false;
  currenttab = 0;
  indextab = 'First-content';
  loading: boolean;
  individualAccount: any;
  individualAccountCount: any;
  isSuccess: any;
  responseCode: any;
  accountNumber: any;
  customerId: any;
  accountOpenings: any;
  accountOpeningsCount: any;
  inquiryAccountOp: any;
  requestType: any;
  isStaff: boolean;
  SectorsCode: any;
  SubSectorsCode: any;
  SegmentsCode: any;
  SubSegmentsCode: any;
  StatesCode: any;
  CitiesCode: any;
  RejectedInquiry: any;
  RejectedInquiryCount: any;
  getUserADDetails: any;
  errorDetail: any;
  allStateList = [];
  allCityList = [];

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private message: NzMessageService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private customerAccount: CustomerAccountService,
    private ngxService: NgxUiLoaderService
    // private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAllStates();
    this.getAllCities();

    this.showsDetails = false;
    this.form.isStaff = 'N';
    this.isStaff = false;

    this.Jarwis.myProfile().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
        this.myId = this.me.emp_id;
      }
    );

    this.loading = true;
    this.customerAccount.IndividualAccountPendAuth().subscribe(
      data => {
        const IndividualAccountPend: any = data;
        this.individualAccount = IndividualAccountPend.details;
        this.individualAccountCount = this.individualAccount.length;
        this.loading = false;

        // request_type
      },
      _error => {
        this.loading = false;
      }
    );

    this.customerAccount.AccountOpeningAuthorized().subscribe(
      data => {
        const AccountOpeningAuthorized: any = data;
        this.accountOpenings = AccountOpeningAuthorized.details;
        this.accountOpeningsCount = this.accountOpenings.length;
      },
      _error => {
        this.loading = false;
      }
    );

    // this.Jarwis.validCodesSectors().subscribe(
    //   data => {
    //     const validCodesSectors: any = data;
    //     this.SectorsCode = validCodesSectors;
    //   },
    //   _error => {
    //   }
    // );

    // this.Jarwis.validCodesSubSectors().subscribe(
    //   data => {
    //     const validCodesSubSectors: any = data;
    //     this.SubSectorsCode = validCodesSubSectors;
    //   },
    //   _error => {
    //   }
    // );

    // this.Jarwis.validCodesSegments().subscribe(
    //   data => {
    //     const validCodesSegments: any = data;
    //     this.SegmentsCode = validCodesSegments;
    //   },
    //   _error => {
    //   }
    // );

    // this.Jarwis.validCodesSubSegments().subscribe(
    //   data => {
    //     const validCodesSubSegments: any = data;
    //     this.SubSegmentsCode = validCodesSubSegments;
    //   },
    //   _error => {
    //   }
    // );

    // this.Jarwis.validCodesStates().subscribe(
    //   data => {
    //     const validCodesStates: any = data;
    //     this.StatesCode = validCodesStates;
    //   },
    //   _error => {
    //   }
    // );

    // this.Jarwis.validCodesCities().subscribe(
    //   data => {
    //     const validCodesCities: any = data;
    //     this.CitiesCode = validCodesCities;
    //   },
    //   _error => {
    //   }
    // );


    this.customerAccount.InquiryAccountRejected().subscribe(
      data => {
        const InquiryAccountRejected: any = data;
        this.RejectedInquiry = InquiryAccountRejected.details;
        this.RejectedInquiryCount = this.RejectedInquiry.length;
      },
      _error => {
      }
    );

  }

  viewOpen(id): void {
    this.ngxService.startLoader('loader-01');
    this.viewVisible = true;
    this.approval.id = id;
    this.approval.approveOrReject = 'A';

    this.customerAccount.InquiryAccountOpening(id).subscribe(
      data => {
        const InquiryAccountOpening: any = data;
        this.inquiryAccountOp = InquiryAccountOpening.details;
        this.requestType = this.inquiryAccountOp.request_type;
        this.ngxService.stopLoader('loader-01');
      },
      _error => {
        this.loading = false;
      }
    );
  }

  viewClose(): void {
    this.viewVisible = false;
  }

  openChildren(): void {
    this.childrenVisible = true;
  }

  closeChildren(): void {
    this.childrenVisible = false;
  }

  corporateOpen(): void {
    this.corporatevisible = true;
  }

  corporateClose(): void {
    this.corporatevisible = false;
    this.clear();
  }

  open(): void {
    this.visible = true;
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
    this.disableSubmitBotton = true;
    console.log('done');
  }

  clear(): void{
    this.form  = {

      Email: '',
      Salutation: '',
      Gender: '',
      Address: '',
      MaritalStatus: '',
      BVN: '',
      Manager: '',
      firstname: '',
      lastname: '',
      middlename: '',
      dob: '',
      phone: '',
      bvn: '',
      isStaff: '',
      employeeId: '',
      State: '',
      City: '',
    };
    this.error = '';
    this.disableSubmitBotton = true;
    this.current = 0;
    this.changeContent();
  }

  close(): void {
    this.visible = false;
    this.clear();
  }
  again(): void{
    this.clear();
  }

  tab(val): void {

    this.currenttab = val;
    switch (this.currenttab) {
      case 0: {
        this.indextab = 'First-content';
        break;
      }
      case 1: {
        this.indextab = 'Second-content';
        break;
      }
      case 2: {
        this.indextab = 'third-content';
        break;
      }
      case 3: {
        this.indextab = 'fourth-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }


  onGo(): void{
    this.disabled = true;
    this.loadDetails = true;
    if (this.form.BVN == null) {
      this.error = 'Empty field, Please inpute the Customer BVN';
      this.disabled = false;
      this.loadDetails = false;
    } else {

      this.customerAccount.BvnValidation(this.form.BVN).subscribe(
        data => {
          this.disabled = false;
          this.bvnResponse = data;
          this.BvnDetails = this.bvnResponse.bvnDetails;
          this.resMessage = this.BvnDetails.responseMessage;
          this.resTittle = this.bvnResponse.Message;
          this.errorResponse = this.bvnResponse.isSuccess;
          this.loadDetails = false;
          // this.success = this.admessage;
          this.form.Email = this.BvnDetails.email;
          this.form.firstname = this.BvnDetails.firstName;
          this.form.middlename = this.BvnDetails.middleName;
          this.form.lastname = this.BvnDetails.lastName;
          this.form.dob = this.BvnDetails.dateOfBirth;
          this.form.phone = this.BvnDetails.phoneNumber;
          this.showsDetails = true;

          if (this.errorResponse === false) {
            this.type = 'success';
            this.notification.create(
              this.type,
              this.resTittle,
              this.resMessage,
            );

            this.current = 1;
            this.changeContent();
          }
        },
        error => {
          this.error = 'Invalid credentials';
          this.loadDetails = false;
          this.disabled = false;
          this.responsecode = error.error.ResponseCode;
          this.response = error.error.ErrorResponse;
          this.resMessage = error.error.Message;

          if (this.responsecode !== 0) {
            this.type = 'error';
            this.notification.create(
              this.type,
              this.resMessage,
              this.response,
            );
          }
        },
      );

    }
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
      default: {
        this.index = 'error';
      }
    }
  }

  onCheckValidation(): void{

    if (this.form.Salutation === '' || this.form.Gender === '' ||
        this.form.Address === '' || this.form.BVN === '') {

          this.disableSubmitBotton = true;
          // this.showsDetails3 = true;

    } else {
      this.disableSubmitBotton = false;
      this.showsDetails3 = false;

    }

  }

  onCheckValidation2(): void{

    if (this.form.Salutation === '' || this.form.Gender === '' ||
        this.form.Address === '' || this.form.employeeId === '' || this.form.BVN === '') {

          this.disableSubmitBotton = true;

    } else {
      this.disableSubmitBotton = false;
      this.showsDetails4 = false;

    }

  }


  notValidForm(){
    console.log('checking', this.form);
    this.type = 'warning';
    this.notification.create(
      this.type,
      'Oops',
      'Some required feild are empty, Please preview and check'
    );
  }


  onGoParentCif(): void{
    this.disabled2 = true;
    this.loadDetails = true;
    if (this.form.Manager === '') {
      this.error = 'Empty field, Please inpute the Customer BVN';
      this.disabled = false;
      this.loadDetails = false;
      this.disabled2 = false;
    } else {

      this.customerAccount.getRmCode(this.form.Manager).subscribe(
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
          this.errorDetail = error.error.details;

          if (this.responsecode !== 0) {
            this.type = 'error';
            this.notification.create(
              this.type,
              this.resMessage2,
              this.response2,
              this.errorDetail,
            );
          }
        },
      );

    }
    // this.onCheckValidation();
  }

  checkUserADDetails(): void{
    this.disabled3 = true;
    this.loadDetails = true;
    if (this.form.employeeId === '') {
      this.error = 'Empty field, Please inpute the Customer BVN';
      this.disabled = false;
      this.loadDetails = false;
      this.disabled3 = false;
    } else {

      this.Jarwis.getEmployeeId(this.form.employeeId).subscribe(
        data => {
          this.disabled3 = false;
          const getUserADDetails: any = data;
          this.getUserADDetails = getUserADDetails.details;
          this.resMessage2 = this.getUserADDetails.Message;
          this.responsecode2 = this.bvnResponse.responseCode;
          this.loadDetails = false;

          if (this.getUserADDetails != null) {
            this.showsDetails4 = true;
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
            this.showsDetails4 = false;
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
          this.disabled3 = false;
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
  }

  onSubmit(): void{
    if (this.form.Salutation === '' || this.form.Gender === '' ||
        this.form.Address === '' || this.form.MaritalStatus === '' || this.form.Email === undefined
         || this.form.State === '' || this.form.City === '' || this.form.Manager === ''
        || this.form.isStaff === '') {
          this.notification.warning('Create Account', 'Some fields are required to be filled');
    }else {
        this.disabled = true;
        this.loadDetails = true;
      // this.form.Manager = this.myId;
        this.form.bvn = this.form.BVN;
        if (this.form.Gender == null) {
        this.error = 'Empty field, Please inpute the user A.D';
        this.disabled = false;
        this.loadDetails = false;
        } else {
            console.log(this.form);
            this.customerAccount.CreateCustomer(this.form).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error),
          );
        }

    }
  }

  handleResponse(data): void{
    this.disabled = false;
    this.disableSubmitBotton = true;
    this.current += 1;
    this.changeContent();

    this.responsecode = data.responseCode;
    this.resMessage = data.errorResponse;
    this.isSuccess = data.isSuccess;
    if (this.isSuccess === true) {

      this.loading = true;
      this.customerAccount.IndividualAccountPendAuth().subscribe(
        data => {
          const IndividualAccountPend: any = data;
          this.individualAccount = IndividualAccountPend.details;
          this.individualAccountCount = this.individualAccount.length;
          this.loading = false;
        },
        _error => {
          this.loading = false;
        }
      );

      this.type = 'true';
      this.notification.create(
        this.type,
        'operation Successful',
        'Customer Created Successfully',
      );
    }else{
      this.type = 'error';
      this.notification.create(
        this.type,
        'Operation failed',
        this.resMessage  );
    }

  }

  handleError(error): void{
    this.disabled = false;
    console.log(error);
    this.responsecode = error.error.ResponseCode;
    this.resMessage = error.error.errorResponse;
    this.isSuccess = error.error.isSuccess;
    this.response = error.error.ErrorResponse;
    this.notification.error('New Customer', error.error.responseCode || error.error.errorResponse || error.error.message || error.error.Message);

    // this.type = 'error';
    // this.notification.create(
    //     this.type,
    //     'Operation failed',
    //     this.resMessage  );

    this.current += 1;
    this.changeContent();

  }


  onAction(val): void{
    if (val === 'approve'){
      this.approval.approveOrReject = 'A';
    }else{
      this.approval.approveOrReject = 'R';
    }
    console.log(this.approval);
  }

  onStaff(val): void{
    if (val === 'approve'){
      this.form.isStaff = 'Y';
      this.isStaff = true;
    }else{
      this.form.isStaff = 'N';
      this.isStaff = false;
    }
    console.log(this.approval);
  }

  // const Id = this.message.loading('Action in progress..', { nzDuration: 0 }).messageId;

  submitApproval(){
    this.ngxService.startLoader('loader-01');
    this.customerAccount.IndividualApproveSingles(this.approval).subscribe(
        data => this.handleResponsedata(data, this.requestType),
        error => this.handleErrordata(error)
        );
  }

  handleResponsedata(data, type){
    this.disabled = false;
    this.responseCode = data.responseCode;
    this.isSuccess = data.isSuccess;
    this.resMessage = data.errorResponse;
    this.accountNumber = data.accountNumber;
    this.customerId = data.customerId;
    this.ngxService.stopLoader('loader-01');

    this.accountOpenings = data.details;

    if (type === 'Customer Creation'){
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

  handleErrordata(error){
    this.disabled = false;
    this.message.remove();

    this.responseCode = error.error.responseCode;
    this.isSuccess = error.error.isSuccess;
    this.resMessage = error.error.errorResponse;
    this.accountNumber = error.error.accountNumber;
    this.customerId = error.error.customerId;
    this.notification.error('New Customer', error.error.responseCode || error.error.errorResponse || error.error.message || error.error.Message);

    // if (this.isSuccess === false) {
    //   this.modal.error({
    //     nzTitle: 'Process failed',
    //     nzContent: this.resMessage
    //   });

    // } else {
    //   this.modal.error({
    //     nzTitle: 'Process failed',
    //     nzContent: 'Something onusual went wrong',
    //   });
    // }

  }

  getAllStates(){
    this.customerAccount.getState().subscribe((result: any) => {
      this.allStateList = result;
    }, error => {
      this.notification.error('Create CIF', error.error.responseCode || error.error.errorResponse || error.error.message || error.error.Message);
    })
  }

  getAllCities(){
    this.customerAccount.getCities().subscribe((result: any) => {
      this.allCityList = result;
    }, error => {
      this.notification.error('Create CIF', error.error.responseCode || error.error.errorResponse || error.error.message || error.error.Message);
    })
  }

}
