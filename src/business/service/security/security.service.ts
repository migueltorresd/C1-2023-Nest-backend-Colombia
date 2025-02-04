// Libraries
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { NewAccountDto, NewCustomerDTO } from 'src/business/dtos';
import {
  AccountEntity,
  AccountTypeEntity,
  CustomerEntity,
  DocumentTypeEntity,
} from 'src/data/persistence/entities';
import { CustomerRepository } from 'src/data/persistence/repository';
import { AccountService } from '../account';
import { NewSecurityDTO } from '../../dtos/new-security.dto';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class SecurityService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Identificarse en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signIn(user: NewSecurityDTO): { access_token: string; id: string } {
    const answer = this.customerRepository.findOneByEmailAndPassword(
      user.email,
      user.password,
    );
    if (answer) {
      const mail = this.customerRepository.findOneByEmail(user.email);
      return {
        access_token: this.jwtService.sign({ id: mail.id }),
        id: mail.id,
      };
    } else throw new UnauthorizedException('Datos de identificación inválidos');
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
  signUp(user: NewCustomerDTO): { access_token: string; id: string } {
    const newCustomer = this.transmap(user);
    const customer = this.customerRepository.register(newCustomer);

    if (customer) {
      const accountType = new AccountTypeEntity();
      accountType.id = 'bb0f82fc-46f7-453e-9875-f95044c4c799';
      const newAccount = new NewAccountDto();
      newAccount.accontType = 'bb0f82fc-46f7-453e-9875-f95044c4c799';
      newAccount.CustomerEntityId = customer.id;
      newAccount.balance = '0';
      const account = this.accountService.createAccount(newAccount);

      if (account)
        return {
          access_token: this.jwtService.sign({ id: customer.id }),
          id: customer.id,
        };
      else throw new InternalServerErrorException();
    } else throw new InternalServerErrorException();
  }

  /**
   * Salir del sistema
   *fin
   * @param {string} JWToken
   * @memberof SecurityService
   */
  signOut(JWT: string): boolean {
    if (this.jwtService.verify(JWT)) return true;

    return false;
  }
}
