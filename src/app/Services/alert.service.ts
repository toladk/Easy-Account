import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private baseUrl = environment.baseUrl;
  private baseUrl2 = environment.baseUrl2;
  private verssion = environment.verssion;
  private login2 = environment.login;

  constructor(private http: HttpClient) { }

// Alert Profile

AlertsProfile(data){
    return this.http.post(this.baseUrl + this.verssion + 'Alerts/ProfileNew', data, {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
  }

GetAccountAlertDetails(accountNumber: string){
  return this.http.get(this.baseUrl + this.verssion + `Alerts/GetAccountAlertDetails?accountNumber=${accountNumber}`, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  DeleteAlertDetails(data){
  return this.http.post(this.baseUrl + this.verssion + `Alerts/DeleteAlertDetails`, data,{headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  ProfileAlertUpload(data){
    return this.http.post(this.baseUrl + this.verssion + `Alerts/ProfileAlertUpload`, data,{headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getAllPendingAlert(){
    return this.http.get(this.baseUrl + this.verssion + `Alerts/GetAllPendingAlert`, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  approvePendingAlert(id, approveOrReject){
    const payload = { id, approveOrReject};
    return this.http.post(this.baseUrl + this.verssion + `Alerts/ApproveAlert`, payload, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getPendingAlertById(id){
    return this.http.get(this.baseUrl + this.verssion + `Alerts/GetAlertDetailsById/${id}`, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getPendingBatchAlert(){
    return this.http.get(this.baseUrl + this.verssion + `Alerts/GetAllPendingAlert/Batch`, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  approvePendingBatchAlert(batchNumber, approveOrReject){
    const payload = { batchNumber, approveOrReject};
    return this.http.post(this.baseUrl + this.verssion + `Alerts/ApproveAlertBatch`, payload, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

}
