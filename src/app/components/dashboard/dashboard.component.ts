import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { CustomerAccountService } from 'src/app/Services/customer-account.service';
import {NzButtonSize} from 'ng-zorro-antd/button';
// import { dataMapping } from 'datasource.ts';

declare let $: any;
declare let flotSampleData3: any;
declare let flotSampleData4: any;
declare let dashData2: any;
declare let Chart: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // public piedata = [{x: 'Active Account', y: 0, text: 'Pending Account'}, {x: 'Pending Account', y: 0, text: 'Pending Account'}];
  public piedata = [{x: 'Active Account', y: 0, text: 'Pending Account'}, {x: 'Pending Account', y: 0, text: 'Pending Account'}];
  public legendSettings: Object;
  public datalabel: Object;

  public loggedIn: boolean;
  isCollapsed = false;
  profResponds: any;
  me: any;
  firstname: any;
  lastname: any;
  job: any;
  users: any;
  totalUsers: any;
  totalPendingUsers: any;
  pendingUsers: any;

  RetailResponds: any;
  retails: any;
  size: NzButtonSize = 'large';


  initLoading = true; // bug
  loadingMore = false;
  data: any[] = [];
  list: Array<{ loading: boolean; name: any }> = [];

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
  loading: boolean;
  retailsCount: any;
  customerUpdateCount: any;
  pregeneratedRetailCount: any;
  pregeneratedCorporateCount: any;
  corporatesCount: any;
  accountOpenings: any;
  countaccountOpenings: any;
  corporateAccount: any;
  countcorporateAccount: any;
  Role: any;
  public admin: boolean;
  public sac: boolean;
  public authorizer: boolean;

  constructor(
    private Auth: AuthService,
    private router: Router,
    private Token: TokenService,
    private Jarwis: JarwisService,
    private customerAccount: CustomerAccountService,
  ) { }

  ngOnInit(): void {

    this.reload();

    this.customerAccount.IndividualAccountPendAuth().subscribe(
      data => {
        const CorporateAccountPend: any = data;
        this.corporateAccount = CorporateAccountPend.details;
        this.countcorporateAccount = this.corporateAccount.length;
        if (this.countcorporateAccount == null){
          this.countcorporateAccount = 0;
          this.piedata[0].y = this.countcorporateAccount;
        }else{
          this.countcorporateAccount = this.corporateAccount.length;
          this.piedata[0].y = this.countcorporateAccount;
        }
      },
      _error => {
        this.loading = false;
      }
    );

    this.customerAccount.AccountOpeningAuthorized().subscribe(
      data => {
        const AccountOpeningAuthorized: any = data;
        this.accountOpenings = AccountOpeningAuthorized.details;
        this.countaccountOpenings = this.accountOpenings.length;

        if (this.countaccountOpenings == null){
          this.countaccountOpenings = 0;
          this.piedata[1].y = this.countaccountOpenings;
        }else{
          this.countaccountOpenings = this.accountOpenings.length;
          this.piedata[1].y = this.countaccountOpenings;
        }


        this.piedata = [
              { x: 'Active Account', y: this.countaccountOpenings, text: 'Active Account: ' + this.countaccountOpenings },
              { x: 'Pending Account', y: this.countcorporateAccount, text: 'Pending Account: ' + this.countcorporateAccount }
           ];

          // this.piedata = [
          //   { x: 'Jan', y: 3, text: 'Jan: 3' }, { x: 'Feb', y: 3.5, text: 'Feb: 3.5' },
          //   { x: 'Mar', y: 7, text: 'Mar: 7' }, { x: 'Apr', y: 13.5, text: 'Apr: 13.5' },
          //   { x: 'May', y: 19, text: 'May: 19' }, { x: 'Jun', y: 23.5, text: 'Jun: 23.5' },
          //   { x: 'Jul', y: 26, text: 'Jul: 26' }, { x: 'Aug', y: 25, text: 'Aug: 25' },
          //   { x: 'Sep', y: 21, text: 'Sep: 21' }, { x: 'Oct', y: 15, text: 'Oct: 15' },
          //   { x: 'Nov', y: 9, text: 'Nov: 9' }, { x: 'Dec', y: 3.5, text: 'Dec: 3.5' }];

        this.legendSettings = {
              visible: false
            };
        this.datalabel = { visible: true, name: 'text', position: 'Outside' };

        console.log(this.piedata);


      },
      _error => {
        this.loading = false;
      }
    );

    this.loadGraph();
    this.wizardScript();

    // this.piedata = [
    //   { x: 'Active Account', y: 0, text: 'Active Account: 10' }, { x: 'Pending Account', y: 0, text: 'Pending Account:0' },
    //  ];

    this.Jarwis.myProfile().subscribe(
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
        } else if (this.Role === 'sac') {
          this.sac = true;
        } else if (this.Role === 'authorizer') {
          this.authorizer = true;
        }
      });

    this.Jarwis.users().subscribe(
      data => {
        const allusers: any = data;
        this.users = allusers.Details;
        this.totalUsers = this.users.length;
      }
    );

    this.Jarwis.usersPending().subscribe(
      data => {
        const allPusers: any = data;
        this.pendingUsers = allPusers.Details;
        this.totalPendingUsers = this.pendingUsers.length;
      }
    );

    this.customerAccount.getBatchRetail().subscribe(
      data => {
        this.RetailResponds = data;
        this.retails = this.RetailResponds.details;
        this.retailsCount = this.retails.length;
        this.loading = false;
      }
    );

    this.customerAccount.getBatchCorporate().subscribe(
      data => {
        this.CorporateResponds = data;
        this.allCorporates = this.CorporateResponds.details;
        this.corporatesCount = this.allCorporates.length;
      }
    );

    this.customerAccount.getBatchPregeneratedCorporate().subscribe(
      data => {
        this.pregeneratedCorporateResponds = data;
        this.allPregeneratedCorporate = this.pregeneratedCorporateResponds.details;
        this.pregeneratedCorporateCount = this.allPregeneratedCorporate.length;
      }
    );

    this.customerAccount.getBatchPregeneratedRetail().subscribe(
      data => {
        this.pregeneratedRetailResponds = data;
        this.allPregeneratedRetail = this.pregeneratedRetailResponds.details;
        this.pregeneratedRetailCount = this.allPregeneratedRetail.length;
      }
    );

    this.customerAccount.getBatchCustomerUpdate().subscribe(
      data => {
        this.CustomerUpdateResponds = data;
        this.allCustomerUpdate = this.CustomerUpdateResponds.details;
        this.customerUpdateCount = this.allCustomerUpdate.length;
      }
    );

    if ( this.corporateAccount){
    //   this.piedata = [
    //     { x: 'Active Account', y: this.countaccountOpenings, text: 'Active Account: 3' },
    //     { x: 'Pending Account', y: this.countcorporateAccount, text: 'Pending Account: 3.5' }
    //  ];

    this.piedata = [
      { x: 'Jan', y: 3, text: 'Jan: 3' }, { x: 'Feb', y: 3.5, text: 'Feb: 3.5' },
      { x: 'Mar', y: 7, text: 'Mar: 7' }, { x: 'Apr', y: 13.5, text: 'Apr: 13.5' },
      { x: 'May', y: 19, text: 'May: 19' }, { x: 'Jun', y: 23.5, text: 'Jun: 23.5' },
      { x: 'Jul', y: 26, text: 'Jul: 26' }, { x: 'Aug', y: 25, text: 'Aug: 25' },
      { x: 'Sep', y: 21, text: 'Sep: 21' }, { x: 'Oct', y: 15, text: 'Oct: 15' },
      { x: 'Nov', y: 9, text: 'Nov: 9' }, { x: 'Dec', y: 3.5, text: 'Dec: 3.5' }];

    this.legendSettings = {
        visible: false
      };
    this.datalabel = { visible: true, name: 'text', position: 'Outside' };

    console.log(this.piedata);
    }
  }

  reload(){
    if (sessionStorage.getItem('reload') === 'true') {

    } else {
      sessionStorage.setItem('reload', 'true')
      window.location.reload();
    }
  }

  loadGraph(){
    console.log(this.corporateAccount);
    console.log(this.accountOpenings);
  }


  wizardScript(): void{

    // $(function(){
    //   'use strict';

    //   const plot = $.plot('#flotChart', [{
    //     data: flotSampleData3,
    //     color: '#007bff',
    //     lines: {
    //       fillColor: { colors: [{ opacity: 0 }, { opacity: 0.2 }]}
    //     }
    //   }, {
    //     data: flotSampleData4,
    //     color: '#560bd0',
    //     lines: {
    //       fillColor: { colors: [{ opacity: 0 }, { opacity: 0.2 }]}
    //     }
    //   }], {
    //     series: {
    //       shadowSize: 0,
    //       lines: {
    //         show: true,
    //         lineWidth: 2,
    //         fill: true
    //       }
    //     },
    //     grid: {
    //       borderWidth: 0,
    //       labelMargin: 8
    //     },
    //     yaxis: {
    //       show: true,
    //       min: 0,
    //       max: 100,
    //       ticks: [[0, ''], [20, '20K'], [40, '40K'], [60, '60K'], [80, '80K']],
    //       tickColor: '#eee'
    //     },
    //     xaxis: {
    //       show: true,
    //       color: '#fff',
    //       ticks: [[25, 'OCT 21'], [75, 'OCT 22'], [100, 'OCT 23'], [125, 'OCT 24']],
    //     }
    //   });

    //   $.plot('#flotChart1', [{
    //     data: dashData2,
    //     color: '#00cccc'
    //   }], {
    //     series: {
    //       shadowSize: 0,
    //       lines: {
    //         show: true,
    //         lineWidth: 2,
    //         fill: true,
    //         fillColor: { colors: [ { opacity: 0.2 }, { opacity: 0.2 } ] }
    //       }
    //     },
    //     grid: {
    //       borderWidth: 0,
    //       labelMargin: 0
    //     },
    //     yaxis: {
    //       show: false,
    //       min: 0,
    //       max: 35
    //     },
    //     xaxis: {
    //       show: false,
    //       max: 50
    //     }
    //   });

    //   $.plot('#flotChart2', [{
    //     data: dashData2,
    //     color: '#007bff'
    //   }], {
    //     series: {
    //       shadowSize: 0,
    //       bars: {
    //         show: true,
    //         lineWidth: 0,
    //         fill: 1,
    //         barWidth: .5
    //       }
    //     },
    //     grid: {
    //       borderWidth: 0,
    //       labelMargin: 0
    //     },
    //     yaxis: {
    //       show: false,
    //       min: 0,
    //       max: 35
    //     },
    //     xaxis: {
    //       show: false,
    //       max: 20
    //     }
    //   });


    //   // -------------------------------------------------------------//


    //   // Line chart
    //   $('.peity-line').peity('line');

    //   // Bar charts
    //   $('.peity-bar').peity('bar');

    //   // Bar charts
    //   $('.peity-donut').peity('donut');

    //   const ctx5 = document.getElementById('chartBar5');
    //   // tslint:disable-next-line:no-unused-expression
    //   new Chart(ctx5, {
    //     type: 'bar',
    //     data: {
    //       labels: [0, 1, 2, 3, 4, 5, 6, 7],
    //       datasets: [{
    //         data: [2, 4, 10, 20, 45, 40, 35, 18],
    //         backgroundColor: '#560bd0'
    //       }, {
    //         data: [3, 6, 15, 35, 50, 45, 35, 25],
    //         backgroundColor: '#cad0e8'
    //       }]
    //     },
    //     options: {
    //       maintainAspectRatio: false,
    //       tooltips: {
    //         enabled: false
    //       },
    //       legend: {
    //         display: false,
    //           labels: {
    //             display: false
    //           }
    //       },
    //       scales: {
    //         yAxes: [{
    //           display: false,
    //           ticks: {
    //             beginAtZero: true,
    //             fontSize: 11,
    //             max: 80
    //           }
    //         }],
    //         xAxes: [{
    //           barPercentage: 0.6,
    //           gridLines: {
    //             color: 'rgba(0,0,0,0.08)'
    //           },
    //           ticks: {
    //             beginAtZero: true,
    //             fontSize: 11,
    //             display: false
    //           }
    //         }]
    //       }
    //     }
    //   });

    //   // Donut Chart
    //   const datapie = {
    //     labels: ['Search', 'Email', 'Referral', 'Social', 'Other'],
    //     datasets: [{
    //       data: [25, 20, 30, 15, 10],
    //       backgroundColor: ['#6f42c1', '#007bff', '#17a2b8', '#00cccc', '#adb2bd']
    //     }]
    //   };

    //   const optionpie = {
    //     maintainAspectRatio: false,
    //     responsive: true,
    //     legend: {
    //       display: false,
    //     },
    //     animation: {
    //       animateScale: true,
    //       animateRotate: true
    //     }
    //   };

    //   // For a doughnut chart
    //   const ctxpie = document.getElementById('chartDonut');
    //   const myPieChart6 = new Chart(ctxpie, {
    //     type: 'doughnut',
    //     data: datapie,
    //     options: optionpie
    //   });

    // });
  }

}
