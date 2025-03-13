import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Param, 
    Body, 
    UsePipes, 
    ValidationPipe} from '@nestjs/common';
import { ClaimsService } from './claim.service';
import { CreateClaimDto } from './post-validate.dto';

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}
  @Post('/post')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createClaim(@Body() createClaimDto: CreateClaimDto) {
    return this.claimsService.create(createClaimDto);
}
@Get()
  getAllClaims() {
    return this.claimsService.findAll();
}
  @Get(':id')
  getClaimById(@Param('id') id: string) {
    return this.claimsService.findById(id);
  }

    @Put(':id')
    @UsePipes(new ValidationPipe({ whitelist: true }))
     updateClaim(@Param('id') id: string, @Body() updateClaimDto: CreateClaimDto) {
      return this.claimsService.update(id, updateClaimDto);
    }
  @Delete(':id')
  deleteClaim(@Param('id') id: string) {
return this.claimsService.delete(id);
  }
}
