import { Component, Injectable, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgForm,  FormBuilder, FormControl, FormGroup, Validators, FormArray  } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { CustomerAccountService } from 'src/app/Services/customer-account.service';
import { differenceInCalendarDays, setHours } from 'date-fns';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-corporate-new',
  templateUrl: './corporate-new.component.html',
  styleUrls: ['./corporate-new.component.css']
})
export class CorporateNewComponent implements OnInit {

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

  // For date and lower
  today = new Date();
  timeDefaultValue = setHours(new Date(), 0);

  corpForm: FormGroup;
  approveForm: FormGroup;
  accountForm: FormGroup;

  show = true;
  show2 = false;
  showAppro = true;
  showAppro2 = false;
  showForm = true;
  showFormRest = true;
  validateBtn = true;
  validateBtn2 = false;
  validateBtn3 = false;
  showValidate = true;
  showValidate2 = false;
  showUpda = true;
  showUpda2 = false;
  isLoadingOne = false;

  drawerOpen = false;
  drawerOpen2 = false;
  drawerOpen3 = false;
  drawerOpen4 = false;
  drawerOpen5 = false;
  drawerOpen6 = false;

  customerTYPE = 'corporate';
  allPendingCorpList = [];
  allApprovedCorpList = [];
  allRejectedCorpList = [];
  allSectorList = [];
  allSubSectorList = [];
  allSegmentList = [];
  allSubsegmentList = [];
  allSubsegmentValueList = [];
  allSubsegmentValueList2 = [];
  allCityList = [];
  allStateList = [];
  allSchemeCodeList = [];
  allschemeTypeList = [];
  allSubHeadeCodeList = [];
  allSolList = [];
  allDocumentTypeList = [];
  allDocumentCodeList = [];

  codeNo = '+234';
  midNo = '(0)';

  // Pagination
  pagination = 1;
  paginationApproved = 1;
  paginationRejected = 1;

  // For Tabs
  indextab = 'First-content';
  rbatchId: any;
  currenttab = 0;
  batchNumber: any;

  // For Stepper
  current =  0;
  index = 'First-content';

  corporateResult: any;
  userDetailsResult: any;
  userId: any;
  corporateDetails: any;
  accountCorporateName: any;
  accountEmail: any;
  accountKeyContactPerson: any;
  accountAddress: any;
  accountRegisterationNo: any;
  accountDateofIncor: any;
  accountCustomerId: any;
  accountPhoneNo: any;
  accountAppId: any;
  accountId: any;
  accountAccountNo: any;
  accountLimitAmount: any;
  accountCurrency: any;
  accountPrimaryRm: any;
  accountSchemeCode: any;
  accountSchemeType: any;
  accountSubSectorCode: any;
  accountSectorCode: any;
  accountSubSegment: any;
  accountSegment: any;
  accountSolId: any;
  accountDocumemtCode: any;
  accountDocumentTydeCode: any;
  accountReferenceNo: any;
  accountRequestType: any;
  accountIntroducerCode: any;
  accountState: any;
  accountCity: any;
  approveResult: any;
  customerVerificationDetails: any;
  getRmCodeDetails: any;
  corporateAccountResult: any;
  accountPhoneNoSlice: any;
  corporatenameFetch = '';
  resultRmCode = '';

  Role: any;
  public admin: boolean;
  public authorizeUser: boolean;
  profResponds: any;
  me: any;
  slicedDate: any;
  slicedDateIssue: any;
  customerInquiryDetail: any;
  selectElementText: any;
  updateCustomerAccountDetails: any;
  updateId: any;

  constructor(
    private ngxService: NgxUiLoaderService,
    private nzMessageService: NzMessageService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private actRoute: ActivatedRoute,
    private jarwisService: JarwisService,
    private Auth: AuthService,
    private customerAccount: CustomerAccountService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.corpForm = this.formBuilder.group({
      corporateName: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9]*$')]],
      dateOfIncorporation: ['', Validators.required],
      keyContactPersonName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      primaryRmId: ['', Validators.required],
      sector: ['', Validators.required],
      subSector: ['', Validators.required],
      taxId: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      segment: ['', Validators.required],
      subSegment: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email:  ['', [Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)]],
      introducerCode: [''],
      signatories: this.formBuilder.array([]),
      signatoriesToBeValidated: this.formBuilder.array([]),
    });

    this.approveForm = this.formBuilder.group({
      approveOrReject: ['', Validators.required],
      id: [''],
      comment: ['', Validators.required],
    });

    this.accountForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      cifId: ['', Validators.required],
      // customerType: ['', Validators.required],
      corporateName: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9]*$')]],
      dateOfIncorporation: ['', Validators.required],
      keyContactPersonName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      primaryRmId: ['', Validators.required],
      sector: ['', Validators.required],
      subSector: ['', Validators.required],
      taxId: ['', Validators.required],
      registrationNumber: ['',Validators.required],
      segment: ['', Validators.required],
      subSegment: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email:  ['', [Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)]],
      countryOfIssue:  ['NG', Validators.required],
      currency:  ['', Validators.required],
      documentCode:  ['', Validators.required],
      documentIssueDate:  ['', Validators.required],
      documentTypeCode:  ['', Validators.required],
      expiryDate:  ['', Validators.required],
      glSubHeadCode:  ['', Validators.required],
      // limitAmount:  ['', Validators.required],
      placeOfIssue:  ['0029', Validators.required],
      referenceNumber:  ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      // sanctionDate:  ['', Validators.required],
      schemeCode:  ['', Validators.required],
      schemeType:  ['', Validators.required],
      solId:  ['', Validators.required],
      fakeAss:  ['', Validators.required],
      // rmCode: ['', Validators.required],
      signatories: this.formBuilder.array([]),
      introducerCode: ['']
    });

    this.jarwisService.myProfile().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
        this.Role = this.me.role;
        console.log('checking Role', this.Role);
        if (this.Role === 'admin') {
          this.admin = true;
          this.authorizeUser = true;
        } else if (this.Role === 'inputter') {
          this.admin = true;
        } else if (this.Role === 'authorizer') {
          this.authorizeUser = true;
        } else {
          this.admin = false;
          this.authorizeUser = false;
        }
      }
    );

    this.getAllPendingCorporate();
    this.getAllSector();
    this.getAllSegment();
    this.getAllState();
    this.getUserProfile();
    this.getSchemeType();
    this.getDocumentType();
    this.getAllCity();

  }

  // For date and lower
  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, this.today) > 0

  open(){
    this.drawerOpen = true;
  }
  close(){
    this.drawerOpen = false;
    this.corpForm.reset();
  }

  open2(){
    this.drawerOpen2 = true;
  }
  close2(){
    this.drawerOpen2 = false;
  }

  open3(){
    this.drawerOpen3 = true;
  }
  close3(){
    this.drawerOpen3 = false;
    this.approveForm.reset();
  }

  open4(){
    this.drawerOpen4 = true;
  }
  close4(){
    this.drawerOpen4 = false;
    this.accountForm.reset();
  }

  open5(){
    this.drawerOpen5 = true;
  }
  close5(){
    this.drawerOpen5 = false;
    this.corpForm.reset();
  }

  open6(){
    this.drawerOpen6 = true;
  }
  close6(){
    this.drawerOpen6 = false;
    this.accountForm.reset();
  }

  // For tab changes
  tab(val) {
    this.rbatchId = val;
    if (this.rbatchId === 'firstTab') {
        this.currenttab = 0;
        this.changetab();
        this.getAllPendingCorporate();
        this.batchNumber = '';
      }

    if (this.rbatchId === 'secondTab') {
        this.currenttab = 1;
        this.changetab();
        this.getAllApprovedCorporate();
        this.show = true;
        this.batchNumber = '';
      }

    if (this.rbatchId === 'thirdTab') {
        this.currenttab = 2;
        this.changetab();
        this.getAllRejectedCorporate();
        this.batchNumber = '';
      }
  }
  changetab(){
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

    }
  }

  // For Stepper
  changeContent(){
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
        this.index = 'Third-content';
        break;
      }
      case 3: {
        this.index = 'Fourth-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }
  pre(){
    this.current -= 1;
    this.changeContent();
  }

  next(){
    this.current += 1;
    this.changeContent();
  }
  done(){
    console.log('done');
  }

  // Sorting
  key = 'id';
  reverse = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  getUserProfile(){
    this.jarwisService.myProfile().subscribe((result: any) => {
      this.userDetailsResult = result;
      this.userId = this.userDetailsResult.emp_id;
    });
  }

  getAllPendingCorporate(){
    this.show = true;
    this.show2 = false;
    this.customerAccount.allPendingCorporate().subscribe((result: any) => {
      this.allPendingCorpList = result.details;
      if ( this.allPendingCorpList === undefined || this.allPendingCorpList.length === 0 ) {
        this.show = false;
        this.show2 = true;
      }
      this.show = false;
      this.show2 = true;
    }, error => {
      this.notification.error( 'Pending Corporate', error.error.message )
    });
  }

  getAllApprovedCorporate(){
    this.show = true;
    this.show2 = false;
    this.customerAccount.CorporateAccountAuthorized().subscribe((result: any) => {
      this.allApprovedCorpList = result.details;
      this.show = false;
      if ( this.allApprovedCorpList === undefined || this.allPendingCorpList.length === 0 ) {
        this.show = false;
        this.show2 = true;
      }
      this.show = false;
      this.show2 = true;
    }, error => {
      this.notification.error( 'Approved Corporate', error.error.message )
    });
  }

  getAllRejectedCorporate(){
    this.show = true;
    this.show2 = false;
    this.customerAccount.CorporateAccountRejected().subscribe((result: any) => {
      this.allRejectedCorpList = result.details;
      if ( this.allRejectedCorpList === undefined || this.allPendingCorpList.length === 0 ) {
        this.show = false;
        this.show2 = true;
      }
      this.show = false;
      this.show2 = true;
    }, error => {
      this.show = true;
      this.show2 = false;
      this.notification.error( 'Rejected Corporate', error.error.message )
    });
  }

  getAllSector(){
    this.jarwisService.validCodesSectors().subscribe((result: any) => {
      this.allSectorList = result;
    });
  }

  getSubSector(){
    this.jarwisService.validCodesSubSectors().subscribe((result: any) => {
      this.allSubSectorList = result;
    });
  }

  getAllSegment(){
    this.jarwisService.validCodesSegmentsCustomer().subscribe((result: any) => {
      this.allSegmentList = result;
    });
  }

  getSubSegment(){
    this.jarwisService.validCodesSubSegmentsCustomer().subscribe((result: any) => {
      this.allSubsegmentList = result;
    });
  }

  getSubSegmentByValue(){
    this.jarwisService.getSubSegmentsCustomer(this.corpForm.value.segment).subscribe((result: any) => {
      this.allSubsegmentValueList = result;
    });
  }

  getSubSegmentByValue2(){
    this.jarwisService.getSubSegmentsCustomer(this.accountForm.value.segment).subscribe((result: any) => {
      this.allSubsegmentValueList2 = result;
    });
  }

  getAllState(){
    this.jarwisService.validCodesStates().subscribe((result: any) => {
      this.allStateList = result;
    });
  }

  getAllCity(){
    this.jarwisService.validCodesCities().subscribe((result: any) => {
      this.allCityList = result;
    });
  }

  clearForm(){
    this.corpForm.reset();
  }
  clearFormApprove(){
    this.approveForm.reset();
  }
  clearFormAccount(){
    this.accountForm.reset();
  }

  submitCorporate(): void{
    this.corpForm.value.introducerCode = this.userId;
    this.corpForm.value.phoneNumber = this.codeNo + this.midNo + this.corpForm.value.phoneNumber;
    this.corpForm.value.dateOfIncorporation = this.datePipe.transform(this.corpForm.value.dateOfIncorporation, 'dd-MM-yyyy');
    this.customerAccount.CreateCustomerCorporate(this.corpForm.value).subscribe((result: any) => {
      this.corporateResult = result;
      this.close();
      this.clearForm();
      this.getAllApprovedCorporate();
      this.getAllRejectedCorporate();
      this.getAllPendingCorporate();
      this.resultRmCode = '';
      this.notification.success( 'Create Corporate', 'Corporate Account Created Successfully !!' )
    }, error => {
      this.notification.error( 'Create Corporate', error.error.message );
    });
  }

  viewCorporateAccount(id){
    this.open2();
    this.customerAccount.InquiryCorporateDetails(id).subscribe((result: any) => {
      this.corporateDetails = result.details;

      this.accountId = this.corporateDetails.id;
      this.accountCorporateName = this.corporateDetails.corporate_name;
      this.accountEmail = this.corporateDetails.email;
      this.accountKeyContactPerson = this.corporateDetails.key_contact_person_name;
      this.accountAddress = this.corporateDetails.address;
      this.accountRegisterationNo = this.corporateDetails.registration_number;
      this.accountCustomerId = this.corporateDetails.customer_id;
      this.accountDateofIncor = this.corporateDetails.date_of_incorporation;
      this.accountPhoneNo = this.corporateDetails.phone_number;
      this.accountAppId = this.corporateDetails.app_id;
      this.accountAccountNo = this.corporateDetails.account_number;
      this.accountLimitAmount = this.corporateDetails.limit_amount;
      this.accountCurrency = this.corporateDetails.currency;
      this.accountPrimaryRm = this.corporateDetails.primary_rm_id;
      this.accountSchemeCode = this.corporateDetails.scheme_code;
      this.accountSchemeType = this.corporateDetails.scheme_type;
      this.accountSubSectorCode = this.corporateDetails.sub_sector;
      this.accountSectorCode = this.corporateDetails.sector_code;
      this.accountSegment = this.corporateDetails.segment;
      this.accountSubSegment = this.corporateDetails.sub_segment;
      this.accountSolId = this.corporateDetails.sol_id;
      this.accountDocumemtCode = this.corporateDetails.document_code;
      this.accountDocumentTydeCode = this.corporateDetails.document_type_code;
      this.accountReferenceNo = this.corporateDetails.reference_number;
      this.accountIntroducerCode = this.corporateDetails.introducer_code;
      this.accountRequestType = this.corporateDetails.request_type;
    });
  }

  submitApproveORReject(){
    this.showAppro = false;
    this.showAppro2 = true;
    this.approveForm.value.id = this.accountId;
    this.customerAccount.CorporateApproveSingle(this.approveForm.value).subscribe((result: any) => {
      this.approveResult = result;
      this.close2();
      this.close3();
      this.clearFormApprove();
      this.notification.success( 'Corporate Account', 'Action Taken Successfully !!');
      this.getAllApprovedCorporate();
      this.getAllRejectedCorporate();
      this.getAllPendingCorporate();
      this.showAppro = true;
      this.showAppro2 = false;
      this.approveForm.reset();
    }, error => {
      this.showAppro = true;
      this.showAppro2 = false;
      this.approveForm.reset();
      this.notification.error( 'Approve Corporate Account', error.error.message || error.error.errorResponse );
    });
  }

  customerVerification(){
    this.validateBtn = true;
    // this.validateBtn2 = true;
    // this.validateBtn3 = false;
    this.accountForm.value.customerType = this.customerTYPE;
    // tslint:disable-next-line:max-line-length
    this.customerAccount.customerInquiry(this.accountForm.value.customerId, this.accountForm.value.customerType).subscribe((result: any) => {
      this.customerVerificationDetails = result;
      this.current += 1;
      this.changeContent();
      this.corporatenameFetch = this.customerVerificationDetails.customerDetails.corporatename;
      this.notification.success( 'Verify Customer ID', 'Customer ID Verified Successfully !!' );
      this.validateBtn = true;
      // this.validateBtn2 = false;
    }, error => {
      this.validateBtn = true;
      // this.validateBtn2 = false;
      // this.validateBtn3 = false;
      this.notification.error( 'Verify Customer ID', error.error.message || error.error.errorResponse || error.error.responseMessage );
    });
  }

  //Get Scheme Type
  getSchemeType(){
    this.customerAccount.SchemeTypes().subscribe((result: any) => {
      this.allschemeTypeList = result;
    });
  }

  //Get Scheme Code
  getSchemeCode(){
    this.customerAccount.SchemeCodes(this.accountForm.value.schemeType).subscribe((result: any) => {
      this.allSchemeCodeList = result;
    });
  }

  //Get Sub Head Code
  getSubHeadCode(){
    this.getSolId();
    this.customerAccount.GlSubHeadCode(this.accountForm.value.schemeCode).subscribe((result: any) => {
      this.allSubHeadeCodeList = result;
    });
  }

  //Get Sol Id
  getSolId(){
    this.customerAccount.getSols().subscribe((result: any) => {
      this.allSolList = result;
    });
  }

  //get Document Type
  getDocumentType(){
    this.jarwisService.DocumentTypes().subscribe((result: any) => {
      this.allDocumentTypeList = result;
    });
  }

  //Get Document Code
  getAllDocumetCode(){
    this.jarwisService.DocumentCodes(this.accountForm.value.documentTypeCode).subscribe((result: any) => {
      this.allDocumentCodeList = result;
    });
  }

  //Validate RM CODE
  validateRmCode(){
    this.showValidate = false;
    this.showValidate2 = true;
    this.customerAccount.getRmCode(this.accountForm.value.rmCode).subscribe((result: any) => {
      this.getRmCodeDetails = result;
      this.showValidate = true;
      this.showValidate2 = false;
      this.notification.success( 'RM CODE', 'RM Code Validated Successfully !!' );
    }, error => {
      this.notification.error( 'RM CODE', error.error.message || error.error.errorResponse || error.error.responseMessage );
    });
  }

  validateRm(){
    this.isLoadingOne = true;
    this.customerAccount.getRmCode(this.corpForm.value.primaryRmId).subscribe((result: any) => {
      this.getRmCodeDetails = result;
      this.resultRmCode = 'success';
      this.isLoadingOne = false;
      this.notification.success( 'RM CODE', 'RM Code Validated Successfully !!' );
    }, error => {
      this.isLoadingOne = false;
      this.notification.error( 'RM CODE', error.error.message || error.error.errorResponse || error.error.responseMessage );
    });
  }

  // For Creating Multiple Fields
  signatories(): FormArray {
    return this.accountForm.get('signatories') as FormArray;
  }
  newSignatories(): FormGroup {
    return this.formBuilder.group({
      bvn: '',
      relationshipType: '',
      customerId: ''
    });
  }
  addSignatories() {
    this.signatories().push(this.newSignatories());
  }
  removeSignatories(sigIndex: number) {
    this.signatories().removeAt(sigIndex);
  }

  submitCorporateAccount(){
    delete this.accountForm.value.customerId;
    delete this.accountForm.value.codeNo;
    delete this.accountForm.value.midNo;
    this.accountForm.value.dateOfIncorporation = this.datePipe.transform(this.accountForm.value.dateOfIncorporation, 'dd-MM-yyyy');
    this.accountForm.value.documentIssueDate = this.datePipe.transform(this.accountForm.value.documentIssueDate, 'dd-MM-yyyy');
    this.accountForm.value.expiryDate = this.datePipe.transform(this.accountForm.value.expiryDate, 'dd-MM-yyyy');
    this.accountForm.value.phoneNumber = this.codeNo + this.midNo + this.accountForm.value.phoneNumber;
    console.log('checking field', this.accountForm.value);
    this.customerAccount.AccountOpeningCorporate(this.accountForm.value).subscribe((result: any) => {
      this.corporateAccountResult = result;
      this.drawerOpen4 = false;
      this.drawerOpen6 = false;
      this.notification.success( 'Corporate Account', 'Corporate Account Created Successfully !!' );
      this.getAllApprovedCorporate();
      this.getAllRejectedCorporate();
      this.getAllPendingCorporate();
      this.clearFormAccount();
      this.current = 0;
      this.changeContent();
      this.accountForm.reset();
    }, error => {
      this.notification.error( 'Corporate Account', error.error.message || error.error.errorResponse || error.error.responseMessage );
    });
  }

  submitCorporateAccountAccount(){
    this.accountForm.value.cifId = this.accountForm.value.customerId;
    delete this.accountForm.value.customerId;
    delete this.accountForm.value.codeNo;
    delete this.accountForm.value.midNo;
    delete this.accountForm.value.fakeAss;
    this.accountForm.value.dateOfIncorporation = this.datePipe.transform(this.accountForm.value.dateOfIncorporation, 'dd-MM-yyyy');
    this.accountForm.value.documentIssueDate = this.datePipe.transform(this.accountForm.value.documentIssueDate, 'dd-MM-yyyy');
    this.accountForm.value.expiryDate = this.datePipe.transform(this.accountForm.value.expiryDate, 'dd-MM-yyyy');
    this.accountForm.value.phoneNumber = this.codeNo + this.midNo + this.accountForm.value.phoneNumber;
    console.log('checking field', this.accountForm.value);
    this.customerAccount.AccountOpeningCorporateAccount(this.accountForm.value).subscribe((result: any) => {
      this.corporateAccountResult = result;
      this.drawerOpen4 = false;
      this.drawerOpen6 = false;
      this.notification.success( 'Corporate Account', 'Corporate Account Created Successfully !!' );
      this.getAllApprovedCorporate();
      this.getAllRejectedCorporate();
      this.getAllPendingCorporate();
      this.clearFormAccount();
      this.current = 0;
      this.changeContent();
      this.corporatenameFetch = '';
      this.accountForm.reset();
    }, error => {
      this.notification.error( 'Corporate Account', error.error.message || error.error.errorResponse || error.error.responseMessage );
    });
  }

  // Update Pending Account
  updateAc(id){
    this.open5();
    this.updateId = id;
    this.customerAccount.InquiryCorporateDetails(id).subscribe((result: any) => {
      this.corporateDetails = result.details;

      this.accountId = this.corporateDetails.id;
      this.accountCorporateName = this.corporateDetails.corporate_name;
      this.accountEmail = this.corporateDetails.email;
      this.accountKeyContactPerson = this.corporateDetails.key_contact_person_name;
      this.accountAddress = this.corporateDetails.address;
      this.accountRegisterationNo = this.corporateDetails.registration_number;
      this.accountCustomerId = this.corporateDetails.customer_id;
      this.accountDateofIncor = this.corporateDetails.date_of_incorporation;
      this.accountPhoneNo = this.corporateDetails.phone_number;
      this.accountAppId = this.corporateDetails.app_id;
      this.accountAccountNo = this.corporateDetails.account_number;
      this.accountLimitAmount = this.corporateDetails.limit_amount;
      this.accountCurrency = this.corporateDetails.currency;
      this.accountPrimaryRm = this.corporateDetails.primary_rm_id;
      this.accountSchemeCode = this.corporateDetails.scheme_code;
      this.accountSchemeType = this.corporateDetails.scheme_type;
      this.accountSubSectorCode = this.corporateDetails.sub_sector;
      this.accountSectorCode = this.corporateDetails.sector_code;
      this.accountSegment = this.corporateDetails.segment;
      this.accountSubSegment = this.corporateDetails.sub_segment;
      this.accountSolId = this.corporateDetails.sol_id;
      this.accountDocumemtCode = this.corporateDetails.document_code;
      this.accountDocumentTydeCode = this.corporateDetails.document_type_code;
      this.accountReferenceNo = this.corporateDetails.reference_number;
      this.accountIntroducerCode = this.corporateDetails.introducer_code;
      this.accountRequestType = this.corporateDetails.request_type;
      this.accountState = this.corporateDetails.state;
      this.accountCity = this.corporateDetails.city;

      this.accountPhoneNoSlice = this.accountPhoneNo;
      console.log('checking slice', this.accountPhoneNoSlice);
    });
  }

  // For Creating Multiple Fields
  signatoriesToBeValidated(): FormArray {
    return this.corpForm.get('signatoriesToBeValidated') as FormArray;
  }
  signatoriesUpdate(): FormArray {
    return this.corpForm.get('signatories') as FormArray;
  }
  newSignatoriesUpdate(): FormGroup {
    return this.formBuilder.group({
      key: Date.now(),
      bvn: '',
      customerId: '',
      relationshipType: '',
      validated: false,
    });
  }
  addSignatoriesUpdate(): void {
    this.signatoriesToBeValidated().push(this.newSignatoriesUpdate());
  }
  removeSignatoriesUpdate(sigIndex: number): void {
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
      signatory.value.validated = true;
      this.signatoriesUpdate().push(this.formBuilder.group(signatory.value));
      this.notification.success('Customer ID' + signatory.value.customerId, 'Customer Id Verified Successfully!!');
      this.isLoadingOne = false;
    }, error => {
      this.isLoadingOne = false;
      this.notification.error('Customer ID', error.error.message || error.error.responseMessage);
    });
  }

  updateCustomerAccount(): void{
    this.showUpda = false;
    this.showUpda2 = true;
    delete this.corpForm.value.signatoriesToBeValidated;
    this.customerAccount.updateCustomerCorporateAccount(this.corpForm.value, this.updateId).subscribe((result: any) => {
      this.updateCustomerAccountDetails = result;
      this.notification.success('Update Account', 'Account updated successfully !!');
      this.showUpda = true;
      this.showUpda2 = false;
      this.close5();
      this.corpForm.reset();
      this.getAllApprovedCorporate();
      this.getAllRejectedCorporate();
      this.getAllPendingCorporate();
      this.corpForm.reset();
    }, error => {
      // tslint:disable-next-line:max-line-length
      this.notification.error('Update Account', error.error.respMessage || error.error.message || error.error.errorResponse || error.error.errors);
      this.showUpda = true;
      this.showUpda2 = false;
    });
  }


}
