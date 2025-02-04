import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountTypeEntity } from '../entities';
import { BaseRepository } from './base/base.repository';
import { AccountTypeRepositoryInterface } from './interfaces/account-type-repository.interface';

@Injectable()
export class AccountTypeRepository
  extends BaseRepository<AccountTypeEntity>
  implements AccountTypeRepositoryInterface
{
  constructor() {
    super();
    this.database.push(
      {
        id: '42ac6b77-5b78-4926-b3b2-92c8329257ef',
        name: 'ahorros',
        state: true,
      },
      {
        id: '4bf840bf-4fa5-46f2-a5bf-ec926237217b',
        name: 'corriente',
        state: true,
      },
    );
  }
  register(entity: AccountTypeEntity): AccountTypeEntity {
    this.database.push(entity); //push enviamos informacion
    return this.database.at(-1) ?? entity; //retornamos la ultima posicion y de ser algo contrario retormos la ultima entity
  }

  update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
    const index = this.database.findIndex((item) => item.id === id);
    if (index >= 0) {
      this.database[index] = {
        ...this.database[index],
        ...entity,
        id,
      } as AccountTypeEntity;
    } else {
      throw new NotFoundException(`El ID ${id} no existe en base de datos`);
    }
    return this.database[index];
  }

  delete(id: string, soft?: boolean): void {
    const AccountT = this.findOneById(id);
    if (soft || soft === undefined) {
      this.update(id, AccountT);
    } else {
      const index = this.database.findIndex((item) => item.id === id);
      this.database.splice(index, 1);
    }
  }

  findAll(): AccountTypeEntity[] {
    return this.database;
  }

  findOneById(id: string): AccountTypeEntity {
    const accounts = [
      {
        id: 'bb0f82fc-46f7-453e-9875-f95044c4c799',
        name: 'ahorros',
        state: true,
      },
      {
        id: 'bb0f82fc-46f7-453e-9875-f95044c4c798',
        name: 'corriente',
        state: true,
      },
    ];
    const account = accounts.find((a) => a.id === id);
    if (account) return account;
    else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }

  findByState(state: boolean): AccountTypeEntity[] {
    const statuA = this.database.filter((item) => item.state == state);
    return statuA;
  }

  findByName(name: string): AccountTypeEntity[] {
    const nameA = this.database.filter((item) => item.name == name);
    return nameA;
  }
}
