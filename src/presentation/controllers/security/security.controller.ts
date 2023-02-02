import { Body, Controller, Post } from '@nestjs/common';
import { NewSecurityDTO } from 'src/business';
import { SecurityService } from 'src/business/service';
import { CustomerEntity } from 'src/data/persistence/entities';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}
  //Crear usuario en el sistema
  @Post('newUser')
  signU(@Body() signUp: NewSecurityDTO): CustomerEntity {
    return this.securityService.signUp(signUp);
  }
  //Identificarse en el sistema
  @Post()
  signIn(@Body() signIn: NewSecurityDTO): string {
    return this.securityService.signIn(signIn);
  }
  //Salir del sistema
}
