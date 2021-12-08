import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountMandateService {

  private baseUrl = environment.baseUrl;
  private baseUrl2 = environment.baseUrl2;
  private verssion = environment.verssion;
  private login2 = environment.login;

  constructor(private http: HttpClient) { }

// CREATE MANDATE

  CreateMandate(data){
    return this.http.post(this.baseUrl + this.verssion + 'Mandate/Add', data, {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
  }

  CreateBulkMandate(data){
    return this.http.post(this.baseUrl + this.verssion + 'inputter/BulkMandate/Add', data, {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
  }

// PENDING MANDATE
  PendingMandate() {
    return this.http.get(this.baseUrl + this.verssion + 'BulkMandate/Add/pendingAuthorization', {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
  }

  // APPROVE MANDATE
  approveMandate( approveOrReject, batchNumber ) {
    let payload = { approveOrReject, batchNumber }
    return this.http.post(this.baseUrl + this.verssion + 'authorizer/AccountMandate', payload, {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
  }

  // REJECT MANDATE
  rejectMandate(approveOrReject, batchNumber) {
    let payload = { approveOrReject, batchNumber }
    return this.http.post(this.baseUrl + this.verssion + 'authorizer/AccountMandate', payload, {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
  }

  getPendingMandateById(id){
    return this.http.get(this.baseUrl + this.verssion + 'Mandate/Details/' + id, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getPendingMandateDetailsById(id){
    return this.http.get(this.baseUrl + this.verssion + 'Mandate/Details/ById/' + id, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getAllApprovedMandate(){
    return this.http.get(this.baseUrl + this.verssion + 'Mandate/All', {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }
}
