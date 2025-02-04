import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccountService, NewAccountDto } from 'src/business';
import {
  AccountEntity,
  AccountTypeEntity,
} from 'src/data/persistence/entities';
import { ProtecGuard } from 'src/presentation/guards/protec/protec.guard';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  findAllUsers(): AccountEntity[] {
    return this.accountService.findAll();
  }
  //traer cuenta
  @Get(':id')
  getCustomerInf(@Param('id') AccountId: string): AccountEntity {
    return this.accountService.findOneById(AccountId);
  }
  //crear cuenta
  @Post('new')
  @UseGuards(ProtecGuard)
  createAccoun(@Body() account: NewAccountDto): AccountEntity {
    return this.accountService.createAccount(account);
  }
  //traer usuario con cuentas
  @Get('customer/:id')
  findByCustomer(@Param('id') id: string): AccountEntity[] {
    return this.accountService.findByCustomer(id);
  }
  //obtener balance
  @Get('balance/:accountId')
  getBalanc(@Param('accountId', ParseUUIDPipe) accountId: string): number {
    return this.accountService.getBalance(accountId);
  }
  //agregar balance
  @Put('add/:accountId')
  addBalanc(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Body('amount') amount: number,
  ): string {
    this.accountService.addBalance(accountId, amount);
    return 'se agrego';
  }
  //Remover balance de una cuenta
  @Put('remove/:accountId')
  removeBalance(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Body('amount') amount: number,
  ): string {
    this.accountService.removeBalance(accountId, amount);
    return 'se desconto';
  }
  //Verificar la disponibilidad de un monto a retirar en una cuenta
  @Get('verify/:accountId')
  verifyAmountIntoBalanc(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Body('amount') amount: number,
  ): boolean {
    return this.accountService.verifyAmountIntoBalance(accountId, amount);
  }
  //Obtener el estado de una cuenta
  @Get('state/:accountId')
  getStat(@Param('accountId', ParseUUIDPipe) accountId: string): boolean {
    return this.accountService.getState(accountId);
  }
  //Cambiar el estado de una cuenta
  @Put('state/:accountId')
  changeState(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Param('state') state: boolean,
  ): void {
    this.accountService.changeState(accountId, state);
  }
  //Obtener el tipo de cuenta de una cuenta
  @Get('type/:accountId')
  getAccountType(@Param('accountId') accountId: string): AccountTypeEntity {
    return this.accountService.getAccountType(accountId);
  }
  //Cambiar el tipo de cuenta a una cuenta
  @Put('type/:accountId')
  changeAccountType(
    @Param('accountId') accountid: string,
    @Param('accountTypeId') accountTypeId: string,
  ): AccountTypeEntity {
    return this.accountService.changeAccountType(accountid, accountTypeId);
  }
  //Borrar una cuenta
  @Delete(':accountId')
  deleteAccount(@Param('accountId', ParseUUIDPipe) accountId: string): void {
    this.accountService.deleteAccount(accountId);
  }
}
