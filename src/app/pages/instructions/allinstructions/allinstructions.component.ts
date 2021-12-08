import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { InstructionService } from '../services/instruction.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllInstructionModel } from '../model/allInstruction';

@Component({
  selector: 'app-allinstructions',
  templateUrl: './allinstructions.component.html',
  styleUrls: ['./allinstructions.component.css']
})
export class AllinstructionsComponent implements OnInit {

  instructionForm: FormGroup;

  // for searching
  searchValue: string;

  // Pagination
  pagination = 1;

  // Sorting
  key = 'id';
  reverse = false;

  // for buttons
  size: NzButtonSize = 'small';

  allInstructionList: AllInstructionModel[] = [];

  show = true;
  show2 = false;
  drawerOpen = false;
  isLoadingValidate = false;
  isLoadingValidate1 = false;
  isLoadingValidate2 = false;
  isLoadingValidate3 = false;
  isLoadingValidate4 = false;
  isLoadingValidate5 = false;
  isLoadingValidate6 = false;
  isLoadingSubmit = false;
  accountInfoShow = false;
  firstInstPage = true;
  secondInstPage = false;
  showIfNotForPercentage = false;
  showForPSelected = false;
  showSplitFill1 = false;
  showSplitFill2 = false;
  showSplitFill3 = false;
  showSplitFill4 = false;
  showSplitFill5 = false;
  showSplitFill6 = false;
  forFixedAndSplit = false;
  forPercentageAlone = false;
  showSweepBalance = false;
  isSpinning = false;
  isSpinning2 = false;
  drawerOpen2 = false;
  drawerOpen3 = false;
  isSpinning3 = false;

  accountDetails: any;
  accountFullName = '';
  accountInfo: any;
  consolidatedCheck: string;
  sweepBalCheck: string;
  skipWeekendCheck: string;
  postInstructionDetails: any;
  instructionDetails: any;
  deletedInstruction: any;
  instrucId: any;
  updateInstructionDetails: any;
  checkStatusCheck: string;
  updateData: any;

  constructor(
    private nzMessageService: NzMessageService,
    private notification: NzNotificationService,
    private instructionService: InstructionService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.instructionForm = this.formBuilder.group({
      accountNumber: ['',  [Validators.required, Validators.pattern('^[0-9]*$')]],
      accountName: ['', Validators.required],
      amountOrPercentage: ['', Validators.required],
      numberOfSplit: ['', Validators.required],
      createdBy: ['', Validators.required],
      totalPercentage: ['', Validators.required],
      totalAmount: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      consolidatedDebit: ['', Validators.required],
      frequency: ['', Validators.required],
      skipWeekends: ['', Validators.required],
      creditAmount1: [null , Validators.required],
      creditPercentage1: ['',  [Validators.required, Validators.pattern('^[0-9]*$')]],
      creditAccountNumber1: ['',  [Validators.required, Validators.pattern('^[0-9]*$')]],
      creditNarration1: ['', Validators.required],
      creditAmount2: [null, Validators.required],
      creditPercentage2: ['',  [Validators.required, Validators.pattern('^[0-9]*$')]],
      creditAccountNumber2: ['',  [Validators.required, Validators.pattern('^[0-9]*$')]],
      creditNarration2: ['', Validators.required],
      creditAmount3: [null, Validators.required],
      creditPercentage3: ['',  [Validators.required, Validators.pattern('^[0-9]*$')]],
      creditAccountNumber3: ['',  [Validators.required, Validators.pattern('^[0-9]*$')]],
      creditNarration3: ['', Validators.required],
      creditAmount4: [null, Validators.required],
      creditPercentage4: ['',  [Validators.required, Validators.pattern('^[0-9]*$')]],
      creditAccountNumber4: ['',  [Validators.required, Validators.pattern('^[0-9]*$')]],
      creditNarration4: ['', Validators.required],
      creditAmount5: [null, Validators.required],
      creditPercentage5: ['',  [Validators.required, Validators.pattern('^[0-9]*$')]],
      creditAccountNumber5: ['',  [Validators.required, Validators.pattern('^[0-9]*$')]],
      creditNarration5: ['', Validators.required],
      creditAmount6: [null, Validators.required],
      creditPercentage6: ['',  [Validators.required, Validators.pattern('^[0-9]*$')]],
      creditAccountNumber6: ['',  [Validators.required, Validators.pattern('^[0-9]*$')]],
      creditNarration6: ['', Validators.required],
      transactionSubType: ['', Validators.required],
      sweepBalance: ['', Validators.required],
    });

    this.getAllInstruction();

  }

  // Sorting
  sort(key): void{
    this.key = key;
    this.reverse = !this.reverse;
  }

  open(): void{
    this.drawerOpen = true;
  }
  close(): void{
    this.drawerOpen = false;
  }

  // get all instruction
  getAllInstruction(): void{
    this.show = true;
    this.show2 = false;
    this.instructionService.getAllInstructions().subscribe((result: any) => {
      this.allInstructionList = result;
      this.show = false;
      this.show2 = true;
    }, error => {
      this.show = false;
      this.show2 = true;
      this.notification.error('All Instruction', error.error.respMessage);
    });
  }

  // validate account
  validateAccount(data, val): void{
    if (val === 'fill1'){
      this.isLoadingValidate1 = true;
    } else if (val === 'fill2'){
      this.isLoadingValidate2 = true;
    } else if (val === 'fill3'){
      this.isLoadingValidate3 = true;
    } else if (val === 'fill4'){
      this.isLoadingValidate4 = true;
    } else if (val === 'fill5'){
      this.isLoadingValidate5 = true;
    } else if (val === 'fill6'){
      this.isLoadingValidate6 = true;
    }

    this.isLoadingValidate = true;
    this.instructionService.validateAccount(data).subscribe((result: any) => {
      this.accountDetails = result;
      if (result.responseMessage === 'Process Successful'){
        this.isLoadingValidate = false;
        this.isLoadingValidate1 = false;
        this.isLoadingValidate2 = false;
        this.isLoadingValidate3 = false;
        this.isLoadingValidate4 = false;
        this.isLoadingValidate5 = false;
        this.isLoadingValidate6 = false;
        this.notification.success('Account No', 'Account Number Validated Successfully!!');
        if (val === 'fill'){
          this.accountFullName = this.accountDetails.accountDetails.account_name;
          this.accountInfo = this.accountDetails.accountDetails;
          this.accountInfoShow = true;
        }
      }
    }, error => {
      this.isLoadingValidate = false;
      this.isLoadingValidate1 = false;
      this.isLoadingValidate2 = false;
      this.isLoadingValidate3 = false;
      this.isLoadingValidate4 = false;
      this.isLoadingValidate5 = false;
      this.isLoadingValidate6 = false;
      this.notification.error('Account No', error.error.errorResponse || error.error.responseMessage);
    });
  }

  // to show next & prev page
  showNextPage(): void{
    this.firstInstPage = false;
    this.secondInstPage = true;
  }
  showPrevPage(): void{
    this.firstInstPage = true;
    this.secondInstPage = false;
  }


  // setting no of split
  selectSplitNo(): void{
    if (this.instructionForm.value.numberOfSplit === '1'){
      if (this.instructionForm.value.amountOrPercentage === 'P' && this.instructionForm.value.numberOfSplit === '1'){
        this.showSplitFill1 = true;
        this.showSplitFill2 = false;
        this.showSplitFill3 = false;
        this.showSplitFill4 = false;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = false;
        this.showForPSelected = true;
        this.forPercentageAlone = true;
        this.forFixedAndSplit = false;
        this.showSweepBalance = false;
        this.instructionForm.get('creditAmount4').reset();
        this.instructionForm.get('creditPercentage4').reset();
        this.instructionForm.get('creditAccountNumber4').reset();
        this.instructionForm.get('creditNarration4').reset();
        this.instructionForm.get('creditAmount5').reset();
        this.instructionForm.get('creditPercentage5').reset();
        this.instructionForm.get('creditAccountNumber5').reset();
        this.instructionForm.get('creditNarration5').reset();
        this.instructionForm.get('creditAmount6').reset();
        this.instructionForm.get('creditPercentage6').reset();
        this.instructionForm.get('creditAccountNumber6').reset();
        this.instructionForm.get('creditNarration6').reset();
      } else if (this.instructionForm.value.amountOrPercentage === 'A' && this.instructionForm.value.numberOfSplit === '1'){
        this.showSplitFill1 = true;
        this.showSplitFill2 = false;
        this.showSplitFill3 = false;
        this.showSplitFill4 = false;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
        this.instructionForm.get('creditAmount2').reset();
        this.instructionForm.get('creditPercentage2').reset();
        this.instructionForm.get('creditAccountNumber2').reset();
        this.instructionForm.get('creditNarration2').reset();
        this.instructionForm.get('creditAmount3').reset();
        this.instructionForm.get('creditPercentage3').reset();
        this.instructionForm.get('creditAccountNumber3').reset();
        this.instructionForm.get('creditNarration3').reset();
        this.instructionForm.get('creditAmount4').reset();
        this.instructionForm.get('creditPercentage4').reset();
        this.instructionForm.get('creditAccountNumber4').reset();
        this.instructionForm.get('creditNarration4').reset();
        this.instructionForm.get('creditAmount5').reset();
        this.instructionForm.get('creditPercentage5').reset();
        this.instructionForm.get('creditAccountNumber5').reset();
        this.instructionForm.get('creditNarration5').reset();
        this.instructionForm.get('creditAmount6').reset();
        this.instructionForm.get('creditPercentage6').reset();
        this.instructionForm.get('creditAccountNumber6').reset();
        this.instructionForm.get('creditNarration6').reset();
      } else if (this.instructionForm.value.amountOrPercentage === 'F' && this.instructionForm.value.numberOfSplit === '1'){
        this.showSplitFill1 = true;
        this.showSplitFill2 = false;
        this.showSplitFill3 = false;
        this.showSplitFill4 = false;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
        this.instructionForm.get('creditAmount2').reset();
        this.instructionForm.get('creditPercentage2').reset();
        this.instructionForm.get('creditAccountNumber2').reset();
        this.instructionForm.get('creditNarration2').reset();
        this.instructionForm.get('creditAmount3').reset();
        this.instructionForm.get('creditPercentage3').reset();
        this.instructionForm.get('creditAccountNumber3').reset();
        this.instructionForm.get('creditNarration3').reset();
        this.instructionForm.get('creditAmount4').reset();
        this.instructionForm.get('creditPercentage4').reset();
        this.instructionForm.get('creditAccountNumber4').reset();
        this.instructionForm.get('creditNarration4').reset();
        this.instructionForm.get('creditAmount5').reset();
        this.instructionForm.get('creditPercentage5').reset();
        this.instructionForm.get('creditAccountNumber5').reset();
        this.instructionForm.get('creditNarration5').reset();
        this.instructionForm.get('creditAmount6').reset();
        this.instructionForm.get('creditPercentage6').reset();
        this.instructionForm.get('creditAccountNumber6').reset();
        this.instructionForm.get('creditNarration6').reset();
      }
    } else if (this.instructionForm.value.numberOfSplit === '2'){
      if (this.instructionForm.value.amountOrPercentage === 'P' && this.instructionForm.value.numberOfSplit === '2'){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = false;
        this.showSplitFill4 = false;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = false;
        this.showForPSelected = true;
        this.forPercentageAlone = true;
        this.forFixedAndSplit = false;
        this.showSweepBalance = false;
        this.instructionForm.get('creditAmount3').reset();
        this.instructionForm.get('creditPercentage3').reset();
        this.instructionForm.get('creditAccountNumber3').reset();
        this.instructionForm.get('creditNarration3').reset();
        this.instructionForm.get('creditAmount4').reset();
        this.instructionForm.get('creditPercentage4').reset();
        this.instructionForm.get('creditAccountNumber4').reset();
        this.instructionForm.get('creditNarration4').reset();
        this.instructionForm.get('creditAmount5').reset();
        this.instructionForm.get('creditPercentage5').reset();
        this.instructionForm.get('creditAccountNumber5').reset();
        this.instructionForm.get('creditNarration5').reset();
        this.instructionForm.get('creditAmount6').reset();
        this.instructionForm.get('creditPercentage6').reset();
        this.instructionForm.get('creditAccountNumber6').reset();
        this.instructionForm.get('creditNarration6').reset();
      } else if (this.instructionForm.value.amountOrPercentage === 'A' && this.instructionForm.value.numberOfSplit === '2'){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = false;
        this.showSplitFill4 = false;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
        this.instructionForm.get('creditAmount3').reset();
        this.instructionForm.get('creditPercentage3').reset();
        this.instructionForm.get('creditAccountNumber3').reset();
        this.instructionForm.get('creditNarration3').reset();
        this.instructionForm.get('creditAmount4').reset();
        this.instructionForm.get('creditPercentage4').reset();
        this.instructionForm.get('creditAccountNumber4').reset();
        this.instructionForm.get('creditNarration4').reset();
        this.instructionForm.get('creditAmount5').reset();
        this.instructionForm.get('creditPercentage5').reset();
        this.instructionForm.get('creditAccountNumber5').reset();
        this.instructionForm.get('creditNarration5').reset();
        this.instructionForm.get('creditAmount6').reset();
        this.instructionForm.get('creditPercentage6').reset();
        this.instructionForm.get('creditAccountNumber6').reset();
        this.instructionForm.get('creditNarration6').reset();
      } else if (this.instructionForm.value.amountOrPercentage === 'F' && this.instructionForm.value.numberOfSplit === '2'){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = false;
        this.showSplitFill4 = false;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
        this.instructionForm.get('creditAmount3').reset();
        this.instructionForm.get('creditPercentage3').reset();
        this.instructionForm.get('creditAccountNumber3').reset();
        this.instructionForm.get('creditNarration3').reset();
        this.instructionForm.get('creditAmount4').reset();
        this.instructionForm.get('creditPercentage4').reset();
        this.instructionForm.get('creditAccountNumber4').reset();
        this.instructionForm.get('creditNarration4').reset();
        this.instructionForm.get('creditAmount5').reset();
        this.instructionForm.get('creditPercentage5').reset();
        this.instructionForm.get('creditAccountNumber5').reset();
        this.instructionForm.get('creditNarration5').reset();
        this.instructionForm.get('creditAmount6').reset();
        this.instructionForm.get('creditPercentage6').reset();
        this.instructionForm.get('creditAccountNumber6').reset();
        this.instructionForm.get('creditNarration6').reset();
      }
    } else if (this.instructionForm.value.numberOfSplit === '3'){
      if (this.instructionForm.value.amountOrPercentage === 'P' && this.instructionForm.value.numberOfSplit === '3'){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = false;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = false;
        this.showForPSelected = true;
        this.forPercentageAlone = true;
        this.forFixedAndSplit = false;
        this.showSweepBalance = false;
        this.instructionForm.get('creditAmount2').reset();
        this.instructionForm.get('creditPercentage2').reset();
        this.instructionForm.get('creditAccountNumber2').reset();
        this.instructionForm.get('creditNarration2').reset();
        this.instructionForm.get('creditAmount3').reset();
        this.instructionForm.get('creditPercentage3').reset();
        this.instructionForm.get('creditAccountNumber3').reset();
        this.instructionForm.get('creditNarration3').reset();
        this.instructionForm.get('creditAmount4').reset();
        this.instructionForm.get('creditPercentage4').reset();
        this.instructionForm.get('creditAccountNumber4').reset();
        this.instructionForm.get('creditNarration4').reset();
        this.instructionForm.get('creditAmount5').reset();
        this.instructionForm.get('creditPercentage5').reset();
        this.instructionForm.get('creditAccountNumber5').reset();
        this.instructionForm.get('creditNarration5').reset();
        this.instructionForm.get('creditAmount6').reset();
        this.instructionForm.get('creditPercentage6').reset();
        this.instructionForm.get('creditAccountNumber6').reset();
        this.instructionForm.get('creditNarration6').reset();
      } else if (this.instructionForm.value.amountOrPercentage === 'A' && this.instructionForm.value.numberOfSplit === '3'){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = false;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
        this.instructionForm.get('creditAmount4').reset();
        this.instructionForm.get('creditPercentage4').reset();
        this.instructionForm.get('creditAccountNumber4').reset();
        this.instructionForm.get('creditNarration4').reset();
        this.instructionForm.get('creditAmount5').reset();
        this.instructionForm.get('creditPercentage5').reset();
        this.instructionForm.get('creditAccountNumber5').reset();
        this.instructionForm.get('creditNarration5').reset();
        this.instructionForm.get('creditAmount6').reset();
        this.instructionForm.get('creditPercentage6').reset();
        this.instructionForm.get('creditAccountNumber6').reset();
        this.instructionForm.get('creditNarration6').reset();
      } else if (this.instructionForm.value.amountOrPercentage === 'F' && this.instructionForm.value.numberOfSplit === '3'){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = false;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
        this.instructionForm.get('creditAmount4').reset();
        this.instructionForm.get('creditPercentage4').reset();
        this.instructionForm.get('creditAccountNumber4').reset();
        this.instructionForm.get('creditNarration4').reset();
        this.instructionForm.get('creditAmount5').reset();
        this.instructionForm.get('creditPercentage5').reset();
        this.instructionForm.get('creditAccountNumber5').reset();
        this.instructionForm.get('creditNarration5').reset();
        this.instructionForm.get('creditAmount6').reset();
        this.instructionForm.get('creditPercentage6').reset();
        this.instructionForm.get('creditAccountNumber6').reset();
        this.instructionForm.get('creditNarration6').reset();
      }
    } else if (this.instructionForm.value.numberOfSplit === '4'){
      if (this.instructionForm.value.amountOrPercentage === 'P' && this.instructionForm.value.numberOfSplit === '4'){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = true;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = false;
        this.showForPSelected = true;
        this.forPercentageAlone = true;
        this.forFixedAndSplit = false;
        this.showSweepBalance = false;
        this.instructionForm.get('creditAmount5').reset();
        this.instructionForm.get('creditPercentage5').reset();
        this.instructionForm.get('creditAccountNumber5').reset();
        this.instructionForm.get('creditNarration5').reset();
        this.instructionForm.get('creditAmount6').reset();
        this.instructionForm.get('creditPercentage6').reset();
        this.instructionForm.get('creditAccountNumber6').reset();
        this.instructionForm.get('creditNarration6').reset();
      } else if (this.instructionForm.value.amountOrPercentage === 'A' && this.instructionForm.value.numberOfSplit === '4'){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = true;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
        this.instructionForm.get('creditAmount5').reset();
        this.instructionForm.get('creditPercentage5').reset();
        this.instructionForm.get('creditAccountNumber5').reset();
        this.instructionForm.get('creditNarration5').reset();
        this.instructionForm.get('creditAmount6').reset();
        this.instructionForm.get('creditPercentage6').reset();
        this.instructionForm.get('creditAccountNumber6').reset();
        this.instructionForm.get('creditNarration6').reset();
      } else if (this.instructionForm.value.amountOrPercentage === 'F' && this.instructionForm.value.numberOfSplit === '4'){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = true;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
        this.instructionForm.get('creditAmount5').reset();
        this.instructionForm.get('creditPercentage5').reset();
        this.instructionForm.get('creditAccountNumber5').reset();
        this.instructionForm.get('creditNarration5').reset();
        this.instructionForm.get('creditAmount6').reset();
        this.instructionForm.get('creditPercentage6').reset();
        this.instructionForm.get('creditAccountNumber6').reset();
        this.instructionForm.get('creditNarration6').reset();
      }
    } else if (this.instructionForm.value.numberOfSplit === '5'){
      if (this.instructionForm.value.amountOrPercentage === 'P' && this.instructionForm.value.numberOfSplit === '5'){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = true;
        this.showSplitFill5 = true;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = false;
        this.showForPSelected = true;
        this.forPercentageAlone = true;
        this.forFixedAndSplit = false;
        this.showSweepBalance = false;
        this.instructionForm.get('creditAmount6').reset();
        this.instructionForm.get('creditPercentage6').reset();
        this.instructionForm.get('creditAccountNumber6').reset();
        this.instructionForm.get('creditNarration6').reset();
      } else if (this.instructionForm.value.amountOrPercentage === 'A' && this.instructionForm.value.numberOfSplit === '5'){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = true;
        this.showSplitFill5 = true;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
        this.instructionForm.get('creditAmount6').reset();
        this.instructionForm.get('creditPercentage6').reset();
        this.instructionForm.get('creditAccountNumber6').reset();
        this.instructionForm.get('creditNarration6').reset();
      } else if (this.instructionForm.value.amountOrPercentage === 'F' && this.instructionForm.value.numberOfSplit === '5'){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = true;
        this.showSplitFill5 = true;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
        this.instructionForm.get('creditAmount6').reset();
        this.instructionForm.get('creditPercentage6').reset();
        this.instructionForm.get('creditAccountNumber6').reset();
        this.instructionForm.get('creditNarration6').reset();
      }
    } else if (this.instructionForm.value.numberOfSplit === '6'){
      if (this.instructionForm.value.amountOrPercentage === 'P' && this.instructionForm.value.numberOfSplit === '6'){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = true;
        this.showSplitFill5 = true;
        this.showSplitFill6 = true;
        this.showIfNotForPercentage = false;
        this.showForPSelected = true;
        this.forPercentageAlone = true;
        this.forFixedAndSplit = false;
        this.showSweepBalance = false;
      } else if (this.instructionForm.value.amountOrPercentage === 'A' && this.instructionForm.value.numberOfSplit === '6'){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = true;
        this.showSplitFill5 = true;
        this.showSplitFill6 = true;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
      } else if (this.instructionForm.value.amountOrPercentage === 'F' && this.instructionForm.value.numberOfSplit === '6'){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = true;
        this.showSplitFill5 = true;
        this.showSplitFill6 = true;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
      }
    } else {

    }
  }

  // setting amount or percentage
  selectAmountSplit(): void{
    this.showSplitFill1 = false;
    this.showSplitFill2 = false;
    this.showSplitFill3 = false;
    this.showSplitFill4 = false;
    this.showSplitFill5 = false;
    this.showSplitFill6 = false;
    this.forPercentageAlone = false;
    this.forFixedAndSplit = false;
    this.showSweepBalance = false;
  }

  // Radio button for skip weekend
  skipWeekendAction(val): void{
    if (val === 'Yes'){
      this.skipWeekendCheck = 'Y';
    } else if (val === 'No'){
      this.skipWeekendCheck = 'N';
    } else {
    }
  }

  // Radio button for consolidated debit
  consolidatedAction(val): void{
    if (val === 'Yes'){
      this.consolidatedCheck = 'Y';
    } else if (val === 'No'){
      this.consolidatedCheck = 'N';
    } else {
    }
  }

  // Radio button for Sweep Balance
  sweepBalAction(val): void{
    if (val === 'Yes'){
      this.instructionForm.value.sweepBalance = 'Y';
      this.sweepBalCheck = 'Y';
    } else if (val === 'No'){
      this.instructionForm.value.sweepBalance = 'N';
      this.sweepBalCheck = 'N';
    } else {
      this.instructionForm.value.sweepBalance = 'N';
    }
  }

  // Submit Post Instruction
  postInstruction(): void{
    this.isLoadingSubmit = true;
    this.instructionForm.value.accountName = this.accountFullName;
    this.instructionForm.value.createdBy = sessionStorage.getItem('username');

    if (this.consolidatedCheck === 'Y'){
      this.instructionForm.value.consolidatedDebit = 'Y';
    } else if (this.consolidatedCheck === 'N'){
      this.instructionForm.value.consolidatedDebit = 'N';
    } else {
      this.instructionForm.value.consolidatedDebit = 'N';
    }

    if (this.skipWeekendCheck === 'Y'){
      this.instructionForm.value.skipWeekends = 'Y';
    } else if (this.skipWeekendCheck === 'N'){
      this.instructionForm.value.skipWeekends = 'N';
    } else {
      this.instructionForm.value.skipWeekends = 'Y';
    }

    if (this.instructionForm.value.amountOrPercentage === 'P'){
      delete this.instructionForm.value.sweepBalance;
      delete this.instructionForm.value.totalAmount;
      delete this.instructionForm.value.creditAmount1;
      delete this.instructionForm.value.creditAmount2;
      delete this.instructionForm.value.creditAmount3;
      delete this.instructionForm.value.creditAmount4;
      delete this.instructionForm.value.creditAmount5;
      delete this.instructionForm.value.creditAmount6;
    }

    // Convert string to int
    this.instructionForm.value.numberOfSplit = +(this.instructionForm.value.numberOfSplit);
    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    // this.instructionForm.value.totalAmount = +(this.instructionForm.value.totalAmount);
    // this.instructionForm.value.totalAmount = parseFloat(this.instructionForm.value.totalAmount + '.01') ;

    // this.instructionForm.value.creditPercentage1 = parseFloat(this.instructionForm.value.creditPercentage1);
    // this.instructionForm.value.creditPercentage2 = this.instructionForm.value.creditPercentage2.indexOf('.') > -1 ?
    //  this.instructionForm.value.creditPercentage2.toFixed(2) : `${this.instructionForm.value.creditPercentage2}.00`;
    // console.log(parseFloat(this.instructionForm.value.creditPercentage2));

    this.instructionService.postInstruction(this.instructionForm.value).subscribe((result: any) => {
      this.postInstructionDetails = result;
      this.notification.success('Create Instruction', this.postInstructionDetails.responseMessage);
      this.isLoadingSubmit = false;
      this.instructionForm.reset();
      this.drawerOpen = false;
      this.accountInfoShow = false;
      this.showSplitFill1 = false;
      this.showSplitFill2 = false;
      this.showSplitFill3 = false;
      this.showSplitFill4 = false;
      this.showSplitFill5 = false;
      this.showSplitFill6 = false;
      this.forPercentageAlone = true;
      this.forFixedAndSplit = false;
      this.firstInstPage = true;
      this.accountInfoShow = false;
      this.secondInstPage = false;
      this.getAllInstruction();
    }, error => {
      this.notification.error('Create Instruction', error.error.respMessage || error.error.responseMessage);
      this.isLoadingSubmit = false;
    });

  }

  viewInstruction(data): void{
    this.isSpinning = true;
    this.drawerOpen2 = true;
    this.instructionService.viewInstructionId(data.instructionId).subscribe((result: any) => {
      this.instructionDetails = result;
      this.isSpinning = false;
    }, error => {
      this.notification.error('Instruction', error.error.respMessage || error.error.responseMessage);
      this.isSpinning = false;
    });
  }

  deleteInstruction(data): void{
    this.isSpinning2 = true;
    const updatedBy = sessionStorage.getItem('username');
    this.instructionService.deleteInstruction(data, updatedBy).subscribe((result: any) => {
      this.deletedInstruction = result;
      this.notification.success('Instruction', this.deletedInstruction.responseMessage);
      this.isSpinning2 = false;
      this.getAllInstruction();
    }, error => {
      this.notification.error('Instruction', error.error.respMessage || error.error.responseMessage);
      this.isSpinning2 = false;
    });
  }

  close2(): void{
    this.drawerOpen2 = false;
  }

  close3(): void{
    this.drawerOpen3 = false;
  }

  // Radio button for skip weekend
  checkStatus(val): void{
    if (val === 'A'){
      this.checkStatusCheck = 'A';
    } else if (val === 'I'){
      this.checkStatusCheck = 'I';
    } else {
    }
  }

  updateInstrc(data): void{
    this.isSpinning3 = true;
    this.drawerOpen3 = true;
    this.instrucId = data.instructionId;
    this.instructionService.viewInstructionId(data.instructionId).subscribe((result: any) => {
      this.instructionForm.patchValue({...result});
      this.updateData = result;
      this.isSpinning3 = false;

      if (this.updateData.amountOrPercentage === 'P' && this.updateData.numberOfSplit === 1){
        this.showSplitFill1 = true;
        this.showSplitFill2 = false;
        this.showSplitFill3 = false;
        this.showSplitFill4 = false;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = false;
        this.showForPSelected = true;
        this.forPercentageAlone = true;
        this.forFixedAndSplit = false;
        this.showSweepBalance = false;
      } else if (this.updateData.amountOrPercentage === 'A' && this.updateData.numberOfSplit === 1){
        this.showSplitFill1 = true;
        this.showSplitFill2 = false;
        this.showSplitFill3 = false;
        this.showSplitFill4 = false;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
      } else if (this.updateData.amountOrPercentage === 'F' && this.updateData.numberOfSplit === 1){
        this.showSplitFill1 = true;
        this.showSplitFill2 = false;
        this.showSplitFill3 = false;
        this.showSplitFill4 = false;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
      }

      if (this.updateData.amountOrPercentage === 'P' && this.updateData.numberOfSplit === 2){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = false;
        this.showSplitFill4 = false;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = false;
        this.showForPSelected = true;
        this.forPercentageAlone = true;
        this.forFixedAndSplit = false;
        this.showSweepBalance = false;
        this.instructionForm.value.creditAmount3 = '';
        this.instructionForm.value.creditPercentage3 = '';
        this.instructionForm.value.creditAccountNumber3 = '';
        this.instructionForm.value.creditNarration3 = '';
        this.instructionForm.value.creditAmount4 = '';
        this.instructionForm.value.creditPercentage4 = '';
        this.instructionForm.value.creditAccountNumber4 = '';
        this.instructionForm.value.creditNarration4 = '';
        this.instructionForm.value.creditAmount5 = '';
        this.instructionForm.value.creditPercentage5 = '';
        this.instructionForm.value.creditAccountNumber5 = '';
        this.instructionForm.value.creditNarration5 = '';
        this.instructionForm.value.creditAmount6 = '';
        this.instructionForm.value.creditPercentage6 = '';
        this.instructionForm.value.creditAccountNumber6 = '';
        this.instructionForm.value.creditNarration6 = '';
      } else if (this.updateData.amountOrPercentage === 'A' && this.updateData.numberOfSplit === 2){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = false;
        this.showSplitFill4 = false;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
        this.instructionForm.value.creditAmount3 = '';
        this.instructionForm.value.creditPercentage3 = '';
        this.instructionForm.value.creditAccountNumber3 = '';
        this.instructionForm.value.creditNarration3 = '';
        this.instructionForm.value.creditAmount4 = '';
        this.instructionForm.value.creditPercentage4 = '';
        this.instructionForm.value.creditAccountNumber4 = '';
        this.instructionForm.value.creditNarration4 = '';
        this.instructionForm.value.creditAmount5 = '';
        this.instructionForm.value.creditPercentage5 = '';
        this.instructionForm.value.creditAccountNumber5 = '';
        this.instructionForm.value.creditNarration5 = '';
        this.instructionForm.value.creditAmount6 = '';
        this.instructionForm.value.creditPercentage6 = '';
        this.instructionForm.value.creditAccountNumber6 = '';
        this.instructionForm.value.creditNarration6 = '';
      } else if (this.updateData.amountOrPercentage === 'F' && this.updateData.numberOfSplit === 2){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = false;
        this.showSplitFill4 = false;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
        this.instructionForm.value.creditAmount3 = '';
        this.instructionForm.value.creditPercentage3 = '';
        this.instructionForm.value.creditAccountNumber3 = '';
        this.instructionForm.value.creditNarration3 = '';
        this.instructionForm.value.creditAmount4 = '';
        this.instructionForm.value.creditPercentage4 = '';
        this.instructionForm.value.creditAccountNumber4 = '';
        this.instructionForm.value.creditNarration4 = '';
        this.instructionForm.value.creditAmount5 = '';
        this.instructionForm.value.creditPercentage5 = '';
        this.instructionForm.value.creditAccountNumber5 = '';
        this.instructionForm.value.creditNarration5 = '';
        this.instructionForm.value.creditAmount6 = '';
        this.instructionForm.value.creditPercentage6 = '';
        this.instructionForm.value.creditAccountNumber6 = '';
        this.instructionForm.value.creditNarration6 = '';
      }

      if (this.updateData.amountOrPercentage === 'P' && this.updateData.numberOfSplit === 3){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = false;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = false;
        this.showForPSelected = true;
        this.forPercentageAlone = true;
        this.forFixedAndSplit = false;
        this.showSweepBalance = false;
        this.instructionForm.value.creditAmount4 = '';
        this.instructionForm.value.creditPercentage4 = '';
        this.instructionForm.value.creditAccountNumber4 = '';
        this.instructionForm.value.creditNarration4 = '';
        this.instructionForm.value.creditAmount5 = '';
        this.instructionForm.value.creditPercentage5 = '';
        this.instructionForm.value.creditAccountNumber5 = '';
        this.instructionForm.value.creditNarration5 = '';
        this.instructionForm.value.creditAmount6 = '';
        this.instructionForm.value.creditPercentage6 = '';
        this.instructionForm.value.creditAccountNumber6 = '';
        this.instructionForm.value.creditNarration6 = '';
      } else if (this.updateData.amountOrPercentage === 'A' && this.updateData.numberOfSplit === 3){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = false;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
        this.instructionForm.value.creditAmount4 = '';
        this.instructionForm.value.creditPercentage4 = '';
        this.instructionForm.value.creditAccountNumber4 = '';
        this.instructionForm.value.creditNarration4 = '';
        this.instructionForm.value.creditAmount5 = '';
        this.instructionForm.value.creditPercentage5 = '';
        this.instructionForm.value.creditAccountNumber5 = '';
        this.instructionForm.value.creditNarration5 = '';
        this.instructionForm.value.creditAmount6 = '';
        this.instructionForm.value.creditPercentage6 = '';
        this.instructionForm.value.creditAccountNumber6 = '';
        this.instructionForm.value.creditNarration6 = '';
      } else if (this.updateData.amountOrPercentage === 'F' && this.updateData.numberOfSplit === 3){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = false;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
        this.instructionForm.value.creditAmount4 = '';
        this.instructionForm.value.creditPercentage4 = '';
        this.instructionForm.value.creditAccountNumber4 = '';
        this.instructionForm.value.creditNarration4 = '';
        this.instructionForm.value.creditAmount5 = '';
        this.instructionForm.value.creditPercentage5 = '';
        this.instructionForm.value.creditAccountNumber5 = '';
        this.instructionForm.value.creditNarration5 = '';
        this.instructionForm.value.creditAmount6 = '';
        this.instructionForm.value.creditPercentage6 = '';
        this.instructionForm.value.creditAccountNumber6 = '';
        this.instructionForm.value.creditNarration6 = '';
      }

      if (this.updateData.amountOrPercentage === 'P' && this.updateData.numberOfSplit === 4){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = true;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = false;
        this.showForPSelected = true;
        this.forPercentageAlone = true;
        this.forFixedAndSplit = false;
        this.showSweepBalance = false;
        this.instructionForm.value.creditAmount5 = '';
        this.instructionForm.value.creditPercentage5 = '';
        this.instructionForm.value.creditAccountNumber5 = '';
        this.instructionForm.value.creditNarration5 = '';
        this.instructionForm.value.creditAmount6 = '';
        this.instructionForm.value.creditPercentage6 = '';
        this.instructionForm.value.creditAccountNumber6 = '';
        this.instructionForm.value.creditNarration6 = '';
      } else if (this.updateData.amountOrPercentage === 'A' && this.updateData.numberOfSplit === 4){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = true;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
        this.instructionForm.value.creditAmount5 = '';
        this.instructionForm.value.creditPercentage5 = '';
        this.instructionForm.value.creditAccountNumber5 = '';
        this.instructionForm.value.creditNarration5 = '';
        this.instructionForm.value.creditAmount6 = '';
        this.instructionForm.value.creditPercentage6 = '';
        this.instructionForm.value.creditAccountNumber6 = '';
        this.instructionForm.value.creditNarration6 = '';
      } else if (this.updateData.amountOrPercentage === 'F' && this.updateData.numberOfSplit === 4){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = true;
        this.showSplitFill5 = false;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
        this.instructionForm.value.creditAmount5 = '';
        this.instructionForm.value.creditPercentage5 = '';
        this.instructionForm.value.creditAccountNumber5 = '';
        this.instructionForm.value.creditNarration5 = '';
        this.instructionForm.value.creditAmount6 = '';
        this.instructionForm.value.creditPercentage6 = '';
        this.instructionForm.value.creditAccountNumber6 = '';
        this.instructionForm.value.creditNarration6 = '';
      }

      if (this.updateData.amountOrPercentage === 'P' && this.updateData.numberOfSplit === 5){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = true;
        this.showSplitFill5 = true;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = false;
        this.showForPSelected = true;
        this.forPercentageAlone = true;
        this.forFixedAndSplit = false;
        this.showSweepBalance = false;
        this.instructionForm.value.creditAmount6 = '';
        this.instructionForm.value.creditPercentage6 = '';
        this.instructionForm.value.creditAccountNumber6 = '';
        this.instructionForm.value.creditNarration6 = '';
      } else if (this.updateData.amountOrPercentage === 'A' && this.updateData.numberOfSplit === 5){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = true;
        this.showSplitFill5 = true;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
        this.instructionForm.value.creditAmount6 = '';
        this.instructionForm.value.creditPercentage6 = '';
        this.instructionForm.value.creditAccountNumber6 = '';
        this.instructionForm.value.creditNarration6 = '';
      } else if (this.updateData.amountOrPercentage === 'F' && this.updateData.numberOfSplit === 5){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = true;
        this.showSplitFill5 = true;
        this.showSplitFill6 = false;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
        this.instructionForm.value.creditAmount6 = '';
        this.instructionForm.value.creditPercentage6 = '';
        this.instructionForm.value.creditAccountNumber6 = '';
        this.instructionForm.value.creditNarration6 = '';
      }

      if (this.updateData.amountOrPercentage === 'P' && this.updateData.numberOfSplit === 6){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = true;
        this.showSplitFill5 = true;
        this.showSplitFill6 = true;
        this.showIfNotForPercentage = false;
        this.showForPSelected = true;
        this.forPercentageAlone = true;
        this.forFixedAndSplit = false;
        this.showSweepBalance = false;
      } else if (this.updateData.amountOrPercentage === 'A' && this.updateData.numberOfSplit === 6){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = true;
        this.showSplitFill5 = true;
        this.showSplitFill6 = true;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
      } else if (this.updateData.amountOrPercentage === 'F' && this.updateData.numberOfSplit === 6){
        this.showSplitFill1 = true;
        this.showSplitFill2 = true;
        this.showSplitFill3 = true;
        this.showSplitFill4 = true;
        this.showSplitFill5 = true;
        this.showSplitFill6 = true;
        this.showIfNotForPercentage = true;
        this.showForPSelected = false;
        this.forPercentageAlone = false;
        this.forFixedAndSplit = true;
        this.showSweepBalance = true;
      }

    }, error => {
      this.isSpinning3 = false;
      this.notification.error('Instructions', error.error.respMessage || error.error.responseMessage);
    });
  }

  // Submit Update Instruction
  updateInstruction(): void{
    this.isLoadingSubmit = true;
    delete this.instructionForm.value.accountName;
    delete this.instructionForm.value.accountNumber;
    delete this.instructionForm.value.createdBy;
    this.instructionForm.value.updatedBy = sessionStorage.getItem('username');

    if (this.consolidatedCheck === 'Y'){
      this.instructionForm.value.consolidatedDebit = 'Y';
    } else if (this.consolidatedCheck === 'N'){
      this.instructionForm.value.consolidatedDebit = 'N';
    } else {
      this.instructionForm.value.consolidatedDebit = 'N';
    }

    if (this.skipWeekendCheck === 'Y'){
      this.instructionForm.value.skipWeekends = 'Y';
    } else if (this.skipWeekendCheck === 'N'){
      this.instructionForm.value.skipWeekends = 'N';
    } else {
      this.instructionForm.value.skipWeekends = 'Y';
    }

    if (this.checkStatusCheck === 'A'){
      this.instructionForm.value.status = 'A';
    } else if (this.checkStatusCheck === 'I'){
      this.instructionForm.value.status = 'I';
    } else {
      this.instructionForm.value.status = 'A';
    }

    if (this.instructionForm.value.amountOrPercentage === 'P'){
      delete this.instructionForm.value.sweepBalance;
      delete this.instructionForm.value.totalAmount;
      delete this.instructionForm.value.creditAmount1;
      delete this.instructionForm.value.creditAmount2;
      delete this.instructionForm.value.creditAmount3;
      delete this.instructionForm.value.creditAmount4;
      delete this.instructionForm.value.creditAmount5;
      delete this.instructionForm.value.creditAmount6;
    }

    // Convert string to int
    this.instructionForm.value.numberOfSplit = +(this.instructionForm.value.numberOfSplit);
    this.instructionForm.value.creditPercentage1 = this.instructionForm.value.creditPercentage1.toString();
    this.instructionForm.value.creditPercentage2 = this.instructionForm.value.creditPercentage2.toString();
    this.instructionForm.value.creditPercentage3 = this.instructionForm.value.creditPercentage3.toString();
    this.instructionForm.value.creditPercentage4 = this.instructionForm.value.creditPercentage4.toString();
    this.instructionForm.value.creditPercentage5 = this.instructionForm.value.creditPercentage5.toString();
    this.instructionForm.value.creditPercentage6 = this.instructionForm.value.creditPercentage6.toString();
    this.instructionForm.value.totalPercentage = this.instructionForm.value.totalPercentage.toString();
    this.instructionForm.value.creditAmount1 = this.instructionForm.value.creditAmount1.toString();
    this.instructionForm.value.creditAmount2 = this.instructionForm.value.creditAmount2.toString();
    this.instructionForm.value.creditAmount3 = this.instructionForm.value.creditAmount3.toString();
    this.instructionForm.value.creditAmount4 = this.instructionForm.value.creditAmount4.toString();
    this.instructionForm.value.creditAmount5 = this.instructionForm.value.creditAmount5.toString();
    this.instructionForm.value.creditAmount6 = this.instructionForm.value.creditAmount6.toString();

    this.instructionService.updateInstruction(this.instrucId, this.instructionForm.value).subscribe((result: any) => {
      this.updateInstructionDetails = result;
      this.notification.success('Update Instruction', this.updateInstructionDetails.responseMessage);
      this.isLoadingSubmit = false;
      this.instructionForm.reset();
      this.drawerOpen3 = false;
      this.showSplitFill1 = false;
      this.showSplitFill2 = false;
      this.showSplitFill3 = false;
      this.showSplitFill4 = false;
      this.showSplitFill5 = false;
      this.showSplitFill6 = false;
      this.forPercentageAlone = true;
      this.forFixedAndSplit = false;
      this.getAllInstruction();
    }, error => {
      this.notification.error('Update Instruction', error.error.respMessage || error.error.responseMessage);
      this.isLoadingSubmit = false;
    });

  }

}
