import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type ClaimDocument = Claim & Document;

@Schema({ timestamps: true })
export class Claim {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  claimAmount: number;

  @Prop({ required: true })
  description: string;

  @Prop()
  documentUrl: string;

  @Prop({ enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  patientId: string;

  @Prop()
  approvedAmount: number;

  @Prop()
  insurerComments: string;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);
