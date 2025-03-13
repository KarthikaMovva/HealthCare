import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Param, 
  Body, 
  UsePipes, 
  ValidationPipe, 
  UseGuards 
} from '@nestjs/common';
import { ClaimsService } from './claim.service';
import { CreateClaimDto } from './post-validate.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('claims')
@UseGuards(AuthGuard('jwt'))
export class ClaimsController {
constructor(private readonly claimsService: ClaimsService) {}

@Post('/post')
@UseGuards(RolesGuard)
@Roles('patient')
@UsePipes(new ValidationPipe({ whitelist: true }))
createClaim(@Body() createClaimDto: CreateClaimDto) {
  return this.claimsService.create(createClaimDto);
}

@Get()
@UseGuards(RolesGuard)
@Roles('insurer')
getAllClaims() {
  return this.claimsService.findAll();
}

@Get(':id')
@UseGuards(RolesGuard)
@Roles('patient')
getClaimById(@Param('id') id: string) {
  return this.claimsService.findById(id);
}

@Put(':id')
@UseGuards(RolesGuard)
@Roles('insurer')
@UsePipes(new ValidationPipe({ whitelist: true }))
updateClaim(@Param('id') id: string, @Body() updateClaimDto: CreateClaimDto) {
  return this.claimsService.update(id, updateClaimDto);
}

@Delete(':id')
@UseGuards(RolesGuard)
@Roles('insurer')
deleteClaim(@Param('id') id: string) {
  return this.claimsService.delete(id);
}
}
