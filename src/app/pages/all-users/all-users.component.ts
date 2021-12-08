import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  public form = {
    department: null,
    username: null,
    email:  null,
    first_name:  null,
    last_name: null,
    job_title: null,
    role : null,
    emp_id : null,
    two_factor: null,
    permissions : [ ]
};


public updateForm = {
  department: '',
  username: null,
  email:  null,
  first_name:  null,
  last_name: null,
  job_title: null,
  emp_id : null,
  two_factor: null,
  permissions : [ ],
  deleted: null,
  last_login : null,
  deleted_at: null,
  created_at : null,
  new_user : null,
  Roles: null,
  StaffId: null,
  role: null
};

data = [
  // 'Racing car sprays burning fuel into crowd.',
  // 'Japanese princess to wed commoner.',
  // 'Australian walks 100km after outback crash.',
  // 'Man charged over missing wedding girl.',
  // 'Los Angeles battles huge wildfires.'
];

permissionResCod: any;
permissions: any;
error: any;
adResponse: any;
adDetails: any;
admessage: any;
loadDetails: boolean;
showsDetails: boolean;
disabled = false;
disabled2 = false;

listOfOption: Array<{ label: string; value: string }> = [];
listOfTagOptions = [];
size: NzButtonSize = 'large';

allusers: any;
users: any;
totalUsers: number;
visible = false;
current = 0;
index = 'First-content';
success: any;
resMessage: any;
response: any;
responsecode: any;
visible2: boolean;
upResponse: any;
upDetails: any;
upmessage: any;
  type: string;
  userRoles: any;
  Roles: any;
  userId: any;
  profResponds: any;
  me: any;
  myId: any;
  loading: boolean;
  totalRole: any;
constructor(
  private Jarwis: JarwisService,
  private Token: TokenService,
  private router: Router,
  private Auth: AuthService,
  private nzMessageService: NzMessageService,
  private notification: NzNotificationService,
) { }
expandSet = new Set<number>();
  ngOnInit(): void {
    this.loading = true;
    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;


    console.log(`I will init when tab active`);

    this.Jarwis.myProfile().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
        this.myId = this.me.emp_id;
      }
    );

    this.Jarwis.getRoles().subscribe(
      data => {
        this.loading = false;
        const getRoles: any = data;
        this.Roles = getRoles.Details;
        this.totalRole = this.Roles.length;
      }
    );

    this.Jarwis.users().subscribe(
      data => {
        this.loading = false;
        const allusers: any = data;
        this.users = allusers.Details;
        this.totalUsers = this.users.length;
      }
    );
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  open(): void {
    this.visible = true;
  }

  openUpdate(id){
    this.visible2 = true;
    this.userId = id;
    this.disabled = true;
    this.current = 0;
    this.changeContent();
    this.Jarwis.getUser(id).subscribe(
      data => {
          this.disabled = false;
          this.upResponse = data;
          this.upDetails = this.upResponse.User;
          this.upmessage = this.upResponse.Message;
          this.Roles = this.upResponse.Roles;
          // this.loadDetails = false;
          // this.error = false;
          // this.success = this.admessage;
          this.updateForm.department = this.upDetails.department;
          this.updateForm.email = this.upDetails.email;
          this.updateForm.first_name = this.upDetails.first_name;
          this.updateForm.last_name = this.upDetails.last_name;
          this.updateForm.username = this.upDetails.username;
          this.updateForm.job_title = this.upDetails.job_title;
          this.updateForm.emp_id = this.upDetails.emp_id;
          this.updateForm.two_factor = this.upDetails.two_factor;
          this.updateForm.permissions = this.upDetails.permissions;
          this.updateForm.deleted = this.upDetails.deleted;
          this.updateForm.last_login  = this.upDetails.last_login;
          this.updateForm.deleted_at = this.upDetails.deleted_at;
          this.updateForm.created_at  = this.upDetails.created_at;
          this.updateForm.new_user  = this.upDetails.new_user;
          this.updateForm.role = this.upResponse.UserRole.name;
          this.updateForm.StaffId = this.myId;

          this.error = false;
        },
      error => {
        this.error = 'Invalid credentials';
        this.loadDetails = false;
        this.disabled = false;
        this.upResponse = error.error;
        this.upDetails = [];
        this.responsecode = this.upResponse.ResponseCode;
        this.response = this.upResponse.ErrorResponse;
        this.resMessage = this.upResponse.Message;

        if (this.responsecode === 3) {
          this.type = 'error';
          this.notification.create(
            this.type,
            this.resMessage,
            this.response
          );
        }

        this.updateForm.department = this.upDetails.department;
        this.updateForm.email = this.upDetails.email;
        this.updateForm.first_name = this.upDetails.first_name;
        this.updateForm.last_name = this.upDetails.last_name;
        this.updateForm.username = this.upDetails.username;
        this.updateForm.job_title = this.upDetails.job_title;
        this.updateForm.emp_id = this.upDetails.emp_id;
        this.updateForm.two_factor = this.upDetails.two_factor;
        this.updateForm.permissions = [];
        this.updateForm.deleted = this.upDetails.deleted;
        this.updateForm.last_login  = this.upDetails.last_login;
        this.updateForm.deleted_at = this.upDetails.deleted_at;
        this.updateForm.created_at  = this.upDetails.created_at;
        this.updateForm.new_user  = this.upDetails.new_user;
        this.updateForm.Roles = this.upDetails.Roles;
        this.updateForm.role = this.upDetails.UserRole;

      },
    );
  }

  onUpdate(): void{
    this.disabled2 = true;
    this.Jarwis.updateUser(this.userId, this.updateForm).subscribe(
      data => this.handleResponse2(data),
      error => this.handleError2(error)
    );
  }

  onDelete(val): void {

    this.Jarwis.deleteUsers(val).subscribe(
      data => this.handleResponse2(data),
      error => this.handleError2(error)
    );
  }

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  close(): void {
    this.visible = false;
    this.visible2 = false;
  }

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
    this.data[0] = this.form;
  }

  again(){
    this.current = 0;
    this.changeContent();
    this.showsDetails = false;
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
        this.index = 'Fourth-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

onGo(){
  this.disabled = true;
  this.loadDetails = true;
  if (this.form.emp_id === '') {
    this.error = 'Empty field, Please inpute the user A.D';
    this.disabled = false;
    this.loadDetails = false;
  } else {

     this.Jarwis.getUserADDetails(this.form.emp_id).subscribe(
        data => {
                this.disabled = false;
                this.adResponse = data;
                this.adDetails = this.adResponse.Details;
                this.admessage = this.adResponse.message;
                this.admessage = this.adResponse.message;
                this.loadDetails = false;
                this.error = false;
                this.success = this.admessage;

                this.form.department = this.adDetails.department;
                this.form.email = this.adDetails.email;
                this.form.first_name = this.adDetails.first_name;
                this.form.last_name = this.adDetails.last_name;
                this.form.username = this.adDetails.username;
                this.form.job_title = this.adDetails.job_title;
                this.showsDetails = true;
              },
        error => {
          this.error = 'Invalid credentials';
          this.loadDetails = false;
          this.disabled = false;
        },
      );

  }
}

onSubmit(){
  this.disabled2 = true;
  this.Jarwis.createUser(this.form).subscribe(
    data => this.handleResponse(data),
    error => this.handleError(error)
  );
}

handleResponse(data){
  this.disabled = false;
  this.disabled2 = false;
  this.current += 1;
  this.changeContent();

  this.responsecode = data.ResponseCode;
  this.response = data.ErrorResponse;
  this.resMessage = data.Message;
  this.users = data.Users;

  if (this.responsecode === 0) {
    this.type = 'success';
    this.notification.create(
      this.type,
      this.resMessage,
      'Operation successfull'
    );
  }

}

handleError(error){
  this.disabled2 = false;
  this.responsecode = error.error.ResponseCode;
  this.response = error.error.ErrorResponse;
  this.current += 1;
  this.changeContent();

}

handleResponse2(data): void{
  this.disabled2 = false;
  this.responsecode = data.ResponseCode;
  this.response = data.ErrorResponse;
  this.resMessage = data.Message;
  this.users = data.Users;

  if (this.responsecode === 0) {
    this.type = 'success';
    this.notification.create(
      this.type,
      this.resMessage,
      'Operation successfull'
    );
  }

}

handleError2(error): void{
  this.disabled2 = false;
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
      'Operation not successfull',
      'Something on usual went wrong'
    );
  }

}
}
