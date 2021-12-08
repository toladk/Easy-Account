import { Component, Injectable, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgForm,  FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
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

declare let $: any;
declare let swal: any;
declare let toastr: any;

@Component({
  selector: 'app-corporate',
  templateUrl: './corporate.component.html',
  styleUrls: ['./corporate.component.css']
})
export class CorporateComponent implements OnInit {

listOfData: any;
visible = false;
account = 'new';
disabled = false;
corporatevisible = false;
viewVisible = false;
childrenVisible = false;

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

public validate = {
  transref: '',
};

public approval = {
  ApproveOrReject: null,
  Id: null,
  comment: null
};

validateForm!: FormGroup;
  listOfControl: Array<{ id: number; controlInstance: string; bvn: string; relationship: string; verification: string; action: boolean; bvnVerification: string; bvnAction: boolean }> = [];

  loadDetails: boolean;
  error: string;
  error2: string;
  bvnResponse: any;
  BvnDetails: any;
  resTittle: any;
  errorResponse: any;
  showsDetails: boolean;
  type: string;
  profResponds: any;
  me: any;
  myId: any;
  ImageFile: any;
  SignatureFile: any;
  fileInputLabel: any;
  fileInputLabel2: any;

offsetTop = 10;
nzOffsetBottom = 10;
public form = {
  corporateName: '',
  dateOfIncorporation: '',
  keyContactPersonName: '',
  primaryRmId: '',
  taxId: '',
  registrationNumber: '',
  sector: '',
  subSector: '',
  appid: '',
  segment: '',
  subSegment: '',
  address: '',
  city: '',
  state: '',
  cifId: '',
  schemeType: '',
  schemeCode: '',
  glSubHeadCode: '',
  solId: '',
  phoneNumber: '',
  email: '',
  countryOfIssue: 'NG',
  documentCode: '',
  documentIssueDate: '',
  documentTypeCode: '',
  placeOfIssue: '0029',
  referenceNumber: '',
  limitAmount: '',
  sanctionDate: '',
  expiryDate: '',
  introducerCode: '',
  currency: '',
  Signatories: [ ],
};

shemecodes: any;
shemeTypes: any;
LastName: any;
FirstName: any;
Name: string;
sols: any;
disableSubmitBotton: boolean;
disabled2: boolean;
BvnDetails2: any;
resMessage2: any;
responsecode2: any;
showsDetails3: boolean;
response2: any;
response: any;
resMessage: any;
users: any;
responsecode: any;
index = 'First-content';
indextab = 'First-content';
current =  0;
current2 =  0;
errorFlag: any;
errorMessage: any;
Type: any;
Title: any;
Status: any;
Detail: any;
Instance: any;
newresponse: string;
actionBotton: string;
rbatchId: string;
currenttab: number;
valueIsSuccess: any;
returnMessage: any;
isSuccess: any;
timestamp: any;
isFailure: any;
individualAccount: any;
individualAccountCount: any;
SectorsCode = [];
SubSectorsCode = [];
SegmentsCode = [];
SubSegmentsCode = [];
StatesCode = [];
CitiesCode = [];
RejectedInquiry: any;
RejectedInquiryCount: any;
accountOpenings: any;
accountOpeningsCount: any;
responseCode: any;
isLoading: boolean;
  success2: string;
  success: string;
  glheadcodes: any;
  BvnDetail: any;
  BVNName: string;
  BVNresponsecode: any;
  BVNresMessage: any;
  BVNresponse: any;
  loading: boolean;
  allDocumentCodes: any;
  allDocumentTypes: any;
  inquiryAccountOp: any;
  requestType: any;
  corpForm: any;

constructor(
            private ngxService: NgxUiLoaderService,
            private nzMessageService: NzMessageService,
            private notification: NzNotificationService,
            private modal: NzModalService,
            private actRoute: ActivatedRoute,
            private Jarwis: JarwisService,
            private Auth: AuthService,
            private customerAccount: CustomerAccountService,
            private fb: FormBuilder,
) { }

ngOnInit(): void {
  this.corpForm = this.fb.group({
    corporateName: ['', Validators.required],
    dateOfIncorporation: ['', Validators.required],
    keyContactPersonName: ['', Validators.required],
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
    phoneNumber: ['', Validators.required],
    email:  ['', Validators.required],
    introducerCode: ['', Validators.required]
  });

  // this.ngxService.startLoader('loader-02');
  this.loading = true;
  this.callvalidCodesStates();
  this.callSubSector();
  this.callSector();
  this.callSegment();
  this.callSubSegment();
  this.callCities();

  this.actRoute.paramMap.subscribe((params => {
    const val = params.get('id');
    this.rbatchId = val;
    this.tab(this.rbatchId);
  }));

  this.Jarwis.myProfile().subscribe(
    data => {
      this.profResponds = data;
      this.me = this.profResponds;
      this.myId = this.me.emp_id;
    }
  );



  this.Jarwis.DocumentTypes().subscribe(
    data => { const DocumentTypes: any = data;
              this.allDocumentTypes = DocumentTypes;
              this.isLoading = true;
    },
  );

  this.customerAccount.SchemeTypes().subscribe(
    data => { const allSchemTpes: any = data;
              this.shemeTypes = allSchemTpes;
              this.isLoading = true;
    },
  );

  this.customerAccount.getSols().subscribe(
    data => { const getSols: any = data;
              this.sols = getSols;
              this.isLoading = true;
    },
  );
  this.validateForm = this.fb.group({});
  this.addField();

  this.customerAccount.allPendingCorporate().subscribe(
    data => {
      const allPendingCorporate: any = data;
      this.individualAccount = allPendingCorporate.details;
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
      this.loading = false;
    },
    _error => {
      this.loading = false;
    }
  );

  this.customerAccount.CorporateAccountRejected().subscribe(
    data => {
      const CorporateAccountRejected: any = data;
      this.RejectedInquiry = CorporateAccountRejected.details;
      this.RejectedInquiryCount = this.RejectedInquiry.length;
    },
    _error => {
    }
  );

}

onSelectSchemeTypes(val): void {
  this.isLoading = true;
  // const getSchemeCode: any =  val.target.value;
  const getSchemeType: any =  val.target.value;
  this.customerAccount.SchemeCodes(getSchemeType).subscribe(
    data => { const allSchemCode: any = data;
              this.shemecodes = allSchemCode;
              this.isLoading = true;
              this.onCheckValidation();
    },
    error => this.handleError(error)
  );
}


callDocumentCodes(id): void {
  this.ngxService.startLoader('loader-04');
  this.isLoading = true;
  // const getSchemeCode: any =  val.target.value;
  const DocTypeCode: any =  id.target.value;
  this.Jarwis.DocumentCodes(DocTypeCode).subscribe(
    data => { const DocumentCodes: any = data;
              this.allDocumentCodes = DocumentCodes;
              this.isLoading = true;
              this.ngxService.stopLoader('loader-04');
    },
  );
}

onSelectSchemeCode(val): void {
  this.isLoading = true;
  this.ngxService.startLoader('loader-04');
  const getSchemeCode: any =  val.target.value;
  this.customerAccount.GlSubHeadCode(getSchemeCode).subscribe(
    data => { const allSchemGlHeadCode: any = data;
              this.glheadcodes = allSchemGlHeadCode;
              this.isLoading = true;
              this.ngxService.stopLoader('loader-04');
              this.onCheckValidation();
    },
    error => this.handleError(error)
  );
}


commonApi(): void{
    //  this.Jarwis.validCodesSectors().subscribe(
    //   data => {
    //     const validCodesSectors: any = data;
    //     this.SectorsCode = validCodesSectors;
    //   },
    //   _error => {
    //   }
    // );

    //  this.Jarwis.validCodesSubSectors().subscribe(
    //   data => {
    //     const validCodesSubSectors: any = data;
    //     this.SubSectorsCode = validCodesSubSectors;
    //   },
    //   _error => {
    //   }
    // );

    //  this.Jarwis.validCodesSegments().subscribe(
    //   data => {
    //     const validCodesSegments: any = data;
    //     this.SegmentsCode = validCodesSegments;
    //   },
    //   _error => {
    //   }
    // );

    //  this.Jarwis.validCodesSubSegments().subscribe(
    //   data => {
    //     const validCodesSubSegments: any = data;
    //     this.SubSegmentsCode = validCodesSubSegments;
    //   },
    //   _error => {
    //   }
    // );

    //  this.Jarwis.validCodesStates().subscribe(
    //   data => {
    //     const validCodesStates: any = data;
    //     this.StatesCode = validCodesStates;
    //     this.ngxService.stopLoader('loader-03');
    //   },
    //   _error => {
    //     this.ngxService.stopLoader('loader-03');
    //   }
    // );

    //  this.Jarwis.validCodesCities().subscribe(
    //   data => {
    //     const validCodesCities: any = data;
    //     this.CitiesCode = validCodesCities;
    //   },
    //   _error => {
    //   }
    // );

}

callCities(){
   this.Jarwis.validCodesCities().subscribe(
      data => {
        const validCodesCities: any = data;
        this.CitiesCode = validCodesCities;
      },
      _error => {
      }
    );
}

callSector(){
   this.Jarwis.validCodesSectors().subscribe(
      data => {
        const validCodesSectors: any = data;
        this.SectorsCode = validCodesSectors;
      },
      _error => {
      }
    );
}

callSubSector(){
   this.Jarwis.validCodesSubSectors().subscribe(
      data => {
        const validCodesSubSectors: any = data;
        this.SubSectorsCode = validCodesSubSectors;
      },
      _error => {
      }
    );
}

callSegment(){
   this.Jarwis.validCodesSegments().subscribe(
      data => {
        const validCodesSegments: any = data;
        this.SegmentsCode = validCodesSegments;
      },
      _error => {
      }
    );
}

callSubSegment(){
   this.Jarwis.validCodesSubSegments().subscribe(
      data => {
        const validCodesSubSegments: any = data;
        this.SubSegmentsCode = validCodesSubSegments;
      },
      _error => {
      }
    );
}

callvalidCodesSectors(): void{
  // this.ngxService.startLoader('loader-04');
  // this.Jarwis.validCodesSectors().subscribe(
  //   data => {
  //     const validCodesSectors: any = data;
  //     this.SectorsCode = validCodesSectors;
  //     this.ngxService.stopLoader('loader-04');
  //   },
  //   _error => {
  //     this.ngxService.stopLoader('loader-04');
  //   }
  // );
}

callvalidCodesStates(): void{
  // this.ngxService.startLoader('loader-04');
  this.Jarwis.validCodesStates().subscribe(
    data => {
      const validCodesStates: any = data;
      this.StatesCode = validCodesStates;
      // this.ngxService.stopLoader('loader-04');
    },
    _error => {
      // this.ngxService.stopLoader('loader-04');
    }
  );
}


callvalidCodesCities(): void{
  // this.ngxService.startLoader('loader-04');
  // this.Jarwis.validCodesCities().subscribe(
  //   data => {
  //     const validCodesCities: any = data;
  //     this.CitiesCode = validCodesCities;
  //     this.ngxService.stopLoader('loader-04');
  //   },
  //   _error => {
  //     this.ngxService.stopLoader('loader-04');
  //   }
  // );
}

  again(): void{

}


open(): void {
  this.again();
  this.actionBotton = 'create';
  this.visible = true;
  this.commonApi();
}

close(): void {
  this.visible = false;
  this.clear();
}

tab(val): void {

  if (val === 'pending') {
      this.currenttab = 0;
      this.changeContent2();
    }

  if (val === 'approved') {
      this.currenttab = 1;
      this.changeContent2();
    }

  if (val === 'rejected') {
      this.currenttab = 2;
      this.changeContent2();
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
      this.index = 'Fourth-content';
      break;
    }
    case 4: {
      this.index = 'fifth-content';
      break;
    }

    case 4: {
      this.index = 'sixth-content';
      break;
    }

    default: {
      this.index = 'error';
    }
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
      this.indextab = 'third-content';
      break;
    }
    default: {
      this.indextab = 'error';
    }
  }
}

viewOpen(id): void {
  this.ngxService.startLoader('loader-01');
  this.viewVisible = true;
  this.approval.Id = id;
  this.approval.ApproveOrReject = 'A';

  this.customerAccount.InquiryCorporateDetails(this.approval.Id).subscribe(
    data => {
      const InquiryAccountOpening: any = data;
      this.inquiryAccountOp = InquiryAccountOpening.details;
      this.requestType = this.inquiryAccountOp.request_type;
      this.ngxService.stopLoader('loader-01');
    },
    _error => {
      this.loading = false;
      this.ngxService.stopLoader('loader-01');
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
  this.commonApi();
  // this.ngxService.startLoader('loader-03');
}

corporateClose(): void {
  this.corporatevisible = false;
  this.clear();
}
pre(): void {
  this.current -= 1;
  this.changeContent();
}

next(): void {
 this.current += 1;
 this.changeContent();
}

clear(): void{
  this.corporateForm = {
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

  this.form = {
    corporateName: '',
  dateOfIncorporation: '',
  keyContactPersonName: '',
  primaryRmId: '',
  taxId: '',
  registrationNumber: '',
  sector: '',
  subSector: '',
  appid: '',
  segment: '',
  subSegment: '',
  address: '',
  city: '',
  state: '',
  cifId: '',
  schemeType: '',
  schemeCode: '',
  glSubHeadCode: '',
  solId: '',
  phoneNumber: '',
  email: '',
  countryOfIssue: '',
  documentCode: '',
  documentIssueDate: '',
  documentTypeCode: '',
  placeOfIssue: '',
  referenceNumber: '',
  limitAmount: '',
  sanctionDate: '',
  expiryDate: '',
  introducerCode: '',
  currency: '',
  Signatories: [ ],
  };


  this.error = '';
  this.current = 0;
  this.changeContent();
}


onGo(): void{
  this.disabled = true;
  this.error = '';
  this.loadDetails = true;
  if (this.form.cifId == null) {
    this.error = 'Empty field, Please inpute the Customer BVN';
    this.disabled = false;
    this.loadDetails = false;
  } else {

    this.customerAccount.customerInquiry(this.form.cifId, 'corporate').subscribe(
      data => {
        this.disabled = false;
        this.bvnResponse = data;
        this.BvnDetails = this.bvnResponse.customerDetails;
        this.resMessage = this.BvnDetails.responseMessage;
        // this.resTittle = this.bvnResponse.Message;
        this.responsecode = this.bvnResponse.responseCode;
        this.loadDetails = false;
        this.showsDetails = true;

        console.log(this.BvnDetails);

        if (this.responsecode === '0') {

          this.form.corporateName =  this.BvnDetails.corporatename,
          this.form.dateOfIncorporation = this.BvnDetails.dateofincorporation ,
          this.form.keyContactPersonName = this.BvnDetails.keycontactperson ,
          this.form.sector = this.BvnDetails.sector,
          this.form.subSector = this.BvnDetails.subsector,
          this.form.taxId = this.BvnDetails.taxid,
          this.form.registrationNumber = this.BvnDetails.registrationnumber ,
          this.form.segment = this.BvnDetails.segment,
          this.form.subSegment = this.BvnDetails.subsegment,
          this.form.address = this.BvnDetails.address,
          this.form.email = this.BvnDetails.email,
          this.form.phoneNumber = this.BvnDetails.phone,
          this.success = 'Customer Approved';
          this.type = 'success';
          this.onCheckValidation();
          this.notification.create(
            this.type,
            this.resMessage,
            'Review customer informations',
          );

          this.current += 1;
          this.changeContent();
        }
      },
      error => {
        this.error = 'Invalid credentials';
        this.loadDetails = false;
        this.disabled = false;
        this.responsecode = error.error.responseCode;
        this.response = error.error.ErrorResponse;
        this.resMessage = error.error.responseMessage;

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

onAction(val): void{
  if (val === 'approve'){
    this.approval.ApproveOrReject = 'A';
  }else{
    this.approval.ApproveOrReject = 'R';
  }
  console.log(this.approval);
}

onCheckValidation(): void{

  if (this.form.email === '' || this.form.phoneNumber === '' || this.form.solId === '' ||
       this.form.glSubHeadCode === '' || this.form.schemeCode === '' ||  this.form.state === '' || this.form.city === '' ||
       this.form.address === '' || this.form.subSegment === '' ||  this.form.segment === '' || this.form.registrationNumber === '' ||
       this.form.taxId === '' || this.form.subSector === '' ||  this.form.keyContactPersonName === '' || this.form.corporateName === '' ||
      this.form.cifId === '' || this.form.schemeType === '' || this.form.Signatories === []  ) {

        this.disableSubmitBotton = true;

  } else {
    this.disableSubmitBotton = false;
  }
}


onGoParentCif(): void{
  this.disabled2 = true;
  this.loadDetails = true;
  if (this.form.primaryRmId === '') {
    this.error = 'Empty field, Please inpute the Customer BVN';
    this.disabled = false;
    this.loadDetails = false;
    this.disabled2 = false;
  } else {

    this.customerAccount.getRmCode(this.form.primaryRmId).subscribe(
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


addField(e?: MouseEvent): void {
  if (e) {
    e.preventDefault();
  }
  const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;
  const signatory = {
    cifId: null,
    relationtype: null,
    bvn: null
  };
  const newSignatories = this.form.Signatories.push(signatory);
  const control = {
    id,
    controlInstance: `passenger${id}`,
    bvn: `bvn${id}`,
    relationship: `relationship${id}`,
    verification: `Not Verified`,
    action: false,
    bvnVerification: `Not Verified`,
    bvnAction: false,
  };
  const index = this.listOfControl.push(control);
  console.log(this.listOfControl[this.listOfControl.length - 1]);
  this.validateForm.addControl(this.listOfControl[index - 1].controlInstance, new FormControl(null, Validators.required));
  this.validateForm.addControl(this.listOfControl[index - 1].bvn, new FormControl(null, Validators.required));
  this.validateForm.addControl(this.listOfControl[index - 1].relationship, new FormControl(null, Validators.required));
  this.validateForm.addControl(this.listOfControl[index - 1].verification, new FormControl(null, Validators.required));
  this.validateForm.addControl(String(this.listOfControl[index - 1].action), new FormControl(null, Validators.required));
  this.validateForm.addControl(this.listOfControl[index - 1].bvnVerification, new FormControl(null, Validators.required));
  this.validateForm.addControl(String(this.listOfControl[index - 1].bvnAction), new FormControl(null, Validators.required));
}

removeField(i: { id: number; controlInstance: string; bvn: string; relationship: string; verification: string; action: boolean; bvnVerification: string; bvnAction: boolean }, e: MouseEvent): void {
  e.preventDefault();
  if (this.listOfControl.length > 1) {
    const index = this.listOfControl.indexOf(i);
    this.listOfControl.splice(index, 1);
    console.log(this.listOfControl);
    this.validateForm.removeControl(i.controlInstance);
    this.validateForm.removeControl(i.relationship);
    this.validateForm.removeControl(i.verification);
    this.validateForm.removeControl(i.bvnVerification);
  }

  const newSignatories2 = this.form.Signatories.pop();
  console.log(this.form);
}




verityBVNField(id, v): void {
  console.log(v);

  // this.disabled = true;
  for (const i in this.validateForm.controls) {
  this.validateForm.controls[i].markAsDirty();
  this.validateForm.controls[i].updateValueAndValidity();
}
  this.listOfControl[id].bvnAction = true;
  console.log(this.listOfControl[id]);


  this.customerAccount.BvnValidation(this.validateForm.value[v]).subscribe(
  data => {
    // this.disabled = false;
    const bvnResp: any = data;
    this.BvnDetail = this.bvnResponse.customerDetails;
    this.BVNresMessage = this.BvnDetail.responseMessage;
    // this.resTittle = this.bvnResponse.Message;
    this.BVNresponsecode = bvnResp.responseCode;
    this.loadDetails = false;
    this.BVNName = this.BvnDetail.firstname + ' ' + this.BvnDetail.middlename + ' ' + this.BvnDetail.lastname;
    if (this.BVNresponsecode === '0') {
      this.listOfControl[id].bvnAction = false;
      this.success2 = 'Valid Costomer';
      this.listOfControl[id].bvnVerification = 'Verified';
      this.form.Signatories[id].bvn = this.validateForm.value[v];
      this.type = 'success';
      this.notification.create(
        this.type,
        this.BVNresMessage,
        'Review customer information',
      );

      console.log(this.listOfControl[id]);
      console.log(this.form);
    }else{
      this.listOfControl[id].bvnAction = false;
      this.error2 = 'Invalid Customer';
      this.listOfControl[id].bvnVerification = 'Not Verified';
      this.type = 'error';
      this.notification.create(
        this.type,
        this.BVNresMessage,
        'Review customer information',
      );

      console.log(this.listOfControl[id]);
      console.log(this.form);
    }
  },
error => {
      this.listOfControl[id].bvnAction = false;
      this.error2 = 'Invalid credentials';
      this.loadDetails = false;
      this.disabled = false;
      // this.responsecode = error.error.responseCode;
      this.BVNresponse = error.error.isSuccess;
      this.BVNresMessage = error.error.Message;
      this.type = 'error';
      this.notification.create(
        this.type,
      this.error2,
      this.BVNresMessage,
    );
    },
  );

}


verityField(id, v, r, b): void {
    console.log(v);
    console.log(r);
    // this.disabled = true;
    for (const i in this.validateForm.controls) {
    this.validateForm.controls[i].markAsDirty();
    this.validateForm.controls[i].updateValueAndValidity();
  }
    this.listOfControl[id].action = true;
    console.log(this.listOfControl[id]);


    this.customerAccount.customerInquiry(this.validateForm.value[v], 'corporate').subscribe(
    data => {
      // this.disabled = false;
      this.bvnResponse = data;
      this.BvnDetails = this.bvnResponse.customerDetails;
      this.resMessage = this.BvnDetails.responseMessage;
      // this.resTittle = this.bvnResponse.Message;
      this.responsecode = this.bvnResponse.responseCode;
      this.loadDetails = false;
      this.Name = this.BvnDetails.firstname + ' ' + this.BvnDetails.middlename + ' ' + this.BvnDetails.lastname;
      if (this.responsecode === '0') {
        this.listOfControl[id].action = false;
        this.success2 = 'Valid Costomer';
        this.listOfControl[id].verification = 'Verified';
        this.form.Signatories[id].cifId = this.validateForm.value[v];
        this.form.Signatories[id].relationtype = this.validateForm.value[r];
        this.form.Signatories[id].bvn = this.validateForm.value[b];
        this.type = 'success';
        this.notification.create(
          this.type,
          this.resMessage,
          'Review customer information',
        );

        console.log(this.listOfControl[id]);
        console.log(this.form);
      }else{
        this.listOfControl[id].action = false;
        this.error2 = 'Invalid Customer';
        this.listOfControl[id].verification = 'Not Verified';
        this.type = 'error';
        this.notification.create(
          this.type,
          this.resMessage,
          'Review customer information',
        );

        console.log(this.listOfControl[id]);
        console.log(this.form);
      }
    },
  error => {
        this.listOfControl[id].action = false;
        this.error2 = 'Invalid credentials';
        this.loadDetails = false;
        this.disabled = false;
        this.responsecode = error.error.responseCode;
        this.response = error.error.ErrorResponse;
        this.resMessage = error.error.responseMessage;
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

onCreateCustomerCorporate(): void{
  console.log("checking Form", this.corpForm.value);
  // this.ngxService.startLoader('loader-03');
  this.corpForm.value.introducerCode = this.myId;

  if (this.corpForm.value.introducerCode === '') {
    this.error = 'Empty field, Please inpute the user A.D';
    this.disabled = false;
  } else {
    this.customerAccount.CreateCustomerCorporate(this.corpForm.value).subscribe(
    data => this.handleResponse(data),
    error => this.handleError(error)
  );
}
}

submitApproval(){
  this.ngxService.startLoader('loader-05');
  this.customerAccount.CorporateApproveSingle(this.approval).subscribe(
      data => this.handleResponsedata(data, this.requestType),
      error => this.handleErrordata(error)
      );
}

submitCorporateAccount(): void{
  console.log(this.form);
  this.form.introducerCode = this.myId;
  this.ngxService.startLoader('loader-04');

  this.customerAccount.AccountOpeningCorporate(this.form).subscribe(
  data => this.handleResponse(data),
  error => this.handleError(error)
);
}


handleResponse(data): void{
  this.disabled = false;
  this.ngxService.stopLoader('loader-01');
  this.ngxService.stopLoader('loader-03');
  this.ngxService.stopLoader('loader-04');

  const value: any = data;
  this.responseCode = value.responseCode;
  this.isSuccess = value.isSuccess;
  this.error = value.errorResponse;


  if (this.isSuccess) {
    // this.current += 1;
    // this.changeContent();
    this.clear();
    this.type = 'success';
    this.notification.create(
      this.type,
      'Operation successfull',
      'Corporate Customer Created'
    );
  }else{
    this.type = 'error';
    this.notification.create(
      this.type,
      'Operation not successfull',
      this.error,
    );
  }
  this.ngOnInit();
}

handleError(error): void{
  this.disabled = false;
  this.ngxService.stopLoader('loader-01');
  this.ngxService.stopLoader('loader-03');
  this.ngxService.stopLoader('loader-04');

  this.current += 1;
  this.changeContent();

  this.isSuccess = error.error.isSuccess;
  this.error = error.error.errors;
  console.log(this.error);
  this.errorMessage = error.error.message;
  this.isFailure = error.error.isFailure;
  this.notification.error('Corporate', error.error.responseCode || error.error.errorResponse || error.error.message || error.error.Message);

  this.type = 'error';
  // this.notification.create(
  //     this.type,
  //     'Failed',
  //     this.errorMessage
  //   );

}

handleResponsedata(data, type){
  this.disabled = false;
  this.responseCode = data.responseCode;
  this.isSuccess = data.isSuccess;
  this.resMessage = data.errorResponse;

  this.ngxService.stopLoader('loader-01');
  this.ngxService.stopLoader('loader-05');

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
        nzContent: 'Customer ID: '
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
        nzContent: 'Account Number: '
      });
    }
  }

  this.ngOnInit();

}

handleErrordata(error){
  this.disabled = false;
  this.ngxService.stopLoader('loader-05');

  this.responseCode = error.error.responseCode;
  this.isSuccess = error.error.isSuccess;
  this.resMessage = error.error.errorResponse;
  this.notification.error('Corporate', error.error.responseCode || error.error.errorResponse || error.error.message || error.error.Message);
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
}

