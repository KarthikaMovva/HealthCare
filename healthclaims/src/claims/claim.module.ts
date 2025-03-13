import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClaimsController } from './claim.controller';
import { ClaimsService } from './claim.service';
import { Claim, ClaimSchema } from './claim.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Claim.name, schema: ClaimSchema }])],
  controllers: [ClaimsController],
  providers: [ClaimsService],
  exports: [ClaimsService],
})
export class ClaimsModule {}
