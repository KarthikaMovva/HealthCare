import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Claim, ClaimDocument } from './claim.schema';
import { CreateClaimDto } from './post-validate.dto';

@Injectable()
export class ClaimsService {
  constructor(@InjectModel(Claim.name) private claimModel: Model<ClaimDocument>) {}


  async create(createClaimDto: CreateClaimDto): Promise<Claim> {
    const newClaim = new this.claimModel(createClaimDto);
    return newClaim.save();
  }

  async findAll(): Promise<Claim[]> {
    return this.claimModel.find().exec();
  }

  async findById(id: string): Promise<Claim> {
    const claim = await this.claimModel.findById(id);
    if (!claim) {
      throw new NotFoundException(`Claim with ID ${id} not found`);
    }
    return claim;
  }

  async update(id: string, updateClaimDto: CreateClaimDto): Promise<Claim> {
    const updatedClaim = await this.claimModel.findByIdAndUpdate(id, updateClaimDto, { new: true });
    if (!updatedClaim) {
      throw new NotFoundException(`Claim with ID ${id} not found`);
    }
    return updatedClaim;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletedClaim = await this.claimModel.findByIdAndDelete(id);
    if (!deletedClaim) {
      throw new NotFoundException(`Claim with ID ${id} not found`);
    }
    return { message: 'Claim deleted successfully' };
  }
}
