import { UserModel } from './../model/usermodel';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userfilter'
})
export class UserfilterPipe implements PipeTransform {

  transform( tableData: UserModel[], searchValue: string ): UserModel[] {
    if (!tableData || !searchValue) {
      return tableData;
    }
    return tableData.filter(details =>
      details.first_name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.last_name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.emp_id.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.username.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }

}
