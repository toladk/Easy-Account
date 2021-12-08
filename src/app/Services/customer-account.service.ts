import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CustomerAccountService {

  private baseUrl = environment.baseUrl;
  private baseUrl2 = environment.baseUrl2;
  private verssion = environment.verssion;
  private login2 = environment.login;

constructor(private http: HttpClient) { }

// get selectdrop down text
getDropDownText(id, object){
  const selObj = _.filter(object, function(o) {
      return (_.includes(id, o.id));
  });
  return selObj;
}

// BVN VALIDATION
BvnValidation(id: string) {
  return this.http.get(this.baseUrl + this.verssion + 'Inquiry/Bvn?bvn=' + id, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

customerInquiry(id: string, ct: string) {
  return this.http.get(this.baseUrl + this.verssion + 'Inquiry/Customer?customerId=' + id + '&customerType='+ ct, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

// CREATE CUSTOMER

CreateCustomer(data){
  return this.http.post(this.baseUrl + this.verssion + 'AccountOpening/CreateCustomer', data, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

CreateCifAndAccount(data){
  return this.http.post(this.baseUrl + this.verssion + 'AccountOpening/AllInOne', data, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

CreateCustomerCorporate(data){
  return this.http.post(this.baseUrl + this.verssion + 'AccountOpening/CreateCustomer/Corporate', data, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

updateCustomerIndividualAccount(data, id){
  return this.http.post(this.baseUrl + this.verssion + 'AccountOpening/Update/' + id, data, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

updateCustomerCorporateAccount(data, id){
  return this.http.post(this.baseUrl + this.verssion + 'AccountOpening/Corporate/Update/' + id, data, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

AccountOpeningCorporate(data){
  return this.http.post(this.baseUrl + this.verssion + 'AccountOpening/Corporate', data, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

AccountOpeningCorporateAccount(data){
  return this.http.post(this.baseUrl + this.verssion + 'AccountOpening/Corporate/ExistingCustomers', data, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

allPendingCorporate() {
  return this.http.get(this.baseUrl + this.verssion + 'AccountOpening/Corporate/pendingAuthorization', {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

CorporateAccountRejected(){
  return this.http.get(this.baseUrl + this.verssion + 'Inquiry/CorporateAccount/Rejected', {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

InquiryCorporateDetails(id: string) {
  return this.http.get(this.baseUrl + this.verssion + 'Inquiry/CorporateAccount/Opening?id=' + id, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

InquiryCompletedProcess() {
  return this.http.get(this.baseUrl + this.verssion + 'Inquiry/CompletedProcess', {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

InquiryAccountRejected() {
  return this.http.get(this.baseUrl + this.verssion + 'Inquiry/Account/Rejected', {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

RejectedIndividualAccount(){
  return this.http.get(this.baseUrl + this.verssion + 'AccountOpening/Rejected', {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

// SCHEME TYPE
SchemeTypes() {
  return this.http.get(this.baseUrl + this.verssion + 'SchemeTypes', {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

SchemeCodes(id: string) {
  return this.http.get(this.baseUrl + this.verssion + 'SchemeCodes?schemeType=' + id, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

// GlSubHeadCode

GlSubHeadCode(id: string) {

  return this.http.get(this.baseUrl + this.verssion + 'GlSubHeadCodes?schemeCode=' + id, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

  // GET Sols
    getSols() {
  return this.http.get(this.baseUrl + this.verssion + 'Sols', {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

getRmCode(id: string) {
  return this.http.get(this.baseUrl + this.verssion + 'GetRmDetails?rmCode=' + id, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

InquiryAccountOpening(id: string) {
  return this.http.get(this.baseUrl + this.verssion + 'Inquiry/Account/Opening?id=' + id, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

AccountInquiry(id: string) {
  return this.http.get(this.baseUrl + this.verssion + 'Inquiry/Account?accountNumber=' + id, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

// PRE GENERATE

PREGeneration(data){
  return this.http.post(this.baseUrl + this.verssion + 'AccountOpening/Pre-Generation', data, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

// UPLOAD BULK

BulkAccountOpeningSavingsCurrent(data){
  return this.http.post(this.baseUrl + this.verssion + 'AccountOpening/Bulk/SavingsCurrent', data, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

BulkAccountOpeningCorporate(data){
  return this.http.post(this.baseUrl + this.verssion + 'AccountOpening/Bulk/Corporate', data, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

BulkAccountOpening(data){

  console.log(data);
  return this.http.post<any>(this.baseUrl + this.verssion + 'AccountOpening/Bulk/Retail', data, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

BulkCustomer(data){
  return this.http.post(this.baseUrl + this.verssion + 'Customer/Bulk/Update', data, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

BulkAccountUpdate(data){
  return this.http.post(this.baseUrl + this.verssion + 'Account/Bulk/Update', data, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

// UPLOAD BULK Informations

getBatchRetail(){
  return this.http.get(this.baseUrl + this.verssion + 'AccountOpeningBatch?Type=retail', {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

// tslint:disable-next-line:typedef
pendingGetBatchRetail(){
  return this.http.get(this.baseUrl + this.verssion + 'PendingAccountOpeningBatch?Type=retail', {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

  currentsavings(){
    return this.http.get(this.baseUrl + this.verssion + 'AccountOpeningBatch?Type=currentsavings', {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
  }

  // tslint:disable-next-line:typedef
  pendingCurrentsavings(){
    return this.http.get(this.baseUrl + this.verssion + 'PendingAccountOpeningBatch?Type=currentsavings', {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
  }

getBatchCorporate(){
  return this.http.get(this.baseUrl + this.verssion + 'AccountOpeningBatch?Type=corporate', {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

// tslint:disable-next-line:typedef
pendingGetBatchCorporate(){
  return this.http.get(this.baseUrl + this.verssion + 'PendingAccountOpeningBatch?Type=corporate', {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

getBatchPregeneratedCorporate(){
  return this.http.get(this.baseUrl + this.verssion + 'AccountOpeningBatch?Type=pregeneratedCorporate', {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

// tslint:disable-next-line:typedef
pendingGetBatchPregeneratedCorporate(){
  return this.http.get(this.baseUrl + this.verssion + 'PendingAccountOpeningBatch?Type=pregeneratedCorporate', {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

getBatchPregeneratedRetail(){
  return this.http.get(this.baseUrl + this.verssion + 'AccountOpeningBatch?Type=pregeneratedRetail', {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

// tslint:disable-next-line:typedef
pendingGetBatchPregeneratedRetail(){
  return this.http.get(this.baseUrl + this.verssion + 'PendingAccountOpeningBatch?Type=pregeneratedRetail', {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

getBatchCustomerUpdate(){
  return this.http.get(this.baseUrl + this.verssion + 'AccountOpeningBatch?Type=customerUpdate', {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

// tslint:disable-next-line:typedef
pendingGetBatchCustomerUpdate(){
  return this.http.get(this.baseUrl + this.verssion + 'PendingAccountOpeningBatch?Type=customerUpdate', {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

getCustomerAccountUpdate(){
  return this.http.get(this.baseUrl + this.verssion + 'AccountOpeningBatch?Type=customeraccountupdate', {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

// tslint:disable-next-line:typedef
pendingGetCustomerAccountUpdate(){
  return this.http.get(this.baseUrl + this.verssion + 'PendingAccountOpeningBatch?Type=customeraccountupdate', {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}


// Bulk Type Details

getBatchDCustomerUpdate(id: string){
  return this.http.get(this.baseUrl + this.verssion + 'BatchDetails?Type=customerupdate&BatchNumber=' + id, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

// tslint:disable-next-line:typedef
pendingGetBatchDCustomerUpdate(id: string){
  return this.http.get(this.baseUrl + this.verssion + 'PendingBatchDetails?Type=customerupdate&BatchNumber=' + id, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

getCustomerAcountUpdate(id: string){
  return this.http.get(this.baseUrl + this.verssion + 'BatchDetails?Type=customeraccountupdate&BatchNumber=' + id, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

// tslint:disable-next-line:typedef
pendingGetCustomerAcountUpdate(id: string){
  return this.http.get(this.baseUrl + this.verssion + 'PendingBatchDetails?Type=customeraccountupdate&BatchNumber=' + id, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}


getBatchDRetail(id: string){
  return this.http.get(this.baseUrl + this.verssion + 'BatchDetails?Type=retail&BatchNumber=' + id, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

// tslint:disable-next-line:typedef
pendingGetBatchDRetail(id: string){
  return this.http.get(this.baseUrl + this.verssion + 'PendingBatchDetails?Type=retail&BatchNumber=' + id, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

getBatchDCurrentSavings(id: string){
  return this.http.get(this.baseUrl + this.verssion + 'BatchDetails?Type=retail&BatchNumber=' + id, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

// tslint:disable-next-line:typedef
pendingGetBatchDCurrentSavings(id: string){
  return this.http.get(this.baseUrl + this.verssion + 'PendingBatchDetails?Type=retail&BatchNumber=' + id, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

getBatchDCorporate(id: string){
  return this.http.get(this.baseUrl + this.verssion + 'BatchDetails?Type=corporate&BatchNumber=' + id, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

// tslint:disable-next-line:typedef
pendingGetBatchDCorporate(id: string){
  return this.http.get(this.baseUrl + this.verssion + 'PendingBatchDetails?Type=corporate&BatchNumber=' + id, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

getBatchDPregeneratedCorporate(id: string){
  return this.http.get(this.baseUrl + this.verssion + 'BatchDetails?Type=pregeneratedCorporate&BatchNumber=' + id, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

// tslint:disable-next-line:typedef
pendingGetBatchDPregeneratedCorporate(id: string){
  return this.http.get(this.baseUrl + this.verssion + 'PendingBatchDetails?Type=pregeneratedCorporate&BatchNumber=' + id, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

getBatchDPregeneratedRetail(id: string){
  return this.http.get(this.baseUrl + this.verssion + 'BatchDetails?Type=pregeneratedRetail&BatchNumber=' + id, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

pendingGetBatchDPregeneratedRetail(id: string){
  return this.http.get(this.baseUrl + this.verssion + 'PendingBatchDetails?Type=pregeneratedRetail&BatchNumber=' + id, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

// AccountOpeningMinor

AccountMinor(data){
  return this.http.post<any>(this.baseUrl + this.verssion + 'AccountOpening/Minor', data, {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

  OpeningAccountJoint(data){
    return this.http.post<any>(this.baseUrl + this.verssion + 'AccountOpening/Joint', data, {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
  }

  OpeningAccountNormal(data){
    return this.http.post<any>(this.baseUrl + this.verssion + 'AccountOpening/Normal', data, {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
  }

  // Authorize Account


IndividualAccountPendAuth(){
  return this.http.get(this.baseUrl + this.verssion + 'AccountOpening/pendingAuthorization', {headers: {
    Authorization: `Bearer ${sessionStorage.token}`
  }});
}

  IndividualApproveSingles(data){
    return this.http.post<any>(this.baseUrl + this.verssion + 'authorizer/AccountOpening/Single', data, {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
  }

  IndividualApproveBulk(data){
    return this.http.post<any>(this.baseUrl + this.verssion + 'authorizer/Bulk', data, {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
  }

  CorporateAccountPendAuth(){
    return this.http.get(this.baseUrl + this.verssion + 'AccountOpening/Corporate/pendingAuthorization', {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
  }

  CorporateApproveSingle(data){
    return this.http.post<any>(this.baseUrl + this.verssion + 'authorizer/AccountOpening/Corporate/Single', data, {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
  }

  CorporateApproveBulk(data){
    return this.http.post<any>(this.baseUrl + this.verssion + 'authorizer/Bulk', data, {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
  }

  // Endpoint for single accounts opening (joint, normal, minor) that have been authorized;

  AccountOpeningAuthorized(){
      return this.http.get(this.baseUrl + this.verssion + 'AccountOpening/Authorized', {headers: {
          Authorization: `Bearer ${sessionStorage.token}`
        }});
    }

    CorporateAccountAuthorized(){
      return this.http.get(this.baseUrl + this.verssion + 'AccountOpening/Corporate/Authorized', {headers: {
          Authorization: `Bearer ${sessionStorage.token}`
        }});
    }


  // Endpoint for Document Upload and Download

  validateAccountDetails( accountNumber){
    const params = new HttpParams()
      .set('accountNumber', accountNumber)
    return this.http.get(this.baseUrl + this.verssion + 'Documents/GetAccountDetails?' + params, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  uploadDocumentData(data){
    return this.http.post<any>(this.baseUrl + this.verssion + 'Documents/Upload', data, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }})
  }

  getAccountDocuments( accountNumber){
    const params = new HttpParams()
      .set('accountNumber', accountNumber)
    return this.http.get(this.baseUrl + this.verssion + 'Documents/GetDocuments?' + params, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }})
  }

  getAccountDocumentsById(id){
    return this.http.get(this.baseUrl + this.verssion + 'Documents/GetDocuments?requestId=' + id, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }})
  }

  retryBulkUpload(data){
    return this.http.post<any>(this.baseUrl + this.verssion + 'AccountOpening/Bulk/Retry', data, {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
  }

  getState(){
    return this.http.get(this.baseUrl + this.verssion + 'States', {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getCities(){
    return this.http.get(this.baseUrl + this.verssion + 'LocalGovernment', {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getInquiryAccount(accountNumber){
    return this.http.get(this.baseUrl + this.verssion + 'Inquiry/Account/Full?accountNumber=' + accountNumber, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getSingleAlert(){
    return this.http.get(this.baseUrl + this.verssion + 'Alerts/GetAllProfiledAlert', {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getFileUploadAlert(){
    return this.http.get(this.baseUrl + this.verssion + 'Alerts/GetAllProfiledAlert/Batch', {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getAllAlertByBatchNumber(batchNumber){
    return this.http.get(this.baseUrl + this.verssion + 'Alerts/GetAllProfiledAlertByBatch?batchNumber=' + batchNumber, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getSingleAlertDetails(batchNumber){
    return this.http.get(this.baseUrl + this.verssion + 'Alerts/GetAccountAlertDetails?accountNumber=' + batchNumber, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  retryApproveAccount(Id){
    const payload = new HttpParams()
    .set('Id', Id);
    return this.http.post<any>(this.baseUrl + this.verssion + 'authorizer/AccountOpening/Retry', payload, {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
  }


  // FOR APPROVE AND DECLINE
  // tslint:disable-next-line:typedef
  approveAccount(approveOrReject, batchNumber, process ){
    const payload = new HttpParams()
    .set('approveOrReject', approveOrReject)
    .set('batchNumber', batchNumber)
    .set('process', process);
    return this.http.post<any>(this.baseUrl + this.verssion + 'authorizer/Bulk', payload, {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
  }
  // tslint:disable-next-line:typedef
  rejectAccount(approveOrReject, batchNumber, process ){
    const payload = new HttpParams()
    .set('approveOrReject', approveOrReject)
    .set('batchNumber', batchNumber)
    .set('process', process);
    return this.http.post<any>(this.baseUrl + this.verssion + 'authorizer/Bulk', payload, {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
  }

  // tslint:disable-next-line:typedef
  generateAccountForm(accountNo){
    return this.http.get(this.baseUrl + this.verssion + 'AccountOpeningForm/' + accountNo, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

}
