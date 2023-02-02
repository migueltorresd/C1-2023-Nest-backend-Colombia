// Libraries
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { NewCustomerDTO } from 'src/business/dtos';
import {
  AccountTypeEntity,
  CustomerEntity,
  DocumentTypeEntity,
} from 'src/data/persistence/entities';
import { CustomerRepository } from 'src/data/persistence/repository';
import { AccountService } from '../account';
import { NewSecurityDTO } from '../../dtos/new-security.dto';

@Injectable()
export class SecurityService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService,
  ) {}

  /**
   * Identificarse en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signIn(user: NewSecurityDTO): string {
    const answer = this.customerRepository.findOneByEmailAndPassword(
      user.email,
      user.password,
    );
    if (answer) return 'Falta retornar un JWT';
    else throw new UnauthorizedException('Datos de identificación inválidos');
  }
  transmap(customer: NewCustomerDTO): CustomerEntity {
    const documentType = new DocumentTypeEntity();
    documentType.id = customer.documentTypeId;
    const newCustomer = new CustomerEntity();
    newCustomer.documentType = documentType;
    newCustomer.document = customer.document;
    newCustomer.fullName = customer.fullName;
    newCustomer.email = customer.email;
    newCustomer.phone = customer.phone;
    newCustomer.password = customer.password;

    return newCustomer;
  }
  /**
   * Crear usuario en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signUp(user: NewCustomerDTO): string {
    const newCustomer = this.transmap(user);
    const customer = this.customerRepository.register(newCustomer);

    if (customer) {
      const accountType = new AccountTypeEntity();
      accountType.id = 'Falta el ID del tipo de cuenta';
      const newAccount = {
        CustomerEntityId: customer.id,
        accontType: accountType.id,
        id: '',
        balance: '5',
        state: true,
      };

      const account = this.accountService.createAccount(newAccount);

      if (account) return 'Falta retornar un JWT';
      else throw new InternalServerErrorException();
    } else throw new InternalServerErrorException();
  }

  /**
   * Salir del sistema
   *
   * @param {string} JWToken
   * @memberof SecurityService
   */
  // signOut(JWToken: string): void {
  //   throw new Error('Method not implemented.');
  // }
}
