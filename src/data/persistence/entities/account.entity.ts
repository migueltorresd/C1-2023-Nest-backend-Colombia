import { AccountModel, CustomerModel } from 'src/data/models';
import { v4 as uuid } from 'uuid';
import { AccountTypeModel } from 'src/data/models';

export class AccountEntity implements AccountModel {
  id = uuid();
  customer: CustomerModel;
  accountType: AccountTypeModel;
  balance: number;
  state = true;
  deletedAt?: number | Date;
}
