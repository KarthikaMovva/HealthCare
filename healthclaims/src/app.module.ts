import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import * as mongoose from 'mongoose';
import { UserModule } from './users/users.module';
import { ClaimsModule } from './claims/claim.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    UserModule,
    AuthModule,
    ClaimsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    try {
      await mongoose.connect(process.env.MONGO_URI || '');
      console.log('MongoDB connected with project');
    } catch (error) {
      console.error('MongoDB error:', error);
    }
  }
}
