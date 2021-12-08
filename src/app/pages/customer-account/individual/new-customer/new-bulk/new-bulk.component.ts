import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CustomerAccountService } from 'src/app/Services/customer-account.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

declare let $: any;
interface ItemData {
  id: string;
  name: string;
  relationship: string;
  verification: string;
  action: boolean;
}

@Component({
  selector: 'app-new-bulk',
  templateUrl: './new-bulk.component.html',
  styleUrls: ['./new-bulk.component.css']
})
export class NewBulkComponent implements OnInit {

  // mySelect = '2';
  // selectedValue: any;

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

  jointForm: FormGroup;

    current = 0;
    index = 'First-content';
    image: string | ArrayBuffer;
    img: string | ArrayBuffer;
    disabled = false;
    response: any;
    resMessage: any;
    users: any;
    responsecode: any;
    success: string;
    success2: string;
    glheadcodes: any;
    isLoading: any;
    isLoadingOne = false;
    successJoint = false;
    errorJoint = false;

    loadDetails: boolean;
    error: string;
    error2: string;
    visible: boolean;
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

  validateForm!: FormGroup;
  listOfControl: Array<{ id: number; controlInstance: string; relationship: string; verification: string; action: boolean }> = [];

  offsetTop = 10;
  nzOffsetBottom = 10;
  public form = {
    SchemeType: '',
    AccountName: '',
    SolId: '',
    ImageFile: '',
    SchemeCode: '',
    GlSubHeadCode: '',
    CifId: '',
    IntroducerCode: '',
    SignatureFile: '',
    Manager: '',
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
  customerInquiryDetail: any;
  bvnFirstName: any;
  bvnLastName: any;
  bvnFullName: string;
  submitJointAccount: any;
  customerNameDetail: any;
  relationshipTypeDesToSend: any;
  selectElementText: any;

constructor(
  private Jarwis: JarwisService,
  private Token: TokenService,
  private router: Router,
  private Auth: AuthService,
  private nzMessageService: NzMessageService,
  private msg: NzMessageService,
  private notification: NzNotificationService,
  private customerAccount: CustomerAccountService,
  private formBuilder: FormBuilder
) { }

ngOnInit(): void {
  this.jointForm = this.formBuilder.group({
    SchemeType: ['', Validators.required],
    AccountName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    SolId: ['', Validators.required],
    ImageFile: ['', Validators.required],
    SchemeCode: ['', Validators.required],
    GlSubHeadCode: ['', Validators.required],
    CifId: ['', Validators.required],
    IntroducerCode: ['', Validators.required],
    SignatureFile: ['', Validators.required],
    Manager: ['', Validators.required],
    Signatories: this.formBuilder.array([]),
    SignatoriesToBeValidated: this.formBuilder.array([]),
  });

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

  this.Jarwis.myProfile().subscribe(
    data => {
      this.profResponds = data;
      this.me = this.profResponds;
      this.myId = this.me.emp_id;
    }
  );

  this.validateForm = this.formBuilder.group({});
  this.addField();

}

// selectChange() {
//   this.selectedValue = this.customerAccount.getDropDownText(this.mySelect, this.relations)[0].name;
//   console.log('checking', this.selectedValue);
// }

  setOffsetTop(): void {
    this.offsetTop += 10;
  }

  setOffsetBottom(): void {
    this.nzOffsetBottom += 10;
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
    case 3: {
      this.index = 'fourth-content';
      break;
    }
    default: {
      this.index = 'error';
    }
  }
}


  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;
    const signatory = {
      customerId: null,
      relationshipType: null
    };
    const newSignatories = this.form.Signatories.push(signatory);
    console.log(this.form);
    const control = {
      id,
      controlInstance: `passenger${id}`,
      relationship: `relationship${id}`,
      verification: `Not Verified`,
      action: false,
    };
    const index = this.listOfControl.push(control);
    console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.validateForm.addControl(this.listOfControl[index - 1].controlInstance, new FormControl(null, Validators.required));
    this.validateForm.addControl(this.listOfControl[index - 1].relationship, new FormControl(null, Validators.required));
    this.validateForm.addControl(this.listOfControl[index - 1].verification, new FormControl(null, Validators.required));
    this.validateForm.addControl(String(this.listOfControl[index - 1].action), new FormControl(null, Validators.required));
  }

  removeField(i: { id: number; controlInstance: string; relationship: string; verification: string; action: boolean }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.validateForm.removeControl(i.controlInstance);
      this.validateForm.removeControl(i.relationship);
      this.validateForm.removeControl(i.verification);
    }

    const newSignatories2 = this.form.Signatories.pop();
    console.log(this.form);
  }

  verityField(id, v, r): void {
      console.log(v);
      console.log(r);
      // this.disabled = true;
      for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
      this.listOfControl[id].action = true;
      console.log(this.listOfControl[id]);


      this.customerAccount.customerInquiry(this.validateForm.value[v], 'retail').subscribe(
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
          this.form.Signatories[id].customerId = this.validateForm.value[v];
          this.form.Signatories[id].relationshipType = this.validateForm.value[r];
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

  // For Creating Multiple Fields
  signatoriesToBeValidated(): FormArray {
    return this.jointForm.get('SignatoriesToBeValidated') as FormArray;
  }
  signatories(): FormArray {
    return this.jointForm.get('Signatories') as FormArray;
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
  addSignatories() {
    this.signatoriesToBeValidated().push(this.newSignatories());
  }
  removeSignatories(sigIndex: number) {
    this.signatoriesToBeValidated().removeAt(sigIndex);
  }

  // Verifying Custmer Id
  selectChange(event: Event) {
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    this.selectElementText = selectedOptions[selectedIndex].text;
  }
  verityFieldCus(signatory){
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

  onSubmitAccountForm(): void{
    console.log(this.jointForm.value);
    if (this.jointForm.value.GlSubHeadCode === '' || this.jointForm.value.Manager === '' || this.jointForm.value.Manager === '' ||
        this.jointForm.value.SolId === '' || this.jointForm.value.SchemeType === '' || this.jointForm.value.SchemeCode === ''
        || this.jointForm.value.GlSubHeadCode === '') {
          this.notification.warning('Create Account', 'Some fields are required to be filled');
    } else {
        this.disabled = true;

        if (this.ImageFile === undefined){

      } else {
        const img: string = this.ImageFile;
        this.jointForm.value.ImageFile = img.slice(22, img.length);
      }

        if (this.SignatureFile === undefined){

      } else {
        const sign: string = this.SignatureFile;
        this.jointForm.value.SignatureFile = sign.slice(22,  sign.length);
      }

        this.customerAccount.OpeningAccountJoint(this.jointForm.value).subscribe((result: any) => {
        this.submitJointAccount = result;
        this.disabled = false;
        this.current += 1;
        this.changeContent();
        this.successJoint = true;
      }, error => {
        this.errorJoint = true;
        this.disabled = false;
        this.notification.error('Joint Account', error.error.message || error.error.responseMessage);
      });
    }

  }


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.form);
  }
  onSelectSchemeTypes(): void {
    this.isLoading = true;
    // const getSchemeCode: any =  val.target.value;
    // const getSchemeType: any =  val.target.value;
    this.customerAccount.SchemeCodes(this.jointForm.value.SchemeType).subscribe(
      data => { const allSchemCode: any = data;
                this.shemecodes = allSchemCode;
                this.isLoading = true;
                this.onCheckValidation();
      },
      error => this.handleError(error)
    );
  }

  onSelectSchemeCode(): void {
    this.isLoading = true;
    // const getSchemeCode: any =  val.target.value;
    this.customerAccount.GlSubHeadCode(this.jointForm.value.SchemeCode).subscribe(
      data => { const allSchemGlHeadCode: any = data;
                this.glheadcodes = allSchemGlHeadCode;
                this.isLoading = true;
                this.onCheckValidation();
      },
      error => this.handleError(error)
    );
  }

  close(): void {
    this.visible = false;
  }
  again(): void{

      this.form.SchemeType = '';
      this.form.AccountName = '';
      this.form.SolId = '';
      this.form.ImageFile = '';
      this.form.SchemeCode = '';
      this.form.GlSubHeadCode = '';
      this.form.CifId = '';
      this.form.IntroducerCode = '';
      this.form.SignatureFile = '';
      this.form.Manager = '';
      this.form.Signatories = [ ];
      this.current = 0;
      this.changeContent();
      location.reload();
  }

  onGo(): void{
    this.disabled = true;
    this.error = '';
    this.loadDetails = true;
    if (this.jointForm.value.CifId == null) {
      this.error = 'Empty field, Please inpute the Customer BVN';
      this.disabled = false;
      this.loadDetails = false;
    } else {

      this.customerAccount.customerInquiry(this.jointForm.value.CifId, 'retail').subscribe(
        data => {
          this.disabled = false;
          this.bvnResponse = data;
          this.BvnDetails = this.bvnResponse.customerDetails;
          this.bvnFirstName = this.BvnDetails.firstname;
          this.bvnLastName = this.BvnDetails.lastname;
          this.bvnFullName = this.bvnFirstName + ' ' + this.bvnLastName;
          this.resMessage = this.BvnDetails.responseMessage;
          // this.resTittle = this.bvnResponse.Message;
          this.responsecode = this.bvnResponse.responseCode;
          this.loadDetails = false;
          this.showsDetails = true;

          if (this.responsecode === '0') {
            this.success = 'Customer Approved';
            this.type = 'success';
            this.onCheckValidation();
            this.notification.success('Customer ID', 'Review customer informations');

            this.current += 1;
            this.changeContent();
          }
        },
        error => {
          this.loadDetails = false;
          this.disabled = false;
          this.responsecode = error.error.responseCode;
          this.response = error.error.ErrorResponse;
          this.resMessage = error.error.responseMessage;
          this.notification.error('Customer ID', error.error.message || error.error.responseMessage);
        },
      );

    }
  }

  onCheckValidation(): void{

    if (this.jointForm.value.SchemeType === '' || this.jointForm.value.AccountName === '' || this.jointForm.value.SolId === '' ||
         this.jointForm.value.SchemeCode === '' || this.jointForm.value.GlSubHeadCode === '' ||
        this.jointForm.value.CifId === '' || this.jointForm.value.Manager === '' || this.jointForm.value.Signatories === ['']  ) {

          this.disableSubmitBotton = true;

    } else {
      this.disableSubmitBotton = false;
    }

  }

  notValidForm(){
    this.type = 'warning';
    this.notification.create(
      this.type,
      'Oops',
      'Some required feild are empty, Please preview and check'
    );

    console.log( this.form);
  }

  onFileSelect(event): void{

    if (event.target.files.length > 0) {

      const file = event.target.files[0];
      this.fileInputLabel = file.name;
      const reader1 = new FileReader();

      const vm = this;

      reader1.onloadend = () => {
        this.ImageFile = reader1.result;
      };
      reader1.readAsDataURL(file);
    }
  }

  onFileSelect2(event): void{

    if (event.target.files.length > 0) {

      const files = event.target.files[0];
      this.fileInputLabel2 = files.name;
      const reader = new FileReader();

      const vm = this;

      reader.onloadend = () => {
        this.SignatureFile = reader.result;
      };
      reader.readAsDataURL(files);
    }
  }


  onGoParentCif(): void{
    this.disabled2 = true;
    this.loadDetails = true;
    if (this.jointForm.value.Manager == '') {
      this.error = 'Empty field, Please inpute the Customer BVN';
      this.disabled = false;
      this.loadDetails = false;
      this.disabled2 = false;
    } else {

      this.customerAccount.getRmCode(this.jointForm.value.Manager).subscribe(
        data => {
          this.disabled2 = false;
          this.bvnResponse = data;
          this.BvnDetails2 = this.bvnResponse.rmDetails;
          this.resMessage2 = this.bvnResponse.responseMessage;
          // this.resTittle = this.bvnResponse.Message;
          this.responsecode2 = this.bvnResponse.responseCode;
          this.loadDetails = false;
          this.showsDetails3 = true;

          if (this.responsecode2 === '0') {
            this.type = 'success';
            this.notification.create(
              this.type,
              this.resMessage2,
              'RM Code Confirmed',
            );
            this.error = '';
          }
        },
        error => {
          this.loadDetails = false;
          this.disabled2 = false;
          this.showsDetails = false;
          this.responsecode2 = error.error.responseCode;
          this.response2 = error.error.ErrorResponse;
          this.resMessage2 = error.error.responseMessage;
          this.notification.error('RM Code', error.error.message || error.error.responseMessage);
        },
      );

    }
    this.onCheckValidation();
  }

  handleResponse(data): void{
    this.disabled = false;
    this.current += 1;
    this.changeContent();

    // this.users = data.Details;

    // errorResponse: null
    // isSuccess: true
    // responseCode: "0"

    this.responsecode = data.responseCode;
    this.resMessage = data.errorResponse;
    this.errorResponse = data.isSuccess;
    if (this.errorResponse === true) {
      this.type = 'true';
      this.notification.create(
        this.type,
        'operation Successful',
        'Customer Created Successfully',
      );
    }

  }

  handleError(error): void{
    this.disabled = false;
    this.responsecode = error.error.responseCode;
    this.response = error.error.errorResponse;
    this.current += 1;
    this.changeContent();

    if (this.responsecode === 3) {
      this.type = 'error';
      this.notification.create(
        this.type,
        this.resMessage,
        this.response
      );
    }

    if (this.responsecode !== 3) {
      this.type = 'error';
      this.notification.create(
        this.type,
        'Operation not successfull',
        'Something on usual went wrong'
      );

    }
  }
}
