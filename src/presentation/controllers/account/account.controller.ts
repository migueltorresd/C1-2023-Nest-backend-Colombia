import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AccountService, NewAccountDto } from 'src/business';
import {
  AccountEntity,
  AccountTypeEntity,
} from 'src/data/persistence/entities';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  //crear cuenta
  @Post('new')
  createAccoun(@Body() account: NewAccountDto): AccountEntity {
    return this.accountService.createAccount(account);
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
    @Param('amount') amount: number,
  ): string {
    this.accountService.addBalance(accountId, amount);
    return 'se agrego';
  }

  @Put('remove/:accountId')
  removeBalance(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Param('amount') amount: number,
  ): void {
    this.accountService.removeBalance(accountId, amount);
  }

  @Get('verify/:accountId')
  verifyAmountIntoBalanc(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Param('amount') amount: number,
  ): boolean {
    return this.accountService.verifyAmountIntoBalance(accountId, amount);
  }

  @Get('state/:accountId')
  getStat(@Param('accountId', ParseUUIDPipe) accountId: string): boolean {
    return this.accountService.getState(accountId);
  }

  @Put('state/:accountId')
  changeState(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Param('state') state: boolean,
  ): void {
    this.accountService.changeState(accountId, state);
  }

  @Get('type/:accountId')
  getAccountType(@Param('accountId') accountId: string): AccountTypeEntity {
    return this.accountService.getAccountType(accountId);
  }

  @Put()
  changeAccountType(
    @Param('accountId') accountid: string,
    @Param('accountTypeId') accountTypeId: string,
  ): AccountTypeEntity {
    return this.accountService.changeAccountType(accountid, accountTypeId);
  }

  @Delete(':accountId')
  deleteAccount(@Param('accountId', ParseUUIDPipe) accountId: string): void {
    this.accountService.deleteAccount(accountId);
  }
}
