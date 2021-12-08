import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstructionService {

  constructor(
    private http: HttpClient
  ) { }

    // tslint:disable-next-line:typedef
    getAllInstructions(){
      return this.http.get(`${environment.instructionUrl}Instructions/GetAllInstructions`, {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
    }

    // tslint:disable-next-line:typedef
    addAllInstructions(){
      return this.http.get(`${environment.instructionUrl}Instructions/StoreInstructions`, {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
    }

    // tslint:disable-next-line:typedef
    validateAccount( accountNumber){
      const params = new HttpParams()
        .set('accountNumber', accountNumber);
      return this.http.get(`${environment.baseUrl}${environment.verssion}Inquiry/Account?${params}`, {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
    }

    // tslint:disable-next-line:typedef
    postInstruction(data){
      return this.http.post<any>(`${environment.instructionUrl}Instructions/StoreInstructions`, data, { headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
    }

    // tslint:disable-next-line:typedef
    getAllPendingInstructions(){
      return this.http.get(`${environment.instructionUrl}Instructions/GetPendingInstructions`, {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
    }

    // tslint:disable-next-line:typedef
    getInstructionById(id){
      return this.http.get(`${environment.instructionUrl}Instructions/GetPendingInstructionsById?instructionId=${id}`, {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
    }

    // tslint:disable-next-line:typedef
    viewInstructionId(id){
      return this.http.get(`${environment.instructionUrl}Instructions/GetInstructionById/${id}`, {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
    }

    // tslint:disable-next-line:typedef
    approveOrRejectInstruction(approveOrReject, functionCode, instructionId, auditId, approver, extensionId, oldId){
      const payload = { approveOrReject, functionCode, instructionId, auditId, approver, extensionId, oldId };
      return this.http.post(`${environment.instructionUrl}Instructions/AuthorizeInstructions`, payload, {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
    }

    // tslint:disable-next-line:typedef
    deleteInstruction(id, updatedBy){
      return this.http.delete(`${environment.instructionUrl}Instructions/DeleteInstructions/${id}/${updatedBy}`, {headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
    }

    // tslint:disable-next-line:typedef
    updateInstruction(id, data){
      return this.http.patch(`${environment.instructionUrl}Instructions/UpdateInstructions/${id}`, data, { headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }});
    }


}
