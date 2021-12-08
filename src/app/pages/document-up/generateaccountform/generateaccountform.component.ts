import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CustomerAccountService } from 'src/app/Services/customer-account.service';
import jsPDF from 'jspdf';
import * as htmltoimage from 'html-to-image';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-generateaccountform',
  templateUrl: './generateaccountform.component.html',
  styleUrls: ['./generateaccountform.component.css']
})
export class GenerateaccountformComponent implements OnInit {

  accountForm: FormGroup;

  showInputAccountNo = true;
  accountInputInfo = false;
  isLoadingOne = false;
  isLoadingOneForm = false;
  showProf2 = false;
  showProf1 = false;
  isLoadingOnePDF = false;
  uploadedSig2 = false;
  uploadedSig1 = false;

  accountDetails: any;
  accountNoToUse: any;
  addressToUse: any;
  bvnToUse: any;
  dateOfBirthToUse: any;
  emailToUse: any;
  firstNameToUse: any;
  lastNameToUse: any;
  middleNameToUse: any;
  genderToUse: any;
  phoneNumberToUse: any;
  salutationToUse: any;
  signatureToUse = [];
  imageToUse: any;
  solIdToUse: any;
  customerIdToUse: any;

  constructor(
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private customerAccount: CustomerAccountService,
  ) { }

  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      accountNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }


  validateAccount(): void{
    this.isLoadingOne = true;
    this.customerAccount.generateAccountForm(this.accountForm.value.accountNo).subscribe((result: any) => {
      this.accountDetails = result.details;
      this.isLoadingOne = false;
      this.showInputAccountNo = false;
      this.accountInputInfo = true;
      this.notification.success('Account No', 'Account Number Validated Successfully !!');

      this.accountNoToUse = this.accountDetails.account_number;
      this.addressToUse = this.accountDetails.address;
      this.bvnToUse  = this.accountDetails.bvn;
      this.dateOfBirthToUse  = this.accountDetails.date_of_birth;
      this.emailToUse  = this.accountDetails.email;
      this.firstNameToUse  = this.accountDetails.first_name;
      this.lastNameToUse  = this.accountDetails.last_name;
      this.middleNameToUse  = this.accountDetails.middle_name;
      this.genderToUse  = this.accountDetails.gender;
      this.phoneNumberToUse  = this.accountDetails.phone_number;
      this.salutationToUse = this.accountDetails.salutation;
      this.signatureToUse = this.accountDetails.signature;
      this.imageToUse = this.accountDetails.image;
      this.solIdToUse = this.accountDetails.sol_id;
      this.customerIdToUse = this.accountDetails.customer_id;

      if (this.accountDetails.image === null){
        this.showProf1 = true;
      } else {
        this.showProf2 = true;
      }

      if (this.accountDetails.signature === null){
        this.uploadedSig2 = true;
      } else {
        this.uploadedSig1 = true;
      }



    }, error => {
      this.isLoadingOne = false;
      this.notification.error('Account No', error.error.responseMessage || error.error.respMessage || error.error.errorResponse);
    });
  }

  printAnother(): void{
    this.showInputAccountNo = true;
    this.accountInputInfo = false;
    this.accountForm.reset();
  }

  downloadPdf(): void{
    this.isLoadingOneForm = true;
    const data = document.getElementById('contentToConvertToPdf');
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('Account Form.pdf');
    });
    this.isLoadingOneForm = false;

    // const node = document.getElementById('contentToConvertToPdf');
    // htmltoimage.toPng(node)
    //   .then( (dataUrl) => {
    //   const img = new Image();
    //   img.src = dataUrl;
    //   const pdf = new jsPDF('p', 'mm', 'a4');
    //   pdf.setLineWidth(1);
    //   pdf.addImage(img, 'PNG', 0, 0, 208, 298);
    //   pdf.save('Account Form.pdf');
    //   })
    //   .catch((error) => {
    //   console.error('oops, something went wrong!', error);
    //   });
  }

}
