import { Component, OnInit } from '@angular/core';
import { CustomerAccountService } from 'src/app/Services/customer-account.service';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

const count = 5;
const fakeDataUrl = 'http://10.0.38.24:81/easyAccount/api/v1/';
export interface TreeNodeInterface {
  key: string;
  name: string;
  age?: number;
  level?: number;
  expand?: boolean;
  address?: string;
  children?: TreeNodeInterface[];
  parent?: TreeNodeInterface;
}

@Component({
  selector: 'app-batch-munbers',
  templateUrl: './batch-munbers.component.html',
  styleUrls: ['./batch-munbers.component.css']
})
export class BatchMunbersComponent implements OnInit {
  retryForm: FormGroup;

  RetailResponds: any;
  retails: any;
  size: NzButtonSize = 'large';
  loadingRetry = false;
  show = true;


  initLoading = true; // bug
  loadingMore = false;
  data: any[] = [];
  list: Array<{ loading: boolean; name: any }> = [];

  host = `${environment.baseUrl}${environment.verssion}`;
  downloadUploadReport =  `${environment.baseUrl}${environment.verssion}`;

  current = 0;
  loading: boolean;
  index = 'First-content';
  batchNumber: string;
  CorporateResponds: any;
  allCorporates: any;
  pregeneratedCorporateResponds: any;
  allPregeneratedCorporate: any;
  pregeneratedRetailResponds: any;
  allPregeneratedRetail: any;
  CustomerUpdateResponds: any;
  allCustomerUpdate: any;
  RetailDResponds: any;
  retailInfo: any;
  CustomerResponds: any;
  customerInfo: any;
  batchID: any;
  rowId: number;
  rbatchId: any;
  disabled: boolean;
  resMessage: any;
  users: any;
  response: any;
  responsecode: any;
  currentsavingsResponds: any;
  currentsavings: any;
  account = 'account';
  AllCustomerAccountUpdate: any;
  retryBulkDetail: any;

  constructor(
    private customerAccount: CustomerAccountService,
    private http: HttpClient,
    private msg: NzMessageService,
    private actRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
  ) { }
  expandSet = new Set<number>();
  expandSet2 = new Set<number>();

  ngOnInit(): void {
    this.retryForm = this.formBuilder.group({
      id: ['', Validators.required],
      batchNumber: ['', Validators.required],
      type: ['', Validators.required],
    });

    this.loading = true;

    this.actRoute.paramMap.subscribe((params => {
      const val = params.get('id');
      this.rbatchId = val;

      if (this.rbatchId === 'retail') {
        this.current = 0;
        this.changeContent();
        this.batchNumber = '';
      }

    }));

    this.customerAccount.currentsavings().subscribe(
      data => {
        this.currentsavingsResponds = data;
        this.currentsavings = this.currentsavingsResponds.details;
        this.loading = false;
      }
    );

    this.customerAccount.getBatchRetail().subscribe(
      data => {
        this.RetailResponds = data;
        this.retails = this.RetailResponds.details;
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    );

    this.customerAccount.getBatchCorporate().subscribe(
      data => {
        this.CorporateResponds = data;
        this.allCorporates = this.CorporateResponds.details;
      },
    error => {
      this.loading = false;
    }
    );

    this.customerAccount.getBatchPregeneratedCorporate().subscribe(
      data => {
        this.pregeneratedCorporateResponds = data;
        this.allPregeneratedCorporate = this.pregeneratedCorporateResponds.details;
      }, error => {
        this.loading = false;
      }
    );

    this.customerAccount.getBatchPregeneratedRetail().subscribe(
      data => {
        this.pregeneratedRetailResponds = data;
        this.allPregeneratedRetail = this.pregeneratedRetailResponds.details;
      }, error => {
        this.loading = false;
      }
    );

    this.customerAccount.getBatchCustomerUpdate().subscribe(
      data => {
        this.CustomerUpdateResponds = data;
        this.allCustomerUpdate = this.CustomerUpdateResponds.details;
      }
    );

    this.customerAccount.getCustomerAccountUpdate().subscribe(
      data => {
        const CustomerAccountUpdate: any = data;
        this.AllCustomerAccountUpdate = CustomerAccountUpdate.details;
      }
    );
  }




  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if (!$event) {
      if (data.children) {
        data.children.forEach(d => {
          // tslint:disable-next-line:no-non-null-assertion
          const target = array.find(a => a.key === d.key)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
    const stack: TreeNodeInterface[] = [];
    const array: TreeNodeInterface[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      // tslint:disable-next-line:no-non-null-assertion
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          // tslint:disable-next-line:no-non-null-assertion
          stack.push({ ...node.children[i], level: node.level! + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node: TreeNodeInterface, hashMap: { [key: string]: boolean }, array: TreeNodeInterface[]): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }




  getBatchID(sn: any, val: any): void{
    this.batchID = sn;

    if (val === 'retail') {
      this.getData((res: any) => {
        this.data = res.results;
        this.list = res.results;
        this.initLoading = false;
      });
    }

    if (val === 'coporate') {
      this.getCopData((res: any) => {
        this.data = res.results;
        this.list = res.results;
        this.initLoading = false;
      });
    }

    if (val === 'currentsavings') {
      this.getDataCurrent((res: any) => {
        this.data = res.results;
        this.list = res.results;
        this.initLoading = false;
      });
    }

    if (val === 'pregeneratedRetail') {
      this.pregeneratedRetail((res: any) => {
        this.data = res.results;
        this.list = res.results;
        this.initLoading = false;
      });
    }

    if (val === 'pregeneratedCorporate') {
      this.pregeneratedCorporate((res: any) => {
        this.data = res.results;
        this.list = res.results;
        this.initLoading = false;
      });
    }

    if (val === 'customerUpdate') {
      this.customerUpdate((res: any) => {
        this.data = res.results;
        this.list = res.results;
        this.initLoading = false;
      });
    }

    if (val === 'AccountUpdate') {
      this.customerAccountUpdate((res: any) => {
        this.data = res.results;
        this.list = res.results;
        this.initLoading = false;
      });
    }
  }

  // GET BULK DETAILS

  getData(callback: (res: any) => void): void {

    this.customerAccount.getBatchDRetail(this.batchID).subscribe(
      data => {
        this.RetailDResponds = data;
        this.retailInfo = this.RetailDResponds.details;
      },
      (res: any) => callback(res)
    );
  }

  getCopData(callback: (res: any) => void): void {

    this.customerAccount.getBatchDCorporate(this.batchID).subscribe(
      data => {
        this.RetailDResponds = data;
        this.retailInfo = this.RetailDResponds.details;
      },
      (res: any) => callback(res)
    );
  }

  getDataCurrent(callback: (res: any) => void): void {

    this.customerAccount.getBatchDCurrentSavings(this.batchID).subscribe(
      data => {
        this.RetailDResponds = data;
        this.retailInfo = this.RetailDResponds.details;
      },
      (res: any) => callback(res)
    );
  }

  pregeneratedRetail(callback: (res: any) => void): void {

      this.customerAccount.getBatchDPregeneratedRetail(this.batchID).subscribe(
        data => {
          this.RetailDResponds = data;
          this.retailInfo = this.RetailDResponds.details;
        },
        (res: any) => callback(res)
      );
    }

    pregeneratedCorporate(callback: (res: any) => void): void {

      this.customerAccount.getBatchDPregeneratedCorporate(this.batchID).subscribe(
        data => {
          this.RetailDResponds = data;
          this.retailInfo = this.RetailDResponds.details;
        },
        (res: any) => callback(res)
      );
    }

    customerUpdate(callback: (res: any) => void): void {

      this.customerAccount.getBatchDCustomerUpdate(this.batchID).subscribe(
        data => {
          this.RetailDResponds = data;
          this.retailInfo = this.RetailDResponds.details;
        },
        (res: any) => callback(res)
      );
    }

    customerAccountUpdate(callback: (res: any) => void): void {

      this.customerAccount.getCustomerAcountUpdate(this.batchID).subscribe(
        data => {
          this.RetailDResponds = data;
          this.retailInfo = this.RetailDResponds.details;
        },
        (res: any) => callback(res)
      );
    }


  onLoadMore(): void {
    this.loadingMore = true;
    this.list = this.data.concat([...Array(count)].fill({}).map(() => ({ loading: true, name: {} })));
    this.http.get(fakeDataUrl).subscribe((res: any) => {
      this.data = this.data.concat(res.results);
      this.list = [...this.data];
      this.loadingMore = false;
    });
  }

  edit(item: any): void {
    this.msg.success(item.email);
  }


  onExpandChange(id: number, checked: boolean): void {

    if (checked) {
      this.expandSet.add(id);
      if (id !==  this.rowId) {
        this.expandSet.delete(this.rowId);
      }
      this.rowId = id;
    } else {
      this.expandSet.delete(id);
    }
  }

  onExpandChange2(id: number, checked: boolean): void {

    if (checked) {
      this.expandSet2.add(id);
      if (id !==  this.rowId) {
        this.expandSet2.delete(this.rowId);
      }
      this.rowId = id;
    } else {
      this.expandSet2.delete(id);
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

  tab(val): void {
    this.current = val;
    this.changeContent();
    this.batchNumber = '';
    this.expandSet.delete(this.rowId);
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
      case 4: {
        this.index = 'fifth-content';
        break;
      }
      case 5: {
        this.index = 'sixth-content';
        break;
      }

      case 6: {
        this.index = 'seventh-content';
        break;
      }

      case 7: {
        this.index = 'Eight-content';
        break;
      }

      default: {
        this.index = 'error';
      }
    }
  }

  swichAccount(val): void{
    if (val === 'account') {
      this.account = 'account';
      this.current = 0;
      this.changeContent();

      this.batchNumber = '';

    } else if (val === 'customer'){
      this.account = 'customer';
      this.current = 4;
      this.changeContent();

      this.batchNumber = '';
    }
  }


  retryRetail(batchNumber, id ): void{
    this.show = false;
    this.loadingRetry = true;
    this.retryForm.value.id = id;
    this.retryForm.value.batchNumber = batchNumber;
    this.retryForm.value.type = 'retail';
    this.customerAccount.retryBulkUpload(this.retryForm.value).subscribe((result: any) => {
      this.retryBulkDetail = result;
      this.notification.success( 'Retry Bulk Upload', 'Bulk Uploaded Successfully' );
      this.show = true;
      this.loadingRetry = false;
      window.location.reload();
    }, error => {
      this.show = true;
      this.loadingRetry = false;
      this.notification.error( 'Retry Bulk Upload', error.error.message || error.error.responseMessage );
    });
  }

  retryCorporate(batchNumber, id): void{
    this.show = false;
    this.loadingRetry = true;
    this.retryForm.value.id = id;
    this.retryForm.value.batchNumber = batchNumber;
    this.retryForm.value.type = 'corporate';
    this.customerAccount.retryBulkUpload(this.retryForm.value).subscribe((result: any) => {
      this.retryBulkDetail = result;
      this.notification.success( 'Retry Bulk Upload', 'Bulk Uploaded Successfully' );
      this.show = true;
      this.loadingRetry = false;
      window.location.reload();
    }, error => {
      this.show = true;
      this.loadingRetry = false;
      this.notification.error( 'Retry Bulk Upload', error.error.message || error.error.responseMessage );
    });
  }

  retryPregeneratedRetail(batchNumber, id): void{
    this.show = false;
    this.loadingRetry = true;
    this.retryForm.value.id = id;
    this.retryForm.value.batchNumber = batchNumber;
    this.retryForm.value.type = 'pregeneratedretail';
    this.customerAccount.retryBulkUpload(this.retryForm.value).subscribe((result: any) => {
      this.retryBulkDetail = result;
      this.notification.success( 'Retry Bulk Upload', 'Bulk Uploaded Successfully' );
      this.show = true;
      this.loadingRetry = false;
      window.location.reload();
    }, error => {
      this.show = true;
      this.loadingRetry = false;
      this.notification.error( 'Retry Bulk Upload', error.error.message || error.error.responseMessage );
    });
  }

  retryPregenratedCorporate(batchNumber, id): void{
    this.show = false;
    this.loadingRetry = true;
    this.retryForm.value.id = id;
    this.retryForm.value.batchNumber = batchNumber;
    this.retryForm.value.type = 'pregeneratedcorporate';
    this.customerAccount.retryBulkUpload(this.retryForm.value).subscribe((result: any) => {
      this.retryBulkDetail = result;
      this.notification.success( 'Retry Bulk Upload', 'Bulk Uploaded Successfully' );
      this.show = true;
      this.loadingRetry = false;
      window.location.reload();
    }, error => {
      this.show = true;
      this.loadingRetry = false;
      this.notification.error( 'Retry Bulk Upload', error.error.message || error.error.responseMessage );
    });
  }

  retryCustomerUpdate(batchNumber, id): void{
    this.show = false;
    this.loadingRetry = true;
    this.retryForm.value.id = id;
    this.retryForm.value.batchNumber = batchNumber;
    this.retryForm.value.type = 'customerupdate';
    this.customerAccount.retryBulkUpload(this.retryForm.value).subscribe((result: any) => {
      this.retryBulkDetail = result;
      this.notification.success( 'Retry Bulk Upload', 'Bulk Uploaded Successfully' );
      this.show = true;
      this.loadingRetry = false;
      window.location.reload();
    }, error => {
      this.show = true;
      this.loadingRetry = false;
      this.notification.error( 'Retry Bulk Upload', error.error.message || error.error.responseMessage );
    });
  }

  retryCustomerAccountUpdate(batchNumber, id): void{
    this.show = false;
    this.loadingRetry = true;
    this.retryForm.value.id = id;
    this.retryForm.value.batchNumber = batchNumber;
    this.retryForm.value.type = 'customeraccountupdate';
    this.customerAccount.retryBulkUpload(this.retryForm.value).subscribe((result: any) => {
      this.retryBulkDetail = result;
      this.notification.success( 'Retry Bulk Upload', 'Bulk Uploaded Successfully' );
      this.show = true;
      this.loadingRetry = false;
      window.location.reload();
    }, error => {
      this.show = true;
      this.loadingRetry = false;
      this.notification.error( 'Retry Bulk Upload', error.error.message || error.error.responseMessage );
    });
  }



handleResponse(data): void{
this.disabled = false;
this.current += 1;
this.changeContent();

this.response = data.ResponseCode;
this.resMessage = data.Message;
this.users = data.Details;

}

handleError(error): void{
this.disabled = false;
this.responsecode = error.error.ResponseCode;
this.response = error.error.ErrorResponse;
this.current += 1;
this.changeContent();

}

}
