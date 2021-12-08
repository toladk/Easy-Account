import { UserModel } from './model/usermodel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-for-users',
  templateUrl: './for-users.component.html',
  styleUrls: ['./for-users.component.css']
})
export class ForUsersComponent implements OnInit {

  userForm: FormGroup;
  addSuspenseForm: FormGroup;

  // for searching
  searchValue: string;

  allUsers: UserModel[] = [];
  allRolesList = [];
  adDetails: any;
  userResult: any;
  userDetails: any;
  allPermissions = [];
  allPermissions2 = [];
  permissionsList = [];
  accountDetails: any;
  suspenseDetails: any;
  accountNumb: any;

  validateBtn = true;
  validateBtn2 = false;
  showForm = true;
  showFormRest = false;
  show = true;
  show2 = false;
  showB1 = true;
  showB2 = false;
  showB3 = false;
  showcont1 = true;
  showcont2 = false;
  subb1 = true;
  subb2 = false;
  isOkLoading = false;
  isLoadingBtn = false;
  isLoadingExport = false;

  emp_id: any;
  userId: any;
  uss: any;
  editRoleValue: any;

  // for buttons
  size: NzButtonSize = 'small';

  // Pagination
  pagination = 1;

  //Drawer
  drawerOpen = false;
  drawerOpen2 = false;
  drawerOpen3 = false;
  drawerOpen4 = false;
  drawerOpen5 = false;

  profResponds: any;
  me: any;
  firstname: any;
  lastname: any;
  job: any;
  Role: any;
  public admin: boolean;
  public sacCheck: boolean;

  // form builder and ngModel
  useForm = {
    username: '',
    department: '',
    email: '',
    first_name: '',
    last_name: '',
    job_title: '',
    emp_id: '',
    role: '',
    permissions: [],
    two_factor: '',
  };

  userDetails2: any;
  userDetailsSlug: any;
  deleteUserdetails: any;
  exportDetails: any;

  constructor(
    private jarwisService: JarwisService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      emp_id: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      department: ['', Validators.required],
      email: ['', Validators.required],
      job_title: ['', Validators.required],
      role: ['', Validators.required],
      permissions: [],
      two_factor: ['', Validators.required],
      username: ['', Validators.required],
    });

    this.addSuspenseForm = this.formBuilder.group({
      accountInquiry: ['', Validators.required],
      userId: ['', Validators.required],
      payableAccount: ['', Validators.required],
    });

    this.getAllUsers();
    this.getAllRoles();

    this.jarwisService.myProfile().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
        this.firstname = this.me.first_name;
        this.lastname = this.me.last_name;
        this.job = this.me.job_title;
        this.Role = this.me.role;
        console.log('checking Role', this.Role);
        if (this.Role === 'admin') {
          this.admin = true;
          this.sacCheck = true;
        } else if (this.Role === 'sac') {
          this.admin = true;
          this.sacCheck = true;
        } else if (this.Role === 'inputter') {
          this.sacCheck = true;
        } else if (this.Role === 'authorizer') {

        }
      }
    );

  }

  // Sorting
  key = 'id';
  reverse = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  open(): void {
    this.drawerOpen = true;
  }
  close(){
    this.drawerOpen = false;
  }

  open2(): void {
    this.drawerOpen2 = true;
    //this.useForm.permissions = this.permissionsList;
  }
  close2(){
    this.drawerOpen2 = false;
  }

  open3(): void {
    this.drawerOpen3 = true;
  }
  close3(){
    this.drawerOpen3 = false;
  }

  open4(): void {
    this.drawerOpen4 = true;
  }
  close4(){
    this.drawerOpen4 = false;
  }

  open5(): void {
    this.drawerOpen5 = true;
  }
  close5(){
    this.drawerOpen5 = false;
  }

  clear(){
    this.userForm.reset();
  }

  validateAccount(){
    this.validateBtn = false;
    this.validateBtn2 = true;
    this.jarwisService.getUserADDetails(this.userForm.value.emp_id).subscribe((result: any) => {
      this.adDetails = result.Details;
      this.notification.success( 'Validate Employee ID', 'Employee ID Validated Successfully!!' );
      this.showFormRest = true;
      this.showForm = false;

      this.emp_id = this.userForm.value.emp_id;
      console.log('id', this.emp_id)
      this.useForm.username = this.adDetails.username;
      this.useForm.department = this.adDetails.department;
      this.useForm.email = this.adDetails.email;
      this.useForm.first_name = this.adDetails.first_name;
      this.useForm.last_name = this.adDetails.last_name;
      this.useForm.job_title = this.adDetails.job_title;

    }, error => {
      this.validateBtn = true;
      this.validateBtn2 = false;
      this.notification.error( 'Validate Employee ID', error.error.Message || 'Validate Employee ID', error.error.message );
    });
  }

  // Create User
  createUser(){
    this.isLoadingBtn = true;
    delete this.userForm.value.permissions;
    // this.userForm.value.permissions = this.permissionsList;
    this.emp_id = this.userForm.value.emp_id;
    this.jarwisService.createUser(this.userForm.value).subscribe((result: any) => {
      this.userResult = result;
      this.notification.success( 'Create User', 'User Created Successfully !!' );
      this.close();
      this.close2();
      this.showForm = true;
      this.showFormRest = false;
      this.isLoadingBtn = false;
      this.clear();
      this.getAllUsers();
    }, error => {
      this.isLoadingBtn = false;
      this.showForm = true;
      this.showFormRest = false;
      this.notification.error( 'Create User', error.error.message || error.error.ErrorResponse );
    });
  }

  // Update User
  updateUs(uss){
    this.drawerOpen3 = true;
    this.userId = uss.id;
    this.jarwisService.getUser(uss.id).subscribe((result: any) => {
      this.userForm.patchValue({...result.User});
      this.userDetails2 = result.UserRole;
      this.userDetailsSlug = this.userDetails2.slug;
    });
  }
  updateUser(){
    delete this.userForm.value.permissions;
    this.jarwisService.updateUser(this.userId, this.userForm.value).subscribe((result: any) => {
      this.userResult = result;
      this.close3();
      this.notification.success( 'Update User', ' Update submitted for approval !!' );
    }, error => {
      this.open3();
      this.notification.error( 'Update User', error.error.message );
    });
  }

  getAllUsers(){
    this.show = true;
    this.show2 = false;
    this.jarwisService.users().subscribe((result: any) => {
      this.allUsers = result.Details;
      this.show = false;
      this.show2 = true;
    },error => {
      this.show = false;
      this.show2 = true
      this.notification.error( 'All Users', error.error.message )
    });
  }

  getAllRoles(){
    this.jarwisService.getRoles().subscribe((result: any) => {
      this.allRolesList = result.Details;
    });
  }

  getRolePermissions(){
    console.log('checking use form', this.useForm.role)
    this.jarwisService.getRolePermissions(this.useForm.role).subscribe((result: any) => {
      result.Details.forEach(element => {
        element.isChecked = false;
      });
      this.allPermissions = result.Details;
      console.log('checking perm', this.allPermissions)
    });
  }
  getEditRolePermissions(){
    console.log('checking Role form', this.editRoleValue)
    this.jarwisService.getRolePermissions(this.userForm.value.role).subscribe((result: any) => {
      result.Details.forEach(element => {
        element.isChecked = false;
      });
      this.allPermissions2 = result.Details;
      console.log('checking perm', this.allPermissions2)
    });
  }

  permissionSelect(obj, isChecked: boolean){
    if (isChecked) {
      this.allPermissions.map(item => {
        if ( obj.id === item.id){
          item.isChecked = true;
        }
      })
    } else {
      this.allPermissions.map(item => {
        if ( obj.id === item.id){
          item.isChecked = false;
        }
      })
    }
    this.permissionsList = this.allPermissions.filter(item => item.isChecked);
    console.log('checking permission', this.permissionsList);
  }


  // View User Details
  viewUser(uss){
    this.open4();
    this.jarwisService.getUser(uss.id).subscribe((result: any) => {
      this.userDetails = result.User;
      this.userDetails2 = result.UserRole;
    });
  }

  //Add Suspense Account
  addSus(uss){
    this.open5();
    this.userId = uss.id;
    this.jarwisService.getUser(uss.id).subscribe((result: any) => {
      this.userDetails = result;
    });
  }
  verifySuspenseAccount(){
    this.showB1 = false;
    this.showB2 = true;
    this.jarwisService.suspenseAccount(this.addSuspenseForm.value.accountInquiry).subscribe((result: any) => {
      this.accountDetails = result.accountDetails;

      this.accountNumb = this.accountDetails.account_number;
      this.showB2 = false;
      this.showB3 = true;
      this.showcont1 = false;
      this.showcont2 = true;
      this.notification.success( 'Verify Account', 'Account Verified Successfully !!' );
    }, error => {
      this.showB1 = true;
      this.showB2 = false;
      this.notification.error( 'Verify Account', error.error.message || error.error.responseMessage  );
    });
  }

  addSuspenseAccount(){
    this.isOkLoading = true;
    delete this.addSuspenseForm.value.accountInquiry;
    this.addSuspenseForm.value.userId = this.userId;
    this.addSuspenseForm.value.payableAccount = this.accountNumb;
    this.jarwisService.addSuspenseAccount(this.addSuspenseForm.value).subscribe((result: any) => {
      this.suspenseDetails = result;
      this.close5();
      this.getAllUsers();
      this.notification.success( 'Add Suspense Account', 'Suspense Account Added Successfully !!' );
      location.reload();
    }, error => {
      this.isOkLoading = false;
      this.notification.error( 'Add Suspense Account', error.error.message || error.error.responseMessage );
    });
  }

  deleteUser(user): void{
    this.jarwisService.deleteUser(user.id).subscribe((result: any) => {
      this.deleteUserdetails = result;
      this.notification.success( 'User', 'Disbale initiation successfull, pending authorization !!' );
      this.getAllUsers();
    }, error => {
      this.notification.error( 'User', error.error.message || error.error.responseMessage || error.error.ErrorResponse );
    });
  }

  exportUser(): void{
    this.isLoadingExport = true;
    const testUrl = 'http://10.0.33.122:81/easyAccount/api/v1/UserExport';
    const liveUrl = 'http://10.0.1.176:8025/easyAccount/api/v1/UserExport';
    window.open(testUrl, '_blank');
    this.isLoadingExport = false;
  }

}
