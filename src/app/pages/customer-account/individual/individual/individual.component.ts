import { Component, OnInit } from '@angular/core';
import { CustomerAccountService } from 'src/app/Services/customer-account.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router, ActivatedRoute } from '@angular/router';
import { columnSelectionComplete } from '@syncfusion/ej2-angular-grids';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})
export class IndividualComponent implements OnInit {
  relations = [
    {
      id: 1,
      value: 'ADM',
      name: 'ADMINISTRATOR'
    },
    {
      id: 2,
      value: 'ASSOC',
      name: 'ENTERPRISE BANK ASSOCIATE'
    },
    {
      id: 3,
      value: 'AUN',
      name: 'AUNT'
    },
    {
      id: 4,
      value: 'BIL',
      name: 'BROTHER IN LAW'
    },
    {
      id: 5,
      value: 'BRO',
      name: 'BROTHER'
    },
    {
      id: 6,
      value: 'COD',
      name: 'CO-DIRECTOR'
    },
    {
      id: 7,
      value: 'COP',
      name: 'CO-PARTNER'
    },
    {
      id: 8,
      value: 'COU',
      name: 'COUSIN'
    },
    {
      id: 9,
      value: 'COW',
      name: 'CO-WORKER'
    },
    {
      id: 10,
      value: 'DAU',
      name: 'DAUGHTER'
    },
    {
      id: 11,
      value: 'DIL',
      name: 'DAUTHER IN LAW'
    },
    {
      id: 12,
      value: 'DIS',
      name: 'DISTRIBUTOR'
    },
    {
      id: 13,
      value: 'EMP',
      name: 'EMPLOYEE'
    },
    {
      id: 14,
      value: 'EMR',
      name: 'EMPLOYER'
    },
    {
      id: 15,
      value: 'EXE',
      name: 'EXECUTOR'
    },
    {
      id: 16,
      value: 'FAT',
      name: 'FATHER'
    },
    {
      id: 17,
      value: 'FIA',
      name: 'FIANCEE'
    },
    {
      id: 18,
      value: 'FIL',
      name: 'FATHER IN LAW'
    },
    {
      id: 19,
      value: 'FIN',
      name: 'FIANCE'
    },
    {
      id: 20,
      value: 'FRD',
      name: 'FRIEND'
    },
    {
      id: 21,
      value: 'GDF',
      name: 'GRANDFATHER'
    },
    {
      id: 22,
      value: 'GDM',
      name: 'GRANDMOTHER'
    },
    {
      id: 23,
      value: 'GFM',
      name: 'GRNAD FATHER (MATERNAL)'
    },
    {
      id: 24,
      value: 'GMM',
      name: 'GRAND MOTHER (MATERNAL)'
    },
    {
      id: 25,
      value: 'GFP',
      name: 'GRAND FATHER (PATERNAL)'
    },
    {
      id: 26,
      value: 'GMP',
      name: 'GRAND MOTHER (PATERNAL)'
    },
    {
      id: 27,
      value: 'GRASO',
      name: 'GRAND SON'
    },
    {
      id: 28,
      value: 'GRD',
      name: 'GUARDIAN'
    },
    {
      id: 29,
      value: 'GUA',
      name: 'GUARANTOR'
    },
    {
      id: 30,
      value: 'HOL',
      name: 'HOLDING CO'
    },
    {
      id: 31,
      value: 'HUS',
      name: 'HUSBAND'
    },
    {
      id: 32,
      value: 'LEG',
      name: 'LEGAL GUARDIAN'
    },
    {
      id: 33,
      value: 'MIG',
      name: 'MIGRATION DATA WITH'
    },
    {
      id: 34,
      value: 'MIL',
      name: 'MOTHER IN LAW'
    },
    {
      id: 35,
      value: 'MNDT',
      name: 'MANDATE MOTHER'
    },
    {
      id: 36,
      value: 'MOT',
      name: 'MOTHER'
    },
    {
      id: 37,
      value: 'NEE',
      name: 'NIECE'
    },
    {
      id: 38,
      value: 'NEP',
      name: 'NEPHEW'
    },
    {
      id: 39,
      value: 'NGU',
      name: 'NATURAL GUARDIAN'
    },
    {
      id: 40,
      value: 'OTH',
      name: 'OTHERS'
    },
    {
      id: 41,
      value: 'POA',
      name: 'POWER OF ATTORNEY HOLDER'
    },
    {
      id: 42,
      value: 'RELPA',
      name: 'RELATED PARTY CODE'
    },
    {
      id: 43,
      value: 'SEL',
      name: 'SELF'
    },
    {
      id: 44,
      value: 'SIL',
      name: 'SON IN LAW'
    },
    {
      id: 45,
      value: 'SIS',
      name: 'SISTER'
    },
    {
      id: 46,
      value: 'SON',
      name: 'SON'
    },
    {
      id: 47,
      value: 'SPO',
      name: 'SPOUSE'
    },
    {
      id: 48,
      value: 'SSL',
      name: 'SISTER IN LAW'
    },
    {
      id: 49,
      value: 'SUB',
      name: 'SUBSIDIARY'
    },
    {
      id: 50,
      value: 'SUP',
      name: 'SUPPLIER'
    },
    {
      id: 51,
      value: 'UNC',
      name: 'UNCLE'
    },
  ];

  userForm: FormGroup;

  updateBtn1 = true;
  updateBtn2 = false;

  accountOpeningDetailsSigatoriesList = [];

  disabled: boolean;
  approveResult: any;
  disabled2= false;
  response: any;
  resMessage: any;
  myId: any;
  disableSubmitBotton = true;
  users: any;
  responsecode: any;
  success: any;
  account = 'new';
  visible = false;
  public approval = {
    approveOrReject: null,
	  id: null,
    comment: null
  };

  showApprove = true;
  showApprove2 = false
  viewVisible = false;
  viewVisible2 = false;
  viewVisible3 = false;
  approvePage = true;
  approveError = false;
  loadingUxLoader = false;
  isLoadingOne = false;
  openVi1 = false;
  openVi2 = false;
  openVi3 = false;
  openVi4 = false;
  openVi5 = false;
  childrenVisible = false;
  tabName: any;
  indextab = 'First-content';
  currenttab: any;
  loading: boolean;
  individualAccountCount: any;
  individualAccount: any;
  accountOpenings: any;
  accountOpeningsCount: any;
  RejectedInquiry: any;
  RejectedInquiryCount: any;
  accountNumber: any;
  customerId: any;
  responseCode: any;
  isSuccess: any;
  inquiryAccountOp: any;
  requestType: any;
  rbatchId: string;
  accountUpdateDetaild: any;

  // public userForm = {
  //   salutation: '',
  //   first_name: '',
  //   middle_name: '',
  //   last_name: '',
  //   email: '',
  //   address: '',
  //   age: '',
  //   date_of_birth: '',
  //   bvn: '',
  //   customer_id: '',
  //   gender: '',
  //   phone_number: '',
  //   comment: '',
  //   parent_cif: '',
  //   signatories: [],
  // };

  userFirstName: any;
  userMiddleName: any;
  userLastName: any;
  userAddress: any;
  userAge: any;
  userDOB: any;
  userEmail: any;
  userGender: any;
  userSalutation: any;
  userParentcif: any;
  userBVN: any;
  userCustomerId: any;
  userPhoneNumber: any;
  userComment: any;
  errorDisplay: any;
  retryApproveDetails: any;
  Role: any;
  public admin: boolean;
  public authorizedUser: boolean;
  profResponds: any;
  me: any;
  updateCustomerAccountDetails: any;
  selectElementText: any;
  customerInquiryDetail: any;
  customerNameDetail: string;

  constructor(
    private modal: NzModalService,
    private customerAccount: CustomerAccountService,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private ngxService: NgxUiLoaderService,
    private actRoute: ActivatedRoute,
    private Jarwis: JarwisService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      Salutation: ['', Validators.required],
      FirstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      MiddleName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      LastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      Email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,40}$')]],
      Address: ['', Validators.required],
      Age: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      DateOfBirth: ['', Validators.required],
      Bvn: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      CustomerId: ['', Validators.required],
      Gender: ['', Validators.required],
      PhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      Comment: ['', Validators.required],
      ParentCif: ['', Validators.required],
      Signatories: this.formBuilder.array([]),
      SignatoriesToBeValidated: this.formBuilder.array([]),
    });


    this.loading = true;

    this.actRoute.paramMap.subscribe((params => {
      const val = params.get('id');
      this.rbatchId = val;
      this.tab(this.rbatchId);
    }));

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

    this.accountOpeningAuthorized();

    this.customerAccount.InquiryAccountRejected().subscribe(
      data => {
        const InquiryAccountRejected: any = data;
        this.RejectedInquiry = InquiryAccountRejected.details;
        this.RejectedInquiryCount = this.RejectedInquiry.length;
      },
      _error => {
      }
    );

    // this.customerAccount.RejectedIndividualAccount().subscribe(
    //   data => {
    //     const InquiryAccountRejected: any = data;
    //     this.RejectedInquiry = InquiryAccountRejected.details;
    //     this.RejectedInquiryCount = this.RejectedInquiry.length;
    //   },
    //   _error => {
    //   }
    // );

    this.Jarwis.myProfile().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
        this.Role = this.me.role;
        console.log('checking Role', this.Role);
        if (this.Role === 'admin') {
          this.admin = true;
          this.authorizedUser = true;
        } else if (this.Role === 'inputter') {
          this.admin = true;
        } else if (this.Role === 'authorizer') {
          this.authorizedUser = true;
        } else {
          this.admin = false;
          this.authorizedUser = false;
        }
      }
    );


  }

  accountOpeningAuthorized(){
    this.loading = true;
    this.customerAccount.AccountOpeningAuthorized().subscribe(
      data => {
        const AccountOpeningAuthorized: any = data;
        this.accountOpenings = AccountOpeningAuthorized.details;
        this.loading = false;
        this.accountOpeningsCount = this.accountOpenings.length;
      },
      _error => {
        this.loading = false;
      }
    );
  }


  tab(val): void {

    if (val === 'firstTab') {
        this.currenttab = 0;
        this.changeContent2();
      }

    if (val === 'secondTab') {
        this.currenttab = 1;
        this.changeContent2();
      }

    if (val === 'thirdTab') {
        this.currenttab = 2;
        this.changeContent2();
      }
  }
  changeContent2(): void {
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
        this.indextab = 'Third-content';
        break;
      }
      default: {
        this.indextab = 'error';
      }
    }
  }


  // tab(val): void {

  //   this.currenttab = val;
  //   switch (this.currenttab) {
  //     case 0: {
  //       this.indextab = 'First-content';
  //       break;
  //     }
  //     case 1: {
  //       this.indextab = 'Second-content';
  //       break;
  //     }
  //     case 2: {
  //       this.indextab = 'third-content';
  //       break;
  //     }
  //     case 3: {
  //       this.indextab = 'fourth-content';
  //       break;
  //     }
  //     default: {
  //       this.indextab = 'error';
  //     }
  //   }
  // }

  viewOpen(id): void {
    this.ngxService.startLoader('loader-01');
    this.viewVisible = true;
    this.approval.id = id;
    this.approval.approveOrReject = true;

    this.customerAccount.InquiryAccountOpening(id).subscribe(
      data => {
        const InquiryAccountOpening: any = data;
        this.inquiryAccountOp = InquiryAccountOpening.details;
        this.requestType = this.inquiryAccountOp.request_type;
        this.userFirstName = this.inquiryAccountOp.first_name;
        this.userMiddleName = this.inquiryAccountOp.middle_name;
        this.userLastName = this.inquiryAccountOp.last_name;
        this.userAddress = this.inquiryAccountOp.address;
        this.userAge = this.inquiryAccountOp.age;
        this.userDOB = this.inquiryAccountOp.date_of_birth;
        this.userEmail = this.inquiryAccountOp.email;
        this.userGender = this.inquiryAccountOp.gender;
        this.userSalutation = this.inquiryAccountOp.salutation;
        this.userParentcif = this.inquiryAccountOp.parent_cif;
        this.userBVN = this.inquiryAccountOp.bvn;
        this.userCustomerId = this.inquiryAccountOp.customer_id;
        this.userPhoneNumber = this.inquiryAccountOp.phone_number;
        this.userComment = this.inquiryAccountOp.comment;
        this.ngxService.stopLoader('loader-01');
        this.accountOpeningDetailsSigatoriesList = this.inquiryAccountOp.signatories;
        console.log('checking', this.accountOpeningDetailsSigatoriesList);
      },
      _error => {
        this.loading = false;
      }
    );
  }

  //For Creating Multiple Fields
  signatoriesToBeValidated(): FormArray {
    return this.userForm.get('SignatoriesToBeValidated') as FormArray;
  }
  signatories(): FormArray {
    return this.userForm.get('Signatories') as FormArray;
  }
  newSignatories(): FormGroup {
    return this.formBuilder.group({
      key: Date.now(),
      customerId: '',
      relationshipType: '',
      validated: false,
      signatoryName: '',
      relationshipTypeDescription: '',
    });
  }
  addSignatories(): void {
    this.signatoriesToBeValidated().push(this.newSignatories());
  }
  removeSignatories(sigIndex: number): void {
    this.signatoriesToBeValidated().removeAt(sigIndex);
  }

  // Verifying Custmer Id
  selectChange(event: Event): void {
    // tslint:disable-next-line:no-string-literal
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    this.selectElementText = selectedOptions[selectedIndex].text;
  }
  verifyFieldCus(signatory): void{
    this.isLoadingOne = true;
    this.customerAccount.customerInquiry(signatory.value.customerId, 'retail').subscribe((result: any) => {
      this.customerInquiryDetail = result.customerDetails;
      this.customerNameDetail = `${this.customerInquiryDetail.firstname} ${this.customerInquiryDetail.middlename} ${this.customerInquiryDetail.lastname}`;
      console.log(this.customerNameDetail);
      signatory.value.validated = true;
      signatory.value.signatoryName = this.customerNameDetail;
      signatory.value.relationshipTypeDescription = this.selectElementText;
      this.signatories().push(this.formBuilder.group(signatory.value));
      this.notification.success('Customer ID' + signatory.value.customerId, 'Customer Id Verified Successfully!!');
      this.isLoadingOne = false;
    }, error => {
      this.isLoadingOne = false;
      this.notification.error('Customer ID', error.error.message || error.error.responseMessage);
    });
  }

  updateCustomerAccount(): void{
    this.updateBtn1 = false;
    this.updateBtn2 = true;
    console.log('checking form', this.approval.id);
    delete this.userForm.value.SignatoriesToBeValidated;
    this.customerAccount.updateCustomerIndividualAccount(this.userForm.value, this.approval.id).subscribe((result: any) => {
      this.updateCustomerAccountDetails = result;
      this.notification.success('Update Account', 'Account updated successfully !!');
      this.updateBtn1 = true;
      this.updateBtn2 = false;
      this.viewClose();
      this.viewClose2();
      this.userForm.reset();
    }, error => {
      this.notification.error('Update Account', error.error.respMessage || error.error.message || error.error.errorResponse);
      this.updateBtn1 = true;
      this.updateBtn2 = false;
    });
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
  viewOpen2(): void {
    this.viewVisible2 = true;
  }
  viewClose2(): void {
    this.viewVisible2 = false;
  }

  viewOpen3(): void {
    this.viewVisible3 = true;
  }
  viewClose3(): void {
    this.viewVisible3 = false;
  }

onAction(val): void{
    if (val === 'approve'){
      this.approval.approveOrReject = 'A';
    }else{
      this.approval.approveOrReject = 'R';
    }
    console.log(this.approval);
  }

  open1() {
    this.openVi1 = true;
  }
  close1() {
    this.openVi1 = false;
  }
  open2(){
    this.openVi2 = true;
  }
  close2() {
    this.openVi2 = false;
  }
  open3(){
    this.openVi3 = true;
  }
  close3() {
    this.openVi3 = false;
  }
  open4(){
    this.openVi4 = true;
  }
  close4() {
    this.openVi4 = false;
  }
  open5(){
    this.openVi5 = true;
  }
  close5() {
    this.openVi5 = false;
  }

  submitApproval(){
    this.loadingUxLoader = true;
    this.showApprove = false;
    this.showApprove2 = true;
    this.isLoadingOne = true;
    this.customerAccount.IndividualApproveSingles(this.approval).subscribe((result: any) => {
      this.approveResult = result;
      this.notification.success( 'Approve Account', result.message || result.responseMessage );
      this.showApprove = false;
      this.showApprove2 = true;
      this.isLoadingOne = false;
      this.viewClose();
      this.viewClose3();
      this.loadingUxLoader = false;
      this.approval = {
        approveOrReject: null,
        id: null,
        comment: null
      };
      this.customerAccount.IndividualAccountPendAuth().subscribe(
        data => {
          const IndividualAccountPend: any = data;
          this.individualAccount = IndividualAccountPend.details;
          this.individualAccountCount = this.individualAccount.length;
          this.loading = false;
        }
      );
    }, error => {
      this.isLoadingOne = false;
      this.loadingUxLoader = false;
      this.showApprove = true;
      this.showApprove2 = false;
      this.approvePage = false;
      this.approveError = true;
      // this.notification.error( 'Approve Account', error.error.message || error.error.errorResponse);
      this.errorDisplay = error.error.message || error.error.errorResponse;
    });
  }
  approveErrorClose(){
    this.approvePage = true;
    this.approveError = false;
    this.viewClose();
    this.viewClose3();
    this.approval = {
      approveOrReject: null,
      id: null,
      comment: null
    };
  }

  close(): void {
    this.visible = false;
  }

  handleResponsedata(data, type){
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

  handleErrordata(error){
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

  retryApproveAccount(data){
    this.loadingUxLoader = true;
    this.customerAccount.retryApproveAccount(data.id).subscribe((result: any) => {
      this.retryApproveDetails = result;
      this.notification.success('Retry Approve', 'Account Approved Successfully!!');
      this.accountOpeningAuthorized();
      this.loadingUxLoader = false;
    }, error => {
      this.loadingUxLoader = false;
      this.notification.error('Retry Approve', error.error.responseMessage || error.error.message || error.error.Message || error.error.errorResponse);
    });
  }
  cancelApprove(){

  }

}
