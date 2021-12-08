import { Pipe, PipeTransform } from '@angular/core';
import { AllInstructionModel } from '../model/allInstruction';

@Pipe({
  name: 'allinstructionfilter'
})
export class AllinstructionfilterPipe implements PipeTransform {

  transform( tableData: AllInstructionModel[], searchValue: string ): AllInstructionModel[] {
    if (!tableData || !searchValue) {
      return tableData;
    }
    return tableData.filter(details =>
      details.accountName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.accountNumber.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.totalAmount.toString().toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.startDate.toString().toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.endDate.toString().toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }

}
