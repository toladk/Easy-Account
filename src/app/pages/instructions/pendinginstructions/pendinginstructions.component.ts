import { Component, OnInit } from '@angular/core';
import { AllInstructionModel } from '../model/allInstruction';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { InstructionService } from '../services/instruction.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pendinginstructions',
  templateUrl: './pendinginstructions.component.html',
  styleUrls: ['./pendinginstructions.component.css']
})
export class PendinginstructionsComponent implements OnInit {

  instructionForm: FormGroup;

  drawerOpen = false;
  drawerOpen2 = false;
  isSpinning = false;
  isSpinning2 = false;
  isLoadingSubmit = false;
  isSpinning3 = false;

   // for searching
   searchValue: string;

   // Pagination
   pagination = 1;

   // Sorting
   key = 'id';
   reverse = false;

   // for buttons
  size: NzButtonSize = 'small';

  allPendingInstructionsList: AllInstructionModel[] = [];

  show = true;
  show2 = false;
  showSplitFill1 = false;
  showSplitFill2 = false;
  showSplitFill3 = false;
  showSplitFill4 = false;
  showSplitFill5 = false;
  showSplitFill6 = false;
  forFixedAndSplit = true;
  forPercentageAlone = true;
  showSweepBalance = false;
  showIfNotForPercentage = false;
  showForPSelected = false;
  isLoadingValidate = false;
  isLoadingValidate1 = false;
  isLoadingValidate2 = false;
  isLoadingValidate3 = false;
  isLoadingValidate4 = false;
  isLoadingValidate5 = false;
  isLoadingValidate6 = false;

  instructionDetails: any;
  approveInstructionDetails: any;
  instructionDetailsUpdate: any;
  accountDetails: any;
  consolidatedCheck: string;
  skipWeekendCheck: string;
  sweepBalCheck: string;
  splitNumber: any;
  updateInstructionDetails: any;
  instrucId: any;

  constructor(
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
      updatedBy: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.getAllPendingInstructions();

  }

  getAllPendingInstructions(): void{
    this.show = true;
    this.show2 = false;
    this.instructionService.getAllPendingInstructions().subscribe((result: any) => {
      this.allPendingInstructionsList = result;
      this.notification.success('Instructions', 'Pending Instructions Fetch Successfully !!');
      this.show = false;
      this.show2 = true;
    }, error => {
      this.show = false;
      this.show2 = true;
      this.notification.error('Instructions', error.error.respMessage || error.error.responseMessage);
    });
  }

  viewInstruction(data): void{
    this.isSpinning = true;
    this.drawerOpen = true;
    this.instructionService.getInstructionById(data.instructionId).subscribe((result: any) => {
      this.instructionDetails = result;
      this.isSpinning = false;
    }, error => {
      this.notification.error('Instructions', error.error.respMessage || error.error.responseMessage);
      this.isSpinning = false;
    });
  }

  close(): void{
    this.drawerOpen = false;
  }
  close2(): void{
    this.drawerOpen2 = false;
  }

  approveInstruction(functionId, instructionId, auditId, extensionId, oldId): void{
    this.isSpinning2 = true;
    const approveOrReject = 'A';
    const approvedBy = sessionStorage.getItem('username');
    // tslint:disable-next-line:max-line-length
    this.instructionService.approveOrRejectInstruction(approveOrReject, functionId, instructionId, auditId, approvedBy, extensionId, oldId).subscribe((result: any) => {
      this.approveInstructionDetails = result;
      this.notification.success('Instructions', 'Instruction Approved Successfully !!');
      this.isSpinning2 = false;
      this.getAllPendingInstructions();
    }, error => {
      this.isSpinning2 = false;
      this.notification.error('Instructions', error.error.respMessage || error.error.responseMessage);
    });
  }

  rejectInstruction(functionId, instructionId, auditId, extensionId, oldId): void{
    this.isSpinning2 = true;
    const approveOrReject = 'R';
    const approvedBy = sessionStorage.getItem('username');
    // tslint:disable-next-line:max-line-length
    this.instructionService.approveOrRejectInstruction(approveOrReject, functionId, instructionId, auditId, approvedBy, extensionId, oldId).subscribe((result: any) => {
      this.approveInstructionDetails = result;
      this.notification.success('Instructions', 'Instruction Rejected Successfully !!');
      this.isSpinning2 = false;
      this.getAllPendingInstructions();
    }, error => {
      this.notification.error('Instructions', error.error.respMessage || error.error.responseMessage);
      this.isSpinning2 = false;
    });
  }

  updateInstrc(data): void{
    this.isSpinning3 = true;
    this.drawerOpen2 = true;
    this.instrucId = data.instructionId;
    this.instructionService.getInstructionById(data.instructionId).subscribe((result: any) => {
      this.instructionForm.patchValue({...result});
      this.splitNumber = result.numberOfSplit;
      this.isSpinning3 = false;
    }, error => {
      // this.isSpinning3 = false;
      this.notification.error('Instructions', error.error.respMessage || error.error.responseMessage);
    });
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
        delete this.instructionForm.value.sweepBalance;
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
        delete this.instructionForm.value.sweepBalance;
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
        delete this.instructionForm.value.sweepBalance;
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
        delete this.instructionForm.value.sweepBalance;
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
        delete this.instructionForm.value.sweepBalance;
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
        delete this.instructionForm.value.sweepBalance;
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

  // Submit Update Instruction
  updateInstruction(): void{
    this.isLoadingSubmit = true;
    delete this.instructionForm.value.accountName;
    delete this.instructionForm.value.accountNumber;
    delete this.instructionForm.value.createdBy;
    delete this.instructionForm.value.totalAmount;
    delete this.instructionForm.value.creditAmount1;
    delete this.instructionForm.value.creditAmount2;
    delete this.instructionForm.value.creditAmount3;
    delete this.instructionForm.value.creditAmount4;
    delete this.instructionForm.value.creditAmount5;
    delete this.instructionForm.value.creditAmount6;
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

    this.instructionForm.value.status = 'P';

    // Convert string to int
    this.instructionForm.value.numberOfSplit = +(this.instructionForm.value.numberOfSplit);
    this.instructionForm.value.creditPercentage1 = this.instructionForm.value.creditPercentage1.toString();
    this.instructionForm.value.creditPercentage2 = this.instructionForm.value.creditPercentage2.toString();
    this.instructionForm.value.creditPercentage3 = this.instructionForm.value.creditPercentage3.toString();
    this.instructionForm.value.creditPercentage4 = this.instructionForm.value.creditPercentage4.toString();
    this.instructionForm.value.creditPercentage5 = this.instructionForm.value.creditPercentage5.toString();
    this.instructionForm.value.creditPercentage6 = this.instructionForm.value.creditPercentage6.toString();
    this.instructionForm.value.totalPercentage = this.instructionForm.value.totalPercentage.toString();

    this.instructionService.updateInstruction(this.instrucId, this.instructionForm.value).subscribe((result: any) => {
      this.updateInstructionDetails = result;
      this.notification.success('Update Instruction', this.updateInstructionDetails.responseMessage);
      this.isLoadingSubmit = false;
      this.instructionForm.reset();
      this.drawerOpen2 = false;
      this.showSplitFill1 = false;
      this.showSplitFill2 = false;
      this.showSplitFill3 = false;
      this.showSplitFill4 = false;
      this.showSplitFill5 = false;
      this.showSplitFill6 = false;
      this.forPercentageAlone = true;
      this.forFixedAndSplit = false;
      this.getAllPendingInstructions();
    }, error => {
      this.notification.error('Update Instruction', error.error.respMessage || error.error.responseMessage);
      this.isLoadingSubmit = false;
    });

  }

}
