import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CustomerAccountService } from 'src/app/Services/customer-account.service';

interface DataItem {
  account_number: string;
  document_type: string;
  document_name: string;
}
@Component({
  selector: 'app-documentdownload',
  templateUrl: './documentdownload.component.html',
  styleUrls: ['./documentdownload.component.css']
})
export class DocumentdownloadComponent implements OnInit {

  downloadForm: FormGroup;
  fullAccountDetails: any;
  accountDetailsId: any;
  getDocumentDetailsById: any;
  fullAccountDocument: DataItem[] = [];

  visibleDocument = false;

  // for table and filter
  searchValue = '';
  tableVisible = false;
  listOfDdocumentData = [...this.fullAccountDocument];

  showButton = true;
  showButton2 = false;
  showButton3 = false;
  documentToView: any;

  constructor(
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private customerAccount: CustomerAccountService,
  ) { }

  ngOnInit(): void {
    this.downloadForm = this.formBuilder.group({
      accountNo: [''],
    });
  }

  close(): void{
    this.visibleDocument = false;
    this.documentToView = '';
  }

  // Table sorting
  resetTable(): void {
    this.searchValue = '';
    this.searchTable();
  }
  searchTable(): void {
    this.tableVisible = false;
    this.listOfDdocumentData = this.fullAccountDocument.filter((item: DataItem) => item.document_name.indexOf(this.searchValue) !== -1);
  }

  validateAccount(): void{
    this.showButton = false;
    this.showButton2 = true;
    this.customerAccount.getAccountDocuments( this.downloadForm.value.accountNo ).subscribe((result: any) => {
      this.fullAccountDocument = result.documents;
      this.listOfDdocumentData = this.fullAccountDocument;
      this.showButton2 = false;
      this.showButton = true;
      this.notification.success('Validate Account No', 'Account Number Validated');
      this.downloadForm.reset();

      // this.accountDetailsId = this.fullAccountDetails.id;

      // this.customerAccount.getAccountDocumentsById(this.accountDetailsId).subscribe((result: any) => {
      //   this.getDocumentDetailsById = result;
      // });

    }, error => {
      this.showButton = true;
      this.showButton2 = false;
      this.notification.error('Validate Account No', error.error.errorResponse);
    });
  }

  downloadDocu(document): void{
    window.open(document, '_blank');
  }

  viewDocument(document): void{
    this.visibleDocument = true;
    this.documentToView = 'data:application/pdf;base64,' + document;
    console.log('checking', this.documentToView);
  }

}
