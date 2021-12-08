import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

    private baseUrl = environment.baseUrl;
    private baseUrl2 = environment.baseUrl2;
    private verssion = environment.verssion;
    private login2 = environment.login;
    private commonAPI = environment.commonAPI;
    private twoFactor = environment.twoFactor;

  constructor(private http: HttpClient) { }

  signup(data) {
    return this.http.post(this.baseUrl + 'signup' , data)
  }
  // login(data) {
  //   return this.http.post(this.baseUrl + 'login', data);
  // }

  login(data) {
    return this.http.post(this.login2, data);
  }

  twoFactorLogin(data){
    return this.http.post(this.twoFactor + this.verssion + 'session/two-factor', data);
  }

  refreshToken() {
    return this.http.get(this.baseUrl + this.verssion + 'session/refresh-token', {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getRoles() {
    return this.http.get(this.baseUrl + this.verssion + 'users/getRoles', {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getEmployeeId(id: string) {
    return this.http.get(this.baseUrl + this.verssion + 'GetEmployeeDetails?employeeId=' + id, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getUserADDetails(id: string) {
    return this.http.get(this.baseUrl + this.verssion + 'users/' + 'getUserADDetails/' + id, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  createUser(data) {
    return this.http.post( this.baseUrl + this.verssion + 'users/create' , data , {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  verifyUser(data){
    return this.http.post(this.baseUrl + this.verssion + 'users/verify', data, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  profile() {
    return this.http.get(this.baseUrl + 'me', {
      headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      }
    })
  }

  myProfile() {
    return this.http.get(this.baseUrl + this.verssion + 'session/authenticated-user', {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  verifyUsers(data) {
    return this.http.post(this.baseUrl + this.verssion + 'users/verify', data, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  deleteUsers(id: string) {
    return this.http.get(this.baseUrl + this.verssion + 'users/' + 'delete?UserId=' + id, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  users() {
    return this.http.get(this.baseUrl + this.verssion + 'users', {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getUser(id: string) {
    return this.http.get(this.baseUrl + this.verssion + 'users/' + id + '/edit', {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getPendingUserById(id: string) {
    return this.http.get(this.baseUrl + this.verssion + 'users/' + id + '/show', {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  updateUser(id: string, data) {
    return this.http.post(this.baseUrl + this.verssion + 'users/' + id + '/edit', data, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  usersPending() {
    return this.http.get(this.baseUrl + this.verssion + 'users/pending', {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  // Common api

  validCodesSectors() {
    return this.http.get(this.baseUrl + this.verssion + 'SectorCodes', {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  validCodesSubSectors() {
    return this.http.get(this.baseUrl + this.verssion + 'SubSectorCodes', {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  validCodesSegments() {
    return this.http.get(this.baseUrl + this.verssion + 'SegmentCodes', {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  validCodesSubSegments() {
    return this.http.get(this.baseUrl + this.verssion + 'SubSegmentCodes', {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  validCodesSegmentsCustomer() {
    return this.http.get(this.baseUrl + this.verssion + 'CrmSegmentCodes', {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  validCodesSubSegmentsCustomer() {
    return this.http.get(this.baseUrl + this.verssion + 'CrmSubSegmentCodes', {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getSubSegmentsCustomer(id) {
    return this.http.get(this.baseUrl + this.verssion + 'CrmSubSegmentCodes?segmentCode=' + id, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  validCodesStates() {
    return this.http.get(this.baseUrl + this.verssion + 'States', {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  validCodesCities() {
    return this.http.get(this.baseUrl + this.verssion + 'LocalGovernment', {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  // Document API

  DocumentTypes() {
    return this.http.get(this.baseUrl + this.verssion + 'DocumentTypes', {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  DocumentCodes(id) {
    return this.http.get(this.baseUrl + this.verssion + 'DocumentCodes?documentTypeCode=' + id, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }


  getRolePermissions(id){
    return this.http.get(this.baseUrl + this.verssion + 'users/getPermissions/' + id, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  suspenseAccount( accountNumber){
    const params = new HttpParams()
      .set('accountNumber', accountNumber);
    return this.http.get(this.baseUrl + this.verssion + 'Inquiry/Account?' + params, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  addSuspenseAccount(data) {
    return this.http.post(this.baseUrl + this.verssion + 'users/addExtras', data, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  deleteUser(data){
    return this.http.get(this.baseUrl + this.verssion + 'users/delete?UserId=' + data, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  exportUser(){
    return this.http.get(this.baseUrl + this.verssion + 'UserExport', {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getAuditUser(){
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${this.baseUrl}${this.verssion}audit/users`, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getAuditUserFilter(inputter, authorizer, startDate, endDate){
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${this.baseUrl}${this.verssion}audit/users?inputter=${inputter}&authorizer=${authorizer}&startDate=${startDate}&endDate=${endDate}`, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  downloadAuditUserFilter(inputter, authorizer, startDate, endDate){
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${this.baseUrl}${this.verssion}audit/users/download?inputter=${inputter}&authorizer=${authorizer}&startDate=${startDate}&endDate=${endDate}`, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }



}
