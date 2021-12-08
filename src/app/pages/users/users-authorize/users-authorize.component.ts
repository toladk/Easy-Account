import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-users-authorize',
  templateUrl: './users-authorize.component.html',
  styleUrls: ['./users-authorize.component.css']
})
export class UsersAuthorizeComponent implements OnInit {

allusers: any;
users: any;
totalUsers: number;
size: NzButtonSize = 'large';
profResponds: any;
me: any;
public data: object[];
userByIdResult: any;
user_Id: any;

visible = false;

public form = {
  userId : null,
  ApproveOrReject : null,
  // StaffId : null,
};
  myId: any;
  resMessage: any;
  response: any;
  responsecode: any;
  type: string;
  id: string;
constructor(
  private Jarwis: JarwisService,
  private Token: TokenService,
  private router: Router,
  private Auth: AuthService,
  private message: NzMessageService,
  private nzMessageService: NzMessageService,
  private notification: NzNotificationService,
) { }
expandSet = new Set<number>();
ngOnInit(): void {

  this.data = [
    {
        OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, OrderDate: new Date(8364186e5),
        ShipName: 'Vins et alcools Chevalier', ShipCity: 'Reims', ShipAddress: '59 rue de l Abbaye',
        ShipRegion: 'CJ', ShipPostalCode: '51100', ShipCountry: 'France', Freight: 32.38, Verified: !0
    },
    {
        OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6, OrderDate: new Date(836505e6),
        ShipName: 'Toms Spezialitäten', ShipCity: 'Münster', ShipAddress: 'Luisenstr. 48',
        ShipRegion: 'CJ', ShipPostalCode: '44087', ShipCountry: 'Germany', Freight: 11.61, Verified: !1
    }];

  console.log(`I will init when tab active`);

  this.Jarwis.myProfile().subscribe(
    data => {
      this.profResponds = data;
      this.me = this.profResponds;
      this.myId = this.me.id;
    }
  );

  this.getPendingUsers();
}

open(){
  this.visible = true;
}
close(){
  this.visible = false;
}

getPendingUsers(){
  this.Jarwis.usersPending().subscribe(
    data => {
      const allusers: any = data;
      this.users = allusers.Details;
      this.totalUsers = this.users.length;
    }
  );
}

// createNotification(type: string): void {

// }

approveUs(use){
  this.open();
  this.user_Id = use.user_id;
  console.log('checking user', this.user_Id);
  this.Jarwis.getPendingUserById(use.user_id).subscribe((result: any) => {
    this.userByIdResult = result.Details;
  });
}

confirm() {
  this.id = this.message.loading('Action in progress..', { nzDuration: 0 }).messageId;
  this.form.ApproveOrReject = 'A';
  this.form.userId = this.user_Id;

  this.Jarwis.verifyUsers(this.form).subscribe(
    data => this.handleResponse(data),
    error => this.handleError(error)
  );
}

cancel() {
  this.id = this.message.loading('Action in progress..', { nzDuration: 0 }).messageId;
  this.form.ApproveOrReject = 'R';
  this.form.userId = this.user_Id;
  console.log(this.form);

  this.Jarwis.verifyUsers(this.form).subscribe(
    data => this.handleResponse(data),
    error => this.handleError(error)
  );
}

onExpandChange(id: number, checked: boolean): void {
  if (checked) {
    this.expandSet.add(id);

  } else {
    this.expandSet.delete(id);
  }
}

handleResponse(data): void{
  this.message.remove(this.id);
  this.responsecode = data.ResponseCode;
  this.response = data.ErrorResponse;
  this.resMessage = data.Message;
  this.users = data.Users;

  if (this.responsecode === 0) {
    this.type = 'success';
    this.notification.create(
      this.type,
      this.resMessage,
      this.response
    );
  }
  this.close();
  this.getPendingUsers();

}

handleError(error): void{
  this.message.remove(this.id);
  this.responsecode = error.error.ResponseCode;
  this.response = error.error.ErrorResponse;
  this.resMessage = error.error.Message;


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
      'Error',
      'System Error try again !!'
    );
  }
  this.close();
}

}
